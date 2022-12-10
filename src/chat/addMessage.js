const { die, dieS, htmlspecialchars, find, remaining, ModernUser, getNumEnding, time, endsWith } = require('../helpers');
const Users = require('../models/Users');
const Message = require('../models/Chat');
const Config = require('../models/Config');
const Session = require('../models/Session');
const { getUserInfo, getAccount, sys, addProgressInTask } = require('../db/index');
const filter = require('./filter')
const getRank = require('../data/Ranks')

const { gold } = require('../chat/functions');
const Clans = require('../models/Clans');
const Clans_users = require('../models/Clans_users');


const chatSettings = {
    htmlTagsUsers: ["DanRotaru"],
    maxLength: 500,
    autoStop: {
        start: 9,
        stop: 23
    }
}

const asys = sys;

async function addMessage(socket, msg, login, ip, io){
    const ask = (msg) => dieS('ChatMsg', msg, socket);
    const command = (msg) => dieS('ChatMsg', JSON.stringify({"command": msg}), socket);
    const delMsg = (login, id) => io.emit('ChatMsgDel', {login: login, id: id});
    let sys = async (msg) => asys(msg, io);

    let info = await getUserInfo(login, 3);
    if(!info) return;
    login = info.login;
    msg = msg.toString();
    msg = msg.trim();

    if(msg.length <= 0){
        ask('Введите сообщение');
        return;
    }
    else if(msg.length > chatSettings.maxLength){
        ask('Слишком длинный текст!');
        return;
    }

    // Проверяем если чат запущен
    let config = await Config.findOne({});
    if(config.enabled == 0){
        if(info.group !== 3){
            ask('Подождите, чат остановлен!');
            return;
        }
    }

    


    // Проверяем бан
    if(info.chatban > Date.now()){
        let time, chatban = info.chatban - Date.now();
        if(chatban > 99999999) time = 'НАВСЕГДА';
        else if(chatban <= 0) time = 'на 0 секунд';
        else time = 'на ' + remaining(chatban);
        
        ask(`Вы отключены от чата ${time}. Причина: ${info.chatbanreason}, см. #rules`);
        return;
    }

    // Запрещённые символы (фразы, коды) (кроме администрации)
    if(info.group !== 3){
        if(msg.indexOf("{:chatto-") !== -1 || msg.indexOf("{:c") !== -1 || msg.indexOf("[:rank") !== -1){
            ask('Данный текст запрещён к вводу!');
            return;
        }
    }

    if(msg == '/info'){
        ask(info.toString());
        return;
    }
    else if(msg == '/time'){
        let now = new Date();
        let m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        let h = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        
        let month = now.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let year = now.getFullYear();
        let day = now.getDay() < 10 ? '0' + now.getDay() : now.getDay();

        ask(`Текущее время чата (МСК): ${h}:${m} > ${day}.${month}.${year}`);
        return;
    }
    // else if(msg == '/sd'){
    //     sys("ла ла ла");
    //     return;
    // }


    // Possibility to use html tags in chat
    if(!chatSettings.htmlTagsUsers.includes(login)) msg = htmlspecialchars(msg);

    // Filter text, replace some text and more...
    msg = filter(msg);

    const badText = ["ส็็็็็็็็็็็็็็็็็็็็็็็็็็็็็็", "õ", "Õ", "░", "▄", "█", "╱", "╲", "╭", "╮", "°͡", "ʖ"];
    if(find(msg, badText)){
        ask("Данный текст запрещён к вводу!");
        return;
    }
    // else if(find(msg, ["[:rank", "{:chatto-", "{:c"])){
    //     ask("Данный текст запрещён к вводу1!");
    //     return;
    // }

    let text_param = msg.split(" ");

    if(msg == '/test'){
        command("alert('Это тест команды!')");
        return;
    }
    // Просмотр профиля пользователя
    else if((text_param[0] == "/u" || text_param[0] == "/profile") && text_param[1].length){
        command(`profile("${text_param[1]}")`);
        return;
    }
    // Просмотр гаража пользователя
    else if((text_param[0] == "/g" || text_param[0] == "/garage") && text_param[1].length){
        command(`ugarage("${text_param[1]}")`);
        return;
    }
    // Отображать текущее время сервера
    else if(text_param[0] == "/time"){
        let nowtime = new Date().toString();
        command(`ask("${nowtime}")`);
        return;
    }

    // Оскорбление администратора
    // НУЖНО ДОРАБОТАТЬ
    // const adminType = ["admin", "админ", "дан", "DanRotaru"];
    // const badWords = ["сук", "долбаеб", "ебл", "пида", "пидо", "уёбок", "дебил"];

    // if(find(msg, adminType) && find(msg, badWords)){
    //     ask("Кого ты пытаешься оскорбить?");
    //     return;
    // }
    let clan;
    let userClan = await Clans_users.findOne({login: login, in_clan: 1}, {clanId: 1, earned: 1});
    if(userClan) clan = await Clans.findOne({clanId: userClan.clanId}, {messages: 1, violations: 1, kry: 1})


    if(msg == info.last_message){
        ask('Ваше сообщение совпадает с предыдущим!');
        return;
    }

    // Антифлуд система 1 (основная)
    if(info.flood > Date.now()){
        info.chatban = Date.now() + (5 * 60000); // бан на 5 минут
        info.chatbandate = Date.now();
        info.chatbanreason = 'флуд, пункт 1.1';
        info = await info.save();

        await Message.deleteMany({login: info.login});

        let username = ModernUser(login, info.score, info.vip);

        sys(`Пользователь ${username} лишен права выхода в эфир НА 5 МИНУТ. Причина: флуд. см. #rules`);
        console.log(clan);
        if(clan){
            clan.violations = clan.violations || 0;
            clan.violations += 1;
            await clan.save();
        }
        delMsg(info.login);
        return;
    }


    // ### Команды администраторов/модераторов/кандидатов
    if(info.group == 3 || info.group == 2 || info.helper == 1){
        
        // Заблокировать пользователя в чате
        if(text_param[0] == '/ban' && text_param[1].length && text_param[2].length){
            let ulogin = text_param[1];
            let bantime = text_param[2];
            let ban_reason = text_param[3];
            if(bantime == 'forever' || bantime == 'навсегда') bantime = 99999999;

            if(isNaN(bantime)){
                ask('Неверно было указано время бана!');
                return;
            }
            bantime = Math.floor(Number(bantime));

            if(ulogin == 'DanRotaru'){
                ask('Вы пытаетесь забанить DanRotaru!');
                return;
            }
            if(bantime < 0){
                ask('Вы неверно ввели время бана!');
                return;
            }
            let user = await getUserInfo(ulogin, {login: 1, chatban: 1, vip: 1, score: 1, chatbanby: 1, chatbandate: 1, chatbanreason: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }

            if(info.group !== 3 || info.group !== 2 && info.chatban > Date.now()){
                ask(`Пользователь ${user.login} уже забанен!`);
                return;
            }

            if (ban_reason == "1.1") ban_reason = "флуд, пункт 1.1";
            else if (ban_reason == "1.2") ban_reason = "оскорбление, пункт 1.2";
            else if (ban_reason == "1.3") ban_reason = "использование мата, пункт 1.3";
            else if (ban_reason == "1.4") ban_reason = "троллинг, пункт 1.4";
            else if (ban_reason == "1.5") ban_reason = "КАПС, недопустимые символы, пункт 1.5";
            else if (ban_reason == "1.6") ban_reason = "спам, бессмысленные сообщения пункт 1.6";
            else if (ban_reason == "1.7") ban_reason = "реклама (пиар), пункт 1.7";
            else if (ban_reason == "1.8") ban_reason = "попрошайничество, пункт 1.8";
            else if (ban_reason == "1.9") ban_reason = "выпрашивание прав, пункт 1.9";
            else if (ban_reason == "1.10") ban_reason = "выдавать себя за администрации, пункт 1.10";
            else if (ban_reason == "1.11") ban_reason = "передача аккаунта, пункт 1.11";
            else if (ban_reason == "1.12") ban_reason = "недопустимый ник, пункт 1.12";
            else if (ban_reason == "1.13") ban_reason = "продажа карт, пункт 1.13";
            else if (ban_reason == "1.14") ban_reason = "Обсуждение действий модератора, пункт 1.14";
            else if (ban_reason == "1.15") ban_reason = "неоднократный флуд, пункт 1.15";
            else if (ban_reason == "1.16") ban_reason = "запрещено использовать более 5 аккаунтов, пункт 1.16";
            else if (ban_reason == "1.17") ban_reason = "оскорбление администрации чата в любой форме, пункт 1.17";
            else if (ban_reason == "1.18") ban_reason = "запрещено использовать VPN, пункт 1.18";
            else ban_reason = "флуд, пункт 1.1";

            let urang = getRank(user.score, 5, user.vip);
            if(bantime == "0"){
                sys(`{:cUban=${urang}=${user.login}=ПРЕДУПРЕЖДЁН=${ban_reason}:}`);
                return;
            }

            let bantime_s = bantime, bantime_t = '', bantime_ts = '',
                bantime_text = 'НА ', now = Date.now();
            
            if(bantime < 60){
                bantime_t = bantime;
                bantime_s = getNumEnding(bantime, ['МИНУТУ', 'МИНУТЫ', 'МИНУТ']);
            }
            else if(bantime >= 60 && bantime < 1440){
                bantime_ts = now + (bantime * 60 * 1000);
                bantime_s = remaining(bantime_ts - now);
            }
            else if(bantime >= 1440){
                bantime_ts = now + (bantime * 60 * 1000);
                bantime_s = remaining(bantime_ts - now);
            }

            bantime_s = bantime_s.toUpperCase();
            bantime_text += bantime_t + ' ' + bantime_s;

            if(bantime == 1) bantime_text = 'НА МИНУТУ';
            if(bantime == 1440) bantime_text = 'НА СУТКИ';
            else if(bantime == 10080) bantime_text = 'НА НЕДЕЛЮ';
            else if(bantime == 43800) bantime_text = 'НА МЕСЯЦ';
            else if(bantime == 99999999) bantime_text = 'НАВСЕГДА';

            user.chatban = (bantime * 60 * 1000) + now;
            user.chatbanby = info.login;
            user.chatbandate = now;
            user.chatbanreason = ban_reason;
            await user.save();

            let uclan, uclanU;
            uclanU = await Clans_users.findOne({login: login, in_clan: 1}, {_id: 0, clanId: 1});
            if(userClan) uclan = await Clans.findOne({clanId: uclanU.clanId}, {messages: 1, violations: 1, kry: 1})
            uclan.violations = uclan.violations || 0;
            uclan.violations += 1;
            await uclan.save();

            await Message.deleteMany({login: user.login});
            delMsg(user.login);
            sys(`{:cUban=${urang}=${user.login}=${bantime_text}=${ban_reason}:}`);
            return;
        }
    }

    // Команды модератора
    if(info.group == 2 || info.group == 3){
        if(text_param[0] == '/unban'){
            let ulogin = text_param[1];
            let user = await getUserInfo(ulogin, {login: 1, chatban: 1, vip: 1, score: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }
            user.chatban = 0;
            await user.save();
            let username = ModernUser(user.login, user.score, user.vip);

            sys(`Пользователь ${username} разбанен!`);
            return;
        }
    }

    // Команды администратора
    if(info.group == 3){

        if(text_param[0] == '/addcry'){
            let kry = Number(text_param[1]);
            if(isNaN(kry)){
                ask('Неверно было указано кол кри!');
                return;
            }
    
            info.kry = info.kry + kry;
            await info.save();
            ask(`Вы успешно добавили себе на счет ${kry} кри!`);
    
            getAccount(info.login, socket);
            return;
        }
        else if(text_param[0] == '/addscore'){
            let score = Number(text_param[1]);
            if(isNaN(score)){
                ask('Неверно было указано кол опыта!');
                return;
            }
            info.score = info.score + score;
            await info.save();
            ask(`Вы успешно добавили себе на счет ${score} опыта!`);
            
            getAccount(info.login, socket);
            return;
        }
        else if(text_param[0] == '/addcoin'){
            let coin = Number(text_param[1]);
            if(isNaN(coin)){
                ask('Неверно было указано кол койн!');
                return;
            }
            info.coin = info.coin + coin;
            await info.save();
            ask(`Вы успешно добавили себе на счет ${coin} койнов!`);
    
            getAccount(info.login, socket);
            return;
        }

        if(msg == '/clear'){
            await Message.deleteMany({});
            delMsg(false, 'all');
            sys('Чат очищен!');
            return;
        }
        else if(msg == '/start'){
            config.enabled = 1;
            config = await config.save();
            sys('Чат запущен!');
            return;
        }
        else if(msg == '/stop'){
            config.enabled = 0;
            config = await config.save();
            sys('Чат остановлен!');
            return;
        }
        else if(text_param[0] == '/ask'){
            msg = msg.replace('/ask', '');
            sys(msg);
            return;
        }
        else if(msg == '/golder'){
            sys("{:chatto-gold-soon:}");
            setTimeout(() => {
                gold(1, login, io);
            }, 7000);
            return;
        }
        else if(msg == '/agolder'){
            sys("{:chatto-gold-soon:}");
            return;
        }
        else if(msg == '/gold'){
            gold(1, login, io);
            return;
        }
        else if(msg == '/megagolder'){
            sys("{:chatto-ugold-soon:}");
            setTimeout(() => {
                gold(2, login, io);
            }, 7000);
            return;
        }
        else if(msg == '/amegagolder'){
            sys("{:chatto-ugold-soon:}");
            return;
        }
        else if(msg == '/megagold'){
            gold(2, login, io);
            return;
        }
        else if(text_param[0] == '/kick'){
            let ulogin = text_param[1];
            let showInChat = text_param[2] || 0; // по умолчанию нет

            let user = await Users.findOne({login: ulogin}, {id: 1, login: 1, score: 1, vip: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }

            let username = ModernUser(user.login, user.score, user.vip);

            let kickedUser = await Session.deleteOne({login: user.login});
            if(kickedUser){
                io.emit('checkUser', user.login);
                if(showInChat) sys(`Пользователь ${username} кикнут!`);
                return;
            }
            return;
        }
        else if(text_param[0] == '/udel'){
            let ulogin = text_param[1];
            let showInChat = text_param[2] || 0; // по умолчанию да

            let user = await Users.findOne({login: ulogin}, {id: 1, login: 1, score: 1, vip: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }

            let username = ModernUser(user.login, user.score, user.vip);

            let deletedUser = await Users.deleteOne({login: user.login});
            if(deletedUser){
                io.emit('checkUser', user.login);
                if(!showInChat){
                    sys(`Пользователь ${username} удалён!`);
                    return;
                }
            }
        }
        // Отправить изображение в чат
        else if (text_param[0] == '/img') {
            let image = text_param[1];
            // Длина изображении, по умолчанию 100% (во всю длину чата, 1 - auto (оригинальный размер изображении) )
            let width = text_param[2];
            if (width == "1") width = 'auto';
            let user_text;
            if (!width.length) user_text = `<img src="${image}" style="width:100%">`;
            else user_text = `<img src="${image}" style="width: ${width}">`;
            sys(user_text);
            return;
        }
        else if(text_param[0] == '/kry'){
            let ulogin = text_param[1];
            let kry = Number(text_param[2]);
            let showInChat = text_param[3] || 1; // по умолчанию да

            let user = await Users.findOne({login: ulogin}, {id: 1, login: 1, score: 1, vip: 1, kry: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }
            user.kry = user.kry + kry;
            await user.save();

            let username = ModernUser(user.login, user.score, user.vip);
            let what = getNumEnding(kry, ['кристалл', 'кристалла', 'кристаллов']);

            if(showInChat){
                if(kry < 0) sys(`С аккаунта пользователя ${username} снято <y>${Math.abs(kry)} ${what}</y>`);
                else sys(`Пользователь ${username} получил <y>${kry} ${what}</y>`);
            }
            return;
        }
        else if(text_param[0] == '/score'){
            let ulogin = text_param[1];
            let score = Number(text_param[2]);
            let showInChat = text_param[3] || 1; // по умолчанию да

            let user = await Users.findOne({login: ulogin}, {id: 1, login: 1, score: 1, vip: 1, kry: 1});
            if(!user){
                ask('Введённый вами пользователь не найден!');
                return;
            }
            user.score = user.score + score;
            await user.save();

            let username = ModernUser(user.login, user.score, user.vip);

            if(showInChat){
                if(score < 0) sys(`С аккаунта пользователя ${username} снято <y>${Math.abs(score)} очков опыта</y>`);
                else sys(`Пользователь ${username} получил <y>${score} очков опыта</y>`);
            }
            return;
        }
        // if(text_param[0] == '/kry' && text_param[1].length && text_param[2].length){

        // }

    }
    else{
        info.flood = Date.now() + 500;
        info = await info.save();
    }

    // Проверяем если у пользователя vip
    let vip = info.vip > Date.now() ? 1 : 0;


    // Писать пользователям
    let writeToLogin = false, pm = 0, tologinRank;
    if(text_param[0] == '/to' && text_param[1].length && text_param[2].length){
        let tologin = text_param[1];

        if(tologin == login){
            ask('Вы пытаетесь себе написать!');
            return;
        }

        let find = await Users.findOne({login: tologin}, {login: 1, score: 1, vip: 1});
        if(!find){
            ask('Введённый вами пользователь не найден!');
            return;
        }
        tologinRank = getRank(find.score, 5, find.vip);
  
        msg = msg.replace("/to ", "");
        msg = msg.replace(tologin + " ", "");
        writeToLogin = tologin;
    }
    else if(text_param[0] == '/pm' && text_param[1].length && text_param[2].length){
        let tologin = text_param[1];
        if(tologin == login){
            ask('Вы пытаетесь себе написать!');
            return;
        }
        let find = await Users.findOne({login: tologin}, {login: 1, score: 1, vip: 1});
        if(!find){
            ask('Введённый вами пользователь не найден!');
            return;
        }
        tologinRank = getRank(find.score, 5, find.vip);

        msg = msg.replace("/pm ", "");
        msg = msg.replace(tologin + " ", "");
        writeToLogin = tologin;
        pm = 1;
    }


    if(msg[0] == '/'){
        ask('Введённая вами команда не найдена!');
        return;
    }

    let userRank = getRank(info.score, 5, info.vip);
    let howmuch = info.howmuch.split("|").map(Number);
    let plusvip = 0, plusvip_score = 0;
    if(info.vip > Date.now()){
        plusvip = 100
        plusvip_score = 5;
    }

    // Даём всё пользователю
    info.kry += 100 + howmuch[0] + howmuch[1] + plusvip;
    info.score += 5 + howmuch[2] + plusvip_score;
    info.ccoins += howmuch[3];
    info.messages = info.messages + 1;
    info.last_message1 = info.last_message;
    info.last_message = msg;
    info = await info.save();

    // обновляем задания
    await addProgressInTask({
        1: 1,
        2: 100 + howmuch[0] + howmuch[1] + plusvip,
        4: 5 + howmuch[2] + plusvip_score,
    }, login);

    // Обновляем клан
    if(clan){
        let clanKry = 10;
        userClan.earned += clanKry
        await userClan.save();
        
        clan.messages += 1;
        clan.kry += clanKry;
        await clan.save();
    }

    // Обновляем стату
    config.messages = config.messages + 1;
    if(!pm) config.fond = config.fond + 2;
    await config.save();

    // Отправляем сообщение
    let result;
    if(writeToLogin){
        result = new Message({
            login: login,
            tologin: writeToLogin,
            text: msg,
            time: new Date(),
            ip: ip,
            group: info.group,
            pm: pm,
            user_msg: info.messages,
            user_rank: userRank,
            user1_rank: tologinRank
        })
        
        result = await result.save();
    }
    else{
        result = new Message({
            login: login,
            text: msg,
            time: new Date(),
            ip: ip,
            group: info.group,
            user_msg: info.messages,
            user_rank: userRank
        })
        
        result = await result.save();
    }

    // if(endsWith(config.fond, "489")) sys("{:chatto-sgold-soon:}");
    // else if(endsWith(config.fond, "01") && !endsWith(config.fond, "501")) await gold(1, io);
    // else if(endsWith(config.fond, "501")) await gold(1, io);

    if (!pm) {
        if(config.cgolds){
            if (endsWith(config.fond, '89') && !endsWith(config.fond, '489')) sys("{:chatto-gold-soon:}");
            else if (endsWith(config.fond, '489')) sys("{:chatto-ugold-soon:}");
            else if (endsWith(config.fond, '01') && !endsWith(config.fond, '501')) await gold(1, login, io);
            else if (endsWith(config.fond, '501')) await gold(2, login, io);
        }
        else{
            if (endsWith(config.fond, '489')) sys("{:chatto-gold-soon:}");
            else if (endsWith(config.fond, '189')) sys("{:chatto-ugold-soon:}");
            else if (endsWith(config.fond, '501')) await gold(1, login, io);
            else if (endsWith(config.fond, '201')) await gold(2, login, io);
        }
    }

    getAccount(login, socket);
    return{
        mylogin: login,
        mygroup: info.group,
        writeToLogin,
        pm,
    };
}

module.exports = addMessage;