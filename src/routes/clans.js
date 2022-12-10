const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const getRank = require('../data/Ranks')
const { getUserInfo, sys } = require('../db/index');
const { number_format, toDate } = require('../helpers');

const Clans = require('../models/Clans');
const Clans_users = require('../models/Clans_users');

router.get('/api/clans/:clan_id/getclan', async function(req, res){
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }

    let clan_id = req.params.clan_id;
    if(isNaN(clan_id)){
        res.end(JSON.stringify({
            error: "Введите ид клана!"
        }));
        return;
    }

    let clan = await Clans.findOne({clanId: clan_id}, {_id: 0});
    if(!clan){
        res.end(JSON.stringify({
            error: "Введённый вами клан не найден!"
        }));
        return;
    }

    
    clan = JSON.parse(JSON.stringify(clan));
    let by = await getUserInfo(clan.by, {score: 1, vip: 1});
    let user_rank = getRank(by.score, by.vip);
    clan.by = user_rank + "|" + clan.by;
    clan.date = toDate(clan.date, 1);
    clan.in_clan = 0;
    
    let clanUsers = await Clans_users.find({clanId: clan.clanId, in_clan: 1}, {_id: 0, in_clan: 0, clanId: 0}, {sort: {group: -1, earned: -1}});
    clanUsers = JSON.parse(JSON.stringify(clanUsers));
    for (const i in clanUsers) {
        if(clanUsers[i].login == userInfo.login) {
            clan.access = clanUsers[i].group;
            clan.in_clan = 1;
        }
        let u = await getUserInfo(clanUsers[i].login, {score: 1, vip: 1, kry: 1, auth_date: 1});
        let user_rank = getRank(u.score, u.vip);
        clanUsers[i].login = user_rank + "|" + clanUsers[i].login;
        clanUsers[i].lastAuth = toDate(u.auth_date, 1);
        
    }
    let myRequest = await Clans_users.findOne({clanId: clan.clanId, in_clan: 0, login: userInfo.login}, {clanId: 1});
    if(myRequest) clan.myRequest = 1;

    if(clan.access > 3){
        let requests = await Clans_users.find({clanId: clan.clanId, in_clan: 0}, {_id: 0, in_clan: 0, clanId: 0, earned: 0}, {sort: {date: -1}});
        if(requests){
            if(requests.length > 0){
                requests = JSON.parse(JSON.stringify(requests));
                for (let i in requests) {
                    let u = await getUserInfo(requests[i].login, {score: 1, vip: 1, kry: 1, auth_date: 1});
                    let user_rank = getRank(u.score, u.vip);
                    requests[i].login = user_rank + "|" + requests[i].login;
                    requests[i].date = toDate(requests[i].date);
                }
    
                clan.requests = requests;
            }
            
        }
    }

    clan.users = clanUsers;

    

    res.end(JSON.stringify(clan));
});


router.get('/api/clans/getclans', async function(req, res){
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }

    // let newuserc = new Clans_users({
    //     clanId: 1,
    //     login: "DanRotaru",
    //     inclan: 1,
    //     group: 5,
    // });
    // await newuserc.save();

    // let newclan = new Clans({
    //     clanId: 1,
    //     name: 'Администрация',
    //     by: 'DanRotaru',
    //     teg: 'A',
    //     description: 'Клан админов:)',
    // });
    // await newclan.save();

    let myclanId = 0;
    let clans = await Clans.find({}, {description: 0, violations: 0, _id: 0});
    if(!clans){
        res.end(JSON.stringify({
            error: "Нет кланов!"
        }));
        return;
    }
    for (const clan of clans) {
        if(clan.by == userInfo.login){
            myclanId = clan.clanId;
            break;
        }
    }
    if(myclanId == 0){
        let myclan = await Clans_users.findOne({login: userInfo.login, in_clan: 1}, {clanId: 1, _id: 0});
        if(myclan) myclanId = myclan.clanId;
    }

    clans = JSON.parse(JSON.stringify(clans));
    for (const clan of clans) {
        let by = await getUserInfo(clan.by, {score: 1, vip: 1});
        let user_rank = getRank(by.score, by.vip);
        clan.by = user_rank + "|" + clan.by;
        clan.date = toDate(clan.date, 1);
    }
    
    // for (let clan of clans) {
    //     // console.log(clan);
    //     
    //     // let clanUsers = await Clans_users.countDocuments({clan_id: clan.clanId}, {inclan: 1});
    //     let clanUsers = await Clans_users.find({clanId: clan.clanId, in_clan: 1}, {_id: 0, in_clan: 0, clanId: 0, group: 0});
    //     // console.log(clanUsers);
    //     // clan['users'] = 123;
    //     clan.users = clanUsers;
    //     clans_res.push(clan);
    // }
    // response.clans = clans_res;

    res.end(JSON.stringify({
        clans: clans,
        myclan: myclanId
    }));
});


