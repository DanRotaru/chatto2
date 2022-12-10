const { Router } = require('express')
const router = Router()
const resp = require('./resp')

// Models
const Users = require('../models/Users');
const Garage = require('../models/Garages');
const Paint = require('../models/Paints');

// Static data
const Turrets = require('../data/Turrets');
const Hulls = require('../data/Hulls');
const Paints = require('../data/Paints');
const Supplies = require('../data/Supplies');

const { allGarage } = require('../data/allGarage')

const getRank = require('../data/Ranks')
const { getUserInfo, sys } = require('../db/index');

let login, user_rank;

const buyItem = io => {
    router.post('/api/garage/:id/:type/buy', async (req, res) => {
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
        let userInfo = await getUserInfo(auth, {id: 1, login: 1, score: 1, vip: 1, kry: 1, coin: 1, howmuch: 1}, 1);
        if(!userInfo){
            resp(res, 401);
            return;
        }
        login = userInfo.login;
        user_rank = getRank(userInfo.score, userInfo.vip);

        let id = req.params.id,
            type = req.params.type,
            show_in_chat = true,
            item,
            userGarage;

        if (id.length < 1) {
            res.end(JSON.stringify({
                error: "Выберите предмет который хотите улучшить!"
            }));
            return;
        }
        
        if(type == 'turret' || type == 'hull'){
            if (!allGarage.includes(id)) {
                res.end(JSON.stringify({
                    error: "Выберите предмет который хотите улучшить!"
                }));
                return;
            }
            userGarage = await Garage.findOne({ login: login });
            item = (userGarage[id] || 0) + 1;

        }

        let item_info, plus = 0;
        if (type == 'turret') item_info = Turrets.getTurret(item, id);
        else if (type == 'hull') item_info = Hulls.getHull(item, id);
        else if (type == 'paint') item_info = Paints.getPaint(id);
        else if (type == 'supply') item_info = Supplies.getSupply(id);
        if (!item_info) {
            res.end(JSON.stringify({
                error: "Данный предмет не действителен!"
            }));
            return;
        }

        if(type !== "paint"){
            if (userInfo.kry < item_info.price) {
                res.end(JSON.stringify({
                    error: "Недостаточно кристаллов!"
                }));
                return;
            }
        }
        

        let modification = '';
        let newName = JSON.parse(JSON.stringify(item_info));
        let howmuch = userInfo.howmuch.split("|").map(Number);

        if(type == 'turret' || type == 'hull'){
            if(item > 3){ // покупка скинов (надо будет додлать)
                res.end();
                return;
            }

            let xts = ['М0', 'М1', 'М2', 'М3', 'XT', 'LC', 'PR', 'DC', 'TC', '', 'UT', ''];
            if (item_info['type'] > 0 && item_info['type'] <= 3) plus = item_info['type'];
            else if (item_info.type == 4) plus = 30;
            else if (item_info.type == 5) plus = 40;
            else if (item_info.type == 6) plus = 60;
            else if (item_info.type == 7) plus = 47;
            else if (item_info.type == 8) plus = 46;
            else if (item_info.type == 9) plus = 150;
            else if (item_info.type == 10) plus = 120;
            else if (item_info.type == 11) plus = 120;
            
            modification = ' ' + xts[item_info.type];

            if(type == 'turret') howmuch[0] += plus;
            else if(type == 'hull') howmuch[1] += plus;
            

            userGarage[id] = item;
            await userGarage.save();
        }
        else if(type == 'paint'){
            if(item_info.unic == 1){
                res.end(JSON.stringify({
                    error: "Данную краску нельзя купить!"
                }));
                return;
            }
            else if(item_info.unic == 2){
                if (userInfo.coin < item_info.price) {
                    res.end(JSON.stringify({
                        error: "Недостаточно коинов!"
                    }));
                    return;
                }
            }
            else{
                if (userInfo.kry < item_info.price) {
                    res.end(JSON.stringify({
                        error: "Недостаточно кристаллов!"
                    }));
                    return;
                }
            }

            let devider = 1000000;
            plus = 0;
            if(item_info.unic == 0) plus = item_info.price / devider;
            else if(item_info.unic == 1) plus = 2;
            else if(item_info.unic == 2) plus = 1;
            howmuch[3] += plus;
            newName.name = 'краску=' + newName.name;
            modification = '';

            let myPaints = await Paint.findOne({login: login});
            if(myPaints['p' + id]){
                res.end(JSON.stringify({
                    error: "Вы уже купили данную краску!"
                }));
                return;
            }
            myPaints['p'+id] = 1;
            await myPaints.save();
        }
        else if(type == "supply"){
            if(item_info.unic == 1){
                res.end();
                return;
            }
            else if(item_info.unic == 0){ // покупка золотых
                const userGarage = await Garage.findOne({ login: login }, {golds: 1});
                userGarage.golds = userGarage.golds || 0;
                userGarage.golds += 1;
                await userGarage.save();
            }
            else if(item_info.unic == 2){ // дроны
                const userGarage = await Garage.findOne({ login: login }, {drone: 1});
                if(userGarage.drone == id){
                    res.end(JSON.stringify({
                        error: "Вы уже используйте данный дрон!"
                    }));
                    return;
                }
                userGarage.drone = id;
                howmuch[2] = Number(item_info.description.replace('+ ','').replace('опыта',''));
                await userGarage.save();
            }
            show_in_chat = false;
        }
        
        
        
        howmuch = howmuch.join("|");
        if(type == 'paint' && parseInt(item_info.unic) > 0){
            userInfo.coin = userInfo.coin - item_info.price;
        }
        else userInfo.kry = userInfo.kry - item_info.price;
        
        userInfo.howmuch = howmuch;
        await userInfo.save();
        
        
        res.end(JSON.stringify({
            success: 1
        }));

        if(show_in_chat) sys(`{:cBuy=${user_rank}=${login}=${newName.name}${modification}:}`, io);
        return;
    });
}
module.exports = {router, buyItem}