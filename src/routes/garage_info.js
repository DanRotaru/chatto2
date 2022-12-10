const { Router } = require('express')
const router = Router()
const resp = require('./resp')


// Models
const User = require('../models/Users');
const Garage = require('../models/Garages');
const Paint = require('../models/Paints');
const Gift = require('../models/Gifts');

// Static data
const Turrets = require('../data/Turrets');
const Hulls = require('../data/Hulls');
const Paints = require('../data/Paints');
const Containers = require('../data/Containers');
const Supplies = require('../data/Supplies');
const Gifts = require('../data/Gifts');
const { allGarage } = require('../data/allGarage')

const { userExists, getUserInfo } = require('../db/index');
const { toDate } = require('../helpers');
const getRank = require('../data/Ranks');


// Garage Info
async function garageInfo(id, type, login){
    let data = '', userGarage, item;
    if(type == 'turret' || type == 'hull') {
        userGarage = await Garage.findOne({login: login});
        item = userGarage[id] || 0;
    }
    else if(type == 'paint') {
        userGarage = await Paint.findOne({login: login});
        item = userGarage["p"+id] || 0;
    }
    else if(type == 'case'){
        userGarage = await Garage.findOne({login: login}, {cases: 1});
        let cases = [];
        for(let i in Containers) cases.push(0);
        item = userGarage.cases || cases;
    }
    else if(type == 'supply'){
        userGarage = await Garage.findOne({login: login}, {drone: 1, batteries: 1, golds: 1});
    }

    if(type == 'turret') data = Turrets.getTurret(item, id);
    else if(type == 'hull') data = Hulls.getHull(item, id);
    else if(type == 'paint') data = Paints.getPaint(id);
    else if(type == 'case') data = Containers.getContainer(id);
    else if(type == 'supply') data = Supplies.getSupply(id);
    else if(type == 'special') data = Gifts.getGift(id);
    else if(type == 'gifts') data = Gifts.getGift(id);
    
    // data = JSON.parse(JSON.stringify(data));
    data = Object.assign({}, data);

    if(type == 'turret' || type == 'hull' || type == 'paints'){
        if(type == 'turret' || type == 'hull'){
            if(data.type < 4){
                if(allGarage.includes(id)) item = 1;
                item = item > 0 ? 1 : 0;
            }
            else{
                item = item > 0 ? 1 : 0;
            }
        }
        else{
            if(allGarage.includes(id)) item = 1;
            item = item > 0 ? 1 : 0;
        }
    }

    if(type == 'turret' || type == 'hull') {
        let xts = ['М0', 'М1', 'М2', 'М3', 'XT', 'LC', 'PR', 'DC', 'TC', '', 'UT', ''];
        let plus = 0;
        if(data['type'] > 0 && data['type'] <= 3) plus = data['type'];
        else if(data.type == 4) plus = 30;
        else if(data.type == 5) plus = 40;
        else if(data.type == 6) plus = 60;
        else if(data.type == 7) plus = 47;
        else if(data.type == 8) plus = 46;
        else if(data.type == 9) plus = 150;
        else if(data.type == 10) plus = 120;
        else if(data.type == 11) plus = 120;

        modification = ' ' + xts[data.type];

        // delete data['type'];
        data['plus'] = plus;
        data['have'] = item;

        data['name'] = data['name'] + modification;


        //Берём следующую цену
        if(data['type'] < 3){
            let next, next_id = data['type'] + 1;
            if(type == 'turret') next = Turrets.getTurret(next_id, id);
            else if(type == 'hull') next = Hulls.getHull(next_id, id);
            data['nextPrice'] = next.price;
        }
        else data['nextPrice'] = -1;
        data['installed'] = userGarage[type] == id ? 1 : 0;

        if(data.type < 4){
            if(type == 'turret') data.skins = Turrets.getSkins(id+'_');
            else if(type == 'hull') data.skins = Hulls.getSkins(id+'_');
        }
    }

    else if(type == 'paint') {
        if(isNaN(id)) return;
        id = parseInt(id);
        delete data['d'];
        delete data['imageV'];
        data['have'] = item;
        data['nextPrice'] = data['price'];
        
        //Ккоины
        let devider = 1000000;
        if(data.unic == 0) data['plus'] = data.price / devider;
        else if(data.unic == 1) data['plus'] = 2;
        else if(data.unic == 2) data['plus'] = 1;
        const garage = await Garage.findOne({login: login}, {paint: 1});
        data['installed'] = garage[type] == id ? 1 : 0;
    }
    else if(type == 'case'){
        if(isNaN(id)) return;
        let have = userGarage.cases[id - 1] || 0;
        data['have'] = have;
        //https://masteringjs.io/tutorials/mongoose/array
    }
    else if(type == 'supply'){
        if(isNaN(id)) return;
        let have;
        if(id == 1) have = userGarage.golds || 0;
        else if(id == 2) have = userGarage.batteries || 0;
        else if(id > 2){
            have = userGarage.drone || 0;
            have = id == have ? 1 : 0;
        }
        data['have'] = have;
    }
    else if(type == 'special'){
        let me = await User.findOne({login: login}, {vip: 1, kcard: 1, promocard: 1, premium_promocard: 1});
        let have;
        if(id == 'special_premium') have = (me.vip > Date.now()) ? new Date(me.vip).toISOString() : 0;
        else have = me[id] || 0;
        data['have'] = have;
    }

    else if(type == 'gifts'){
        let gift = await Gift.findOne({giftId: id});
        let giftDetails = Gifts.getGift(gift.type);
        let u = await getUserInfo(gift.login, {login: 1, score: 1, vip: 1});
        let u_rank = !u ? 1 : getRank(u.score, 5, u.vip);
        
        delete data['price'];
        data['description'] = gift.text;
        data['name'] = giftDetails.name;
        data['image'] = giftDetails.image;
        data['date'] = toDate(gift.date);
        data['login'] = u_rank + '|' + gift.login;
    }

    return data;
}

router.get('/api/garage/:id/:type', async function (req, res) {
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

    let id = req.params.id, type = req.params.type;
    let data = await garageInfo(id, type, login);
    res.send(JSON.stringify(data));
});
module.exports = {router, garageInfo}