const create = io => {
    router.post('/api/clans/create', async (req, res) =>{
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
    
        let userInfo = await getUserInfo(auth, {login: 1, kry: 1, coin: 1, score: 1, vip: 1}, 1);
        if(!userInfo){
            resp(res, 401);
            return;
        }
        
        let method = req.body.method || '',
            name = req.body.name || '',
            teg = req.body.teg || '',
            logo = req.body.logo || '',
            description = req.body.description || '';
    
        let prices = [100, 1000000];
        if(method == 1){ // койн
            if(userInfo.coin < prices[0]){
                res.end(JSON.stringify({
                    error: "Недостаточно койнов!"
                }));
                return;
            }
        }
        else{ // кри
            if(userInfo.kry < prices[1]){
                res.end(JSON.stringify({
                    error: "Недостаточно кристаллов!"
                }));
                return;
            }
        }
    
        if(name.length <= 0 || teg.length <= 0){
            res.end(JSON.stringify({
                error: "Все поля обязательны к заполнению!"
            }));
            return;
        }
        if(name.length < 3){
            res.end(JSON.stringify({
                error: "Название клана слишком короткое!"
            }));
            return;
        }
        if(name.length > 30){
            res.end(JSON.stringify({
                error: "Название клана слишком длинное!"
            }));
            return;
        }
        if(teg.length > 5){
            res.end(JSON.stringify({
                error: "Тэг клана должен быть от 1 симбола до 5!"
            }));
            return;
        }
        if(description.length > 2000){
            res.end(JSON.stringify({
                error: "Описание клана слишком длинное!"
            }));
            return;
        }
        if(logo.length > 255){
            res.end(JSON.stringify({
                error: "Слишком длинная ссылка на логотип!"
            }));
            return;
        }
        
        let latin = new RegExp(/^[a-zA-Z0-9]+$/);
        if(!latin.test(teg)){
            res.end(JSON.stringify({
                error: "Неверный формат тега, используйте латинские буквы!"
            }));
            return;
        }
    
        let nameExist = await Clans.findOne({name: name}, {id: 1});
        if(nameExist){
            res.end(JSON.stringify({
                error: "Данное название клана уже существует, выберите другое название клана!"
            }));
            return;
        }
    
        let tegExist = await Clans.findOne({teg: teg}, {id: 1});
        if(tegExist){
            res.end(JSON.stringify({
                error: "Данный тэг уже занят, выберите другой!"
            }));
            return;
        }
    
    
        if(method == 1) userInfo.coin -= prices[0];
        else userInfo.kry -= prices[1];
        await userInfo.save();
    
        let clan = new Clans({
            name: name,
            by: userInfo.login,
            teg: teg,
            description: description,
            logo: logo
        });
        await clan.save();
        let createdClan = await Clans.findOne({teg: teg}, {clanId: 1, date: 1});
        
        // Выходим из клана если есть и удаляем заявки
        await Clans_users.deleteMany({login: userInfo.login});
    
        let clanU = new Clans_users({
            clanId: createdClan.clanId,
            login: userInfo.login,
            in_clan: 1,
            group: 6,
            date: createdClan.date
        });
        await clanU.save();
    
        let user_rank = getRank(userInfo.score, userInfo.vip);
        sys(`{:cClanBuy=${user_rank}=${userInfo.login}=[${teg}] ${name}=${createdClan.clanId}:}`, io);
        res.send(JSON.stringify({success: createdClan.clanId}));
    });
}
const donate = io => {
    router.post('/api/clans/:clan_id/:amount/donate', async (req, res) =>{
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
    
        let userInfo = await getUserInfo(auth, {login: 1, kry: 1, score: 1, vip: 1, cldonat: 1}, 1);
        if(!userInfo){
            resp(res, 401);
            return;
        }
        
        let amount = req.params.amount, clan_id = req.params.clan_id;
        if(isNaN(clan_id)){
            res.end(JSON.stringify({
                error: "Введите ид клана!"
            }));
            return;
        }
        amount = parseInt(amount);
        if(isNaN(amount) || amount < 1000){
            res.end(JSON.stringify({
                error: "Минимальное пожертвование: 1000 кристаллов!"
            }));
            return;
        }
        if(amount > 100000){
            res.end(JSON.stringify({
                error: "Максимальное разовое пожертвование составляет: 100000 кристаллов!"
            }));
            return;
        }
        let cldonat = userInfo.cldonat || 0;
        if (cldonat > Date.now()){
            let wait = Math.floor(((cldonat - Date.now()) / 1000) / 60) + " минут";
			// if (Math.floor((cldonat - Date.now())/6000) == 0) wait = Math.floor((($cldonat-time())/60)/60)." секунд";}
			// echo ("Для повторной пожертвование кристаллов подождите $cldonat.");
			res.end(JSON.stringify({
                error: `Для повторной пожертвование кристаллов подождите ${wait}`
            }));
            return;
		}

        if(userInfo.kry < amount){
            res.end(JSON.stringify({
                error: "Недостаточно кристаллов!"
            }));
            return;
        }
        
        let clan = await Clans.findOne({clanId: clan_id}, {clanId: 1, kry: 1, name: 1, teg: 1});
        if(!clan){
            res.end(JSON.stringify({
                error: "Введённый вами клан не найден!"
            }));
            return;
        }

        userInfo.kry -= amount;
        userInfo.cldonat = Date.now() + 3600000;
        await userInfo.save();
        clan.kry += amount;
        await clan.save();

        
        let user_rank = getRank(userInfo.score, userInfo.vip);
        sys(`{:cClanDonate=${user_rank}=${userInfo.login}=${number_format(amount)}=[${clan.teg}] ${clan.name}=${clan.clanId}:}`, io);
        res.send(JSON.stringify({success: `Вы успешно пожертвовали ${number_format(amount)} кристаллов клану [${clan.teg}] ${clan.name}`}));
    });
}
const leave = io => {
    router.post('/api/clans/:clan_id/leave', async (req, res) =>{
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
    
        let userInfo = await getUserInfo(auth, {login: 1, score: 1, vip: 1}, 1);
        if(!userInfo){
            resp(res, 401);
            return;
        }
        
        let clan_id = req.params.clan_id;
        if(isNaN(clan_id)){
            res.end(JSON.stringify({
                error: "Введите ид клана!"
            }));
            return;
        }

        let clanU = await Clans_users.findOne({clanId: clan_id, login: userInfo.login}, {clanId: 1});
        if(!clanU){
            res.end(JSON.stringify({
                error: "Запись не найдена!"
            }));
            return;
        }

        let clan = await Clans.findOne({clanId: clan_id}, {clanId: 1, by: 1, name: 1, teg: 1});
        if(!clan){
            res.end(JSON.stringify({
                error: "Введённый вами клан не найден!"
            }));
            return;
        }
        if(clan.by == userInfo.login){ // удаляем клан
            await Clans.findOneAndDelete({clanId: clan_id});
            await Clans_users.deleteMany({clanId: clan_id});
            
            let user_rank = getRank(userInfo.score, userInfo.vip);
            sys(`{:cClanRemove=${user_rank}=${userInfo.login}=[${clan.teg}] ${clan.name}:}`, io);
            res.send(JSON.stringify({success: `Вы успешно удалили клан [${clan.teg}] ${clan.name}`}));
        }
        else{ // просто покидаем клан
            await Clans_users.findOneAndDelete({clanId: clan_id, login: userInfo.login});
            res.send(JSON.stringify({success: `Вы успешно покинули клан [${clan.teg}] ${clan.name}`}));
        }

        
    });
}
router.post('/api/clans/:clan_id/request', async (req, res) => {
    let auth = await req.session.auth;
    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }
    
    let clan_id = req.params.clan_id;
    if(isNaN(clan_id)){
        res.end(JSON.stringify({
            error: "Введите ид клана!"
        }));
        return;
    }
    
    let myclan = await Clans_users.findOne({login: userInfo.login, in_clan: 1}, {clanId: 1});
    if(myclan){
        res.end(JSON.stringify({
            error: "Вы уже состоите в клан!"
        }));
        return;
    }
    let sent = await Clans_users.findOne({login: userInfo.login, clanId: clan_id}, {clanId: 1});
    if(sent){
        res.end(JSON.stringify({
            error: "Вы уже отправили заявку в этот клан!"
        }));
        return;
    }

    let clan = await Clans.findOne({clanId: clan_id}, {clanId: 1});
    if(!clan){
        res.end(JSON.stringify({
            error: "Введённый вами клан не найден!"
        }));
        return;
    }
    let newClanUser = new Clans_users({
        clanId: clan_id,
        login: userInfo.login,
        in_clan: 0
    });
    await newClanUser.save();
    res.end(JSON.stringify({
        success: 1
    }));
});
router.post('/api/clans/:clan_id/:login/:action/clan-rank', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }
    
    let clan_id = req.params.clan_id, action = req.params.action, ulogin = req.params.login;
    if(isNaN(clan_id)){
        res.end(JSON.stringify({
            error: "Введите ид клана!"
        }));
        return;
    }
    if(isNaN(action)){
        res.end(JSON.stringify({
            error: "Выберите действие!"
        }));
        return;
    }

    if(!ulogin){
        res.end(JSON.stringify({
            error: "Введите логин пользователя!"
        }));
        return;
    }
    let user = await getUserInfo(ulogin, 1);
    if(!user){
        res.end(JSON.stringify({
            error: "Введённый вами пользователь не найден!"
        }));
        return;
    }
    ulogin = user.login;

    let clan = await Clans_users.findOne({login: userInfo.login, in_clan: 1, clanId: clan_id}, {group: 1});
    if(!clan){
        res.end(JSON.stringify({
            error: "Вы не состоите в клан или введённый вами клан не найден!"
        }));
        return;
    }
    if(clan.group < 4){
        res.end(JSON.stringify({
            error: "Вы не можете понижать или повышать в должности!"
        }));
        return;
    }
    let clanU = await Clans_users.findOne({login: ulogin, clanId: clan_id, in_clan: 1}, {group: 1});
    let uGroup = clanU.group || 0;
    if(!clanU){
        res.end(JSON.stringify({
            error: "Пользователь не найден!"
        }));
        return;
    }

    
    if(action == 1){ // Повысить
        let newGroup = uGroup + 1;
        if(clan.group == 4){
            if(newGroup >= 4){
                res.end(JSON.stringify({
                    error: "Вы можете повышать только до Ветерана!"
                }));
                return;
            }
        }
        else{
            if(newGroup > 4){
                res.end(JSON.stringify({
                    error: "Достигнут предел повышения!"
                }));
                return;
            }
        }

        clanU.group = newGroup;
        await clanU.save();
        res.end(JSON.stringify({
            success: `${newGroup}|Вы успешно повысили пользователя ${ulogin} до <<${newGroup}>>!`
        }));
        return;
        
    }
    else{ // Понизить
        let newGroup = uGroup - 1;
        if(newGroup < 0){ // кикать
            await Clans_users.findOneAndDelete({login: ulogin, clanId: clan_id});
            res.end(JSON.stringify({
                success: `Кик|Вы успешно кикнули пользователя ${ulogin} из клана!`
            }));
            return;
        }
        else{
            clanU.group = newGroup;
            await clanU.save();
            res.end(JSON.stringify({
                success: `${newGroup}|Вы успешно понизили пользователя ${ulogin} до <<${newGroup}>>!`
            }));
        }
    }
});


