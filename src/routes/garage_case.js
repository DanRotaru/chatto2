const { Router } = require('express')
const router = Router()
const resp = require('./resp')

// Models
const User = require('../models/Users');
const Garage = require('../models/Garages');

// Static data
const Containers = require('../data/Containers');

const getRank = require('../data/Ranks');
const { userExists, getUserInfo, sys, addProgressInTask } = require('../db/index');
const { rand, getNumEnding, number_format } = require('../helpers');


async function open(id, item, login, io, num){
    let prize = 0, prize_text = '';
    let info = await Garage.findOne({login: login}, {cases: 1, casesTimer: 1});
    let c = info.cases[item.id - 1] || 0;
    num = num || 0;
    if(c < num){
        return JSON.stringify({"error": "Недостаточно кол-во контейнеров."});
    }
    let timer = info.casesTimer || 0;
    if(timer > Date.now()){
        let time = Math.floor((timer - Date.now())  / 1000);
        return JSON.stringify({"error": `Открывать контейнеры можно раз в минуту. Подождите ${time} сек.`});
    }


    let num1 = num || 1;
    let numc = '', openInfo, img;
    let prize_kry = 0, prize_score = 0, prize_vip = 0, prize_golds = 0;
    let prizeId, prizeName, displayName;

    info.cases[item.id - 1] -= num1;
    info.casesTimer = Date.now() + 60000;
    await info.save();
    let user = await getUserInfo(login, {kry: 1, score: 1, vip: 1});

    if(id == 1) await addProgressInTask({13: num1}, login);
    else if(id == 2) await addProgressInTask({14: num1}, login);
    else if(id == 3) await addProgressInTask({16: num1}, login);
    else if(id == 4) await addProgressInTask({12: num1}, login);
    else if(id == 5) await addProgressInTask({15: num1}, login);

    // Первые 3 контейнера, один из двух призов (кри или опыт)
    let what, prize_name;
    if(id > 5){
        return JSON.stringify({"error": "На данный момент нельзя открывать этот контейнер."});
    }
    if(id <= 5){
        if(num > 0){
            numc = ' (x'+num+')';
            openInfo = [];
            for(let i = 0; i < num; i++){
                if(id <= 3) what = rand(0, 1);
                else if(id == 4 || id == 5) what = 0;

                prize_name = item.prize[what].replace('от ', '').replace(' кристаллов', '').replace(' опыта').split("до").map(n => parseInt(n.replace(/\s/g, '')));
                if(id == 5) what = 1;
                prize = rand(prize_name[0], prize_name[1]);

                what == 0 ? prize_kry += prize : prize_score += prize;

                openInfo.push({
                    "type": what,
                    "amount": number_format(prize)
                });
            }
            if(prize_kry > 0 && prize_score <= 0) prize_text = prize_kry + ' ' + getNumEnding(prize_kry, ['кристалл', 'кристалла', 'кристаллов']);
            else if(prize_score > 0 && prize_kry <= 0) prize_text = prize_score + ' очков опыта';
            else if(prize_kry > 0 && prize_score > 0) prize_text = prize_kry + ' ' + getNumEnding(prize_kry, ['кристалл', 'кристалла', 'кристаллов']) + ' и ' + prize_score + ' очков опыта';
        }
        else{
            if(id <= 3) what = rand(0, 1);
            else if(id == 4 || id == 5) what = 0;
    
            prize_name = item.prize[what].replace('от ', '').replace(' кристаллов', '').replace(' опыта').split("до").map(n => parseInt(n.replace(/\s/g, '')));
            if(id == 5) what = 1;
            prize = rand(prize_name[0], prize_name[1]);
    
            if(what == 0) {
                prize_kry += prize;
                prize_text = prize_kry + ' ' + getNumEnding(prize_kry, ['кристалл', 'кристалла', 'кристаллов']);
            }
            else {
                prize_score += prize;
                prize_text = prize_score + ' очков опыта';
            } 

            openInfo = {
                "type": what,
                "amount": number_format(prize)
            }        
        }
    }
    else if(id == 6){
        if(num > 1){
            return JSON.stringify({"error": "Можно открывать только один элитный контейнер."});
        }
        what = rand(0, 1000);
        // 400 (40%) => кристаллы
        // 100 (10%) => премиум аккаунт
        // 150 (15%) => контейнеры
        // 70 (7%) => опыт
        // 260 (26%) => золотые ящики
        // 20 (2%) => скины

        if (what < 400) { // кристаллы (400)
            prizeId = 1;
            prize_kry = rand(10000, 45000);
            img = "../img/shop/crys6.webp";
            displayName = "Пакет из " + prize_kry + " кристаллов"
        }
        else if(what >= 400 && what < 500) { // премиум аккаунт (100)
            prizeId = 2;
            let vip_rand = rand(0, 1000);
            if(vip_rand < 500){
                prizeName = "1 день";
                prize_vip = 1440;
            }
            else if(vip_rand >= 500 && vip_rand <= 700){
                prizeName = "2 дня";
                prize_vip = 2880;
            }
            else if(vip_rand > 700 && vip_rand <= 850){
                prizeName = "3 дня";
                prize_vip = 4320;
            }
            else if(vip_rand > 850 && vip_rand <= 950){
                prizeName = "8 часов";
                prize_vip = 480;
            }
            else if(vip_rand > 950){
                prizeName = "неделю";
                prize_vip = 10080;
            }

            prizeName += " премиум аккаунта";
        }
        else if(what >= 500 && what < 650) { // обычные контейнеры (150)
            prizeId = 3;
            let box = rand(1, 100);
            let prize_box;
            if(box <= 40){
                prizeName = "«Контейнер 1»";
                prize_box = rand(5, 10);
            }
            else if(box > 40 && box <= 70){
                prizeName = "«Контейнер 2»";
                prize_box = rand(2, 8);
            }
            else if(box > 70 && box <= 80){
                prizeName = "«Контейнер 3»";
                prize_box = rand(2, 5);
            }
            else if(box > 80 && box <= 95){
                prizeName = "Кейс «Кристаллы»";
                prize_box = rand(1, 3);
            }
            else if(box > 95){
                prizeName = "Кейс «Опыт»";
                prize_box = rand(1, 3);
            }

            img = "/assets/img/keys.webp";
            prizeName += " в количестве " + prize_box + " штук";
            
        }
        else if(what >= 650 && what < 720) { // опыт (70)
            prizeId = 4;
            prize_kry = rand(2000, 7000);
            img = "../assets/img/score_big.webp";
        }
        else if(what >= 720 && what < 980) { // золотые ящики (260)
            prizeId = 5;
            prize_golds = rand(2, 10);
            let ending = prize_golds > 4 ? 'ов' : 'а';
            prizeName = "Набор из " + prize_golds + " золотых ящик" + ending;
            
        }
        else if(what >= 980) { // уникальные скины (20)
        }
    }
    
    user.kry += prize_kry;
    user.score += prize_score;

    await user.save();
    let user_rank = getRank(user.score, 5, user.vip);

    item.name = item.name.replace('«', '').replace('»', '');
    if(num > 0){
        let ia = num == 1 ? 1 : (1800 * num) - 1800;
        setTimeout(() => sys(`{:cCont=${user_rank}=${login}=${item.name}${numc}=${prize_text}:}`, io), ia);
    }
    else sys(`{:cCont=${user_rank}=${login}=${item.name}${numc}=${prize_text}:}`, io);
    return JSON.stringify({"success": 1, info: openInfo});
}


