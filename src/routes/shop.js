const { Router } = require('express')
const router = Router()

const getRank = require('../data/Ranks')
const { getUserInfo } = require('../db/index')
const { number_format } = require('../helpers')

const Users = require('../models/Users');
const Garage = require('../models/Garages');
const Paint = require('../models/Paints');
const Message = require('../models/Chat');

// Static data
const Turrets = require('../data/Turrets');
const Hulls = require('../data/Hulls');
const Paints = require('../data/Paints');


router.get('/api/shop-paints', async function(req, res){
    let auth = await req.session.auth;
    if(!auth){
        res.send();
        return;
    }

    let userInfo = await getUserInfo(auth, 1, 1);
    if(!userInfo){
        res.send();
        return;
    }
    let paintsArr = [];
    let myPaints = await Paint.findOne({login: userInfo.login});
        
    for (let paint of Paints.Paints) {
        if(paint.unic == 2){
            let have = myPaints["p"+paint.id] || 0;
            if(!have) paintsArr.push({id: paint.id, price: paint.price, image: paint.image, name: paint.name});
        }
    }

    res.end(JSON.stringify(paintsArr));
});

const sys = async (msg, rank, vip, io) => {
    let savetodb = new Message({
        login: 'sys',
        group: 9,
        text: msg
    });
    if(rank) savetodb['user_rank'] = rank;
    if(vip) savetodb['user_vip'] = vip;
    savetodb = await savetodb.save();

    let res = {
        _id: savetodb._id,
        text: savetodb.text,
        login: savetodb.login,
        group: 9
    }
    if(rank) res['user_rank'] = rank;
    if(vip) res['user_vip'] = vip;
    
    io.emit('ChatMsg', [res]);
    return;
}

const buy = io => {
    router.post('/api/shop/:type/:amount/shop-buy', async (req, res) => {
        let auth = await req.session.auth;
        if(!auth){
            res.send();
            return;
        }
        let type = req.params.type;
        let amount = req.params.amount;
        if(!type.length || !amount.length){
            res.send();
            return;
        }
    
        let userInfo = await getUserInfo(auth, {login: 1, vip: 1, score: 1, coin: 1, kry: 1}, 1);
        if(!userInfo){
            res.send();
            return;
        }
        
    
        if(type == 'crystalls'){
            let buy = [
                { price: 5, receive: 5000 },
                { price: 50, receive: 50000 },
                { price: 100, receive: 100000 },
                { price: 489, receive: 500000 },
                { price: 799, receive: 1000000 },
                { price: 1499, receive: 2000000 },
            ];
            
            let find = false;
            for (const i of buy) {
                if(i.price == amount){
                    find = true;
                    break;
                }
            }
            if(!find || isNaN(amount)){
                res.send(JSON.stringify({error: "Вы выбрали несуществующий предмет."}));
                return;
            }
            let selected;
            for (let i of buy) {
                if (i.price == amount) {
                    selected = i;
                    break;
                }
            }
    
            if(userInfo.coin < selected.price){
                res.send(JSON.stringify({error: "Недостаточно койнов!"}));
                return;
            }

            userInfo.coin = userInfo.coin - selected.price;
            userInfo.kry  = userInfo.kry + selected.receive;
            await userInfo.save();
            user_rank = getRank(userInfo.score, userInfo.vip);
            let item = number_format(selected.receive) + ' кристаллов';
            sys(`{:cBuyS=${user_rank}=${userInfo.login}=${item}:}`, 0, 0, io);
            res.send(JSON.stringify({success: item, info: {kry: userInfo.kry, coin: userInfo.coin}}));
        }
        else if(type == 'premium'){
            let buy = [
                { price: 10, receive: 1440, desc: '1 день'},
                { price: 40, receive: 5760, desc: '4 дня' },
                { price: 70, receive: 10080, desc: '7 дней' },
                { price: 129, receive: 20160, desc: '14 дней' },
                { price: 289, receive: 43200, desc: '30 дней' },
                { price: 799, receive: 129600, desc: '90 дней' },
            ];
            
            let find = false;
            for (const i of buy) {
                if(i.price == amount){
                    find = true;
                    break;
                }
            }
            if(!find || isNaN(amount)){
                res.send(JSON.stringify({error: "Вы выбрали несуществующий предмет."}));
                return;
            }
            let selected;
            for (let i of buy) {
                if (i.price == amount) {
                    selected = i;
                    break;
                }
            }
    
            if(userInfo.coin < selected.price){
                res.send(JSON.stringify({error: "Недостаточно койнов!"}));
                return;
            }

            userInfo.coin = userInfo.coin - selected.price;
            if(userInfo.vip > Date.now()){
                userInfo.vip = userInfo.vip + (selected.receive * 60000);
            }
            else userInfo.vip = Date.now() + (selected.receive * 60000);
            // userInfo.vip = (Date.now() - userInfo.vip) + (selected.receive * 60000);
            await userInfo.save();
            user_rank = getRank(userInfo.score, userInfo.vip);
            let item = 'премиум  аккаунт на ' + selected.desc;
            sys(`{:cBuyS=${user_rank}=${userInfo.login}=${item}:}`, 0, 0, io);
            res.send(JSON.stringify({success: item, info: {rank: user_rank, coin: userInfo.coin}}));
        }
        else if(type == 'batteries'){
            let buy = [
                { price: 10, receive: 50},
                { price: 20, receive: 100 },
                { price: 50, receive: 300 }
            ];
            
            
            let find = false;
            for (const i of buy) {
                if(i.price == amount){
                    find = true;
                    break;
                }
            }
            
            if(!find || isNaN(amount)){
                res.send(JSON.stringify({error: "Вы выбрали несуществующий предмет."}));
                return;
            }
            let selected;
            for (let i of buy) {
                if (i.price == amount) {
                    selected = i;
                    break;
                }
            }
    
            if(userInfo.coin < selected.price){
                res.send(JSON.stringify({error: "Недостаточно койнов!"}));
                return;
            }

            let batteries = await Garage.findOne({login: userInfo.login}, {batteries: 1});
            batteries.batteries = batteries.batteries || 0;
            batteries.batteries += 0;
            await batteries.save();

            userInfo.coin = userInfo.coin - selected.price;
            await userInfo.save();
            user_rank = getRank(userInfo.score, userInfo.vip);
            let item = selected.price + ' батареек';
            sys(`{:cBuyS=${user_rank}=${userInfo.login}=${item}:}`, 0, 0, io);
            res.send(JSON.stringify({success: item, info: {rank: user_rank, coin: userInfo.coin}}));
        }
    });
}



module.exports = {
    buy,
    router
}