router.post('/api/clans/:clan_id/:action/:login/request', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }
    
    let clan_id = req.params.clan_id, action = req.params.action, ulogin = req.params.login;
    if(isNaN(clan_id)){
        res.end(JSON.stringify({
            error: "Введите ид клана!"
        }));
        return;
    }

    if(!ulogin){
        res.end(JSON.stringify({
            error: "Введите логин пользователя!"
        }));
        return;
    }
    let user = await getUserInfo(ulogin, 1);
    if(!user){
        res.end(JSON.stringify({
            error: "Введённый вами пользователь не найден!"
        }));
        return;
    }
    ulogin = user.login;


    let clan = await Clans_users.findOne({login: userInfo.login, in_clan: 1, clanId: clan_id}, {group: 1});
    if(!clan){
        res.end(JSON.stringify({
            error: "Вы не состоите в клан или введённый вами клан не найден!"
        }));
        return;
    }
    if(clan.group < 4){
        res.end(JSON.stringify({
            error: "Вы не можете принять или отклонить заявки!"
        }));
        return;
    }
    let clanU = await Clans_users.findOne({login: ulogin, clanId: clan_id}, {in_clan: 1});
    if(!clanU){
        res.end(JSON.stringify({
            error: "Заявка не найдена!"
        }));
        return;
    }
    if(clanU.in_clan == 1){
        res.end(JSON.stringify({
            error: "Пользователь уже состоит в клане!"
        }));
        return;
    }

    if(action == 1){ // принять
        clanU.in_clan = 1;
        await clanU.save();
    }
    else{ // отклонить
        await Clans_users.findOneAndDelete({login: ulogin, clanId: clan_id});
    }

    res.end(JSON.stringify({
        success: 1
    }));
});

router.get('/api/clans/:clan_id/requests', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }
    
    let clan_id = req.params.clan_id;
    if(isNaN(clan_id)){
        res.end(JSON.stringify({
            error: "Введите ид клана!"
        }));
        return;
    }
    let clan = await Clans_users.find({clanId: clan_id});
    if(!clan){
        res.end(JSON.stringify({
            error: "Заявок нет!"
        }));
        return;
    }

    res.end(JSON.stringify({
        success: 1,
        requests: clan
    }));
});

module.exports = {
    router,
    create,
    donate,
    leave
}