const openCase = async (io) => {
    router.post('/api/garage/:id/open-case', async function (req, res) {
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
        let login = await userExists(auth);
        if(!login){
            resp(res, 401);
            return;
        }
    
        let id = req.params.id;
        if(isNaN(id)){
            res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
            return;
        }
        let item = Containers.getContainer(id);
        if(!item){
            res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
            return;
        }

        let e = await open(item.id, item, login, io);
        res.send(e);
    });

    router.post('/api/garage/:id/:num/open-case', async function (req, res) {
        let auth = await req.session.auth;
        if(!auth){
            res.end();
            return;
        }
        let login = await userExists(auth);
        if(!login){
            res.end();
            return;
        }
    
        let id = req.params.id, num = req.params.num;
        if(isNaN(id)){
            res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
            return;
        }
        if(isNaN(num) || num < 0 || num > 15){
            res.send(JSON.stringify({"error": "Недопустимое кол. контейнеров!"}));
            return;
        }
        let item = Containers.getContainer(id);
        if(!item){
            res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
            return;
        }

        let e = await open(item.id, item, login, io, num);
        res.send(e);    
    });
}

router.get('/api/garage/:id/:num/buy-case', async function (req, res) {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }
    let login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }
    let id = req.params.id, num = req.params.num;
    if(isNaN(id)){
        res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
        return;
    }
    if(isNaN(num) || num < 0 || num > 1000){
        res.send(JSON.stringify({"error": "Недопустимое кол. контейнеров!"}));
        return;
    }
    let item = Containers.getContainer(id);
    if(!item){
        res.send(JSON.stringify({"error": "Введённый вами контейнер не найден!"}));
        return;
    }
    if(id > 5){
        res.send(JSON.stringify({"error": "Данный контейнер не продаётся за кристаллы!"}));
        return;
    }
    num = parseInt(num);
    let need_price = item.price * num;
    let info = await User.findOne({login: login}, {kry: 1});
    if(info.kry < need_price){
        res.send(JSON.stringify({"error": "Недостаточно кристаллов!"}));
        return;
    }

    let cases = await Garage.findOne({login: login}, {cases: 1});
    let caseNum = cases.cases;
    if(!caseNum.length) cases.cases = Array(9).fill(0);
    cases.cases[id - 1] += num;
    await cases.save();

    info.kry -= need_price;
    await info.save();
    res.send(JSON.stringify({"success": 1}));
});



module.exports = {router, openCase}