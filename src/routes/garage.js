const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const { userExists } = require('../db/index')

// Models
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

// Распределяю функционал из-за его массивности
router.use(require('./garage_viewer'))
router.use(require('./garage_viewer'))

// Покупка, улучшение вооружений
const garageBuy = require('./garage_buy')
const buyItem = garageBuy.buyItem
router.use(garageBuy.router)

// Открытие контейнеров
const garageCase = require('./garage_case')
const openCase = garageCase.openCase
router.use(garageCase.router)

// Установка вооружений
const garageInstall = require('./garage_install')
const install_route = garageInstall.install_route
const send_gift = garageInstall.send_gift
router.use(garageInstall.router)

// Детали вооружений
const garagesInfo = require('./garage_info')
const garageInfo = garagesInfo.garageInfo
router.use(garagesInfo.router)

async function garage_res(myGarage, arr) {
    let response = [];

    for (let item of arr) {
        if (myGarage[item.name1] == item.type) {
            item = JSON.parse(JSON.stringify(item));
            delete item['description'];
            if(item.type > 3){
                if(myGarage[item.name1] > 0) item['have'] = 1;
                else item['have'] = 0;
            }
            else item['have'] = 1;
            if(item['have'] == 0 && item.type == 9) continue;
            response.push(item);
        }
    }
    // response = response.sort((a,b) => (myGarage[a.name1] > myGarage[b.name1]) ? 1 : ((myGarage[b.name1] > myGarage[a.name1]) ? -1 : 0));
    // response = response.sort((a,b) => (+a.type > +b.type) ? 1 : ((+b.type > +a.type) ? -1 : 0));
    // response = response.sort((a,b) => (+a.id > +b.id) ? 1 : ((+b.id > +a.id) ? -1 : 0));

    return response;
}




var login;
router.use('/api/garage/', async (req, res, next) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }

    next();
})


const getAll = async what => {
    let userGarage;
    let myGarage = {};
    if(what == 'turrets' || what == 'hulls'){
        userGarage = await Garage.findOne({login: login});
        myGarage = {};
        for(let item of allGarage){
            myGarage[item] = userGarage[item] || 0;
        }
    }

    if(what == 'turrets'){
        let turrets = await garage_res(myGarage, Turrets.Turrets);
        return turrets;
    }
    else if(what == 'hulls'){
        let hulls = await garage_res(myGarage, Hulls.Hulls);
        return hulls;
    }
    else if(what == 'paints'){
        let paints = [];
        let myPaints = await Paint.findOne({login: login});
        for (let item of Paints.Paints) {
            item = JSON.parse(JSON.stringify(item));
            if(myPaints['p'+item.id] == 1) item['have'] = 1;
            else item['have'] = 0;
            delete item['imageV'];
            delete item['description'];
            delete item['shop'];
            delete item['d'];
            paints.push(item);
        }
        paints = paints.sort((a, b) => b.have - a.have);

        return paints;
    }
    else if(what == 'cases'){
        let cases = [];
        let myCases = await Garage.findOne({login: login}, {cases: 1});
        for (let item of Containers.Containers) {
            item = JSON.parse(JSON.stringify(item));
            delete item['text'];
            if(myCases.cases[item.id - 1] > 0) item['have'] = myCases.cases[item.id - 1];
            else item['have'] = 0;
            cases.push(item);
        }
        return cases;
    }
    else if(what == 'supply'){
        let supplies = [];
        let mySupply = await Garage.findOne({login: login}, {drone: 1, batteries: 1, golds: 1});
        for (let item of Supplies.Supplies) {
            item = JSON.parse(JSON.stringify(item));
            delete item['description'];
            let have;
            if(item.unic == 0) have = mySupply.golds || 0;
            else if(item.unic == 1) have = mySupply.batteries || 0;
            else if(item.unic == 2){
                have = mySupply.drone || 0;
                have = item.id == have ? 1 : 0;
            }
            item['have'] = have;
            supplies.push(item);
        }
        return supplies;
    }
    else if(what == 'special'){
        let data = [];
        for (const gift of Gifts.Gifts) {
            data.push({
                id: gift.id,
                name: gift.name,
                price: gift.price,
                image: gift.image
            });
        }
        return data;
    }
    else if(what == 'gifts'){
        let gifts = [];
        let myGifts = await Gift.find({tologin: login}, {type: 1, giftId: 1});
        for (const gift of myGifts) {
            let gift_item = Gifts.getGift(gift.type);
            gifts.push({
                id: gift.giftId,
                name: gift_item.name,
                image: gift_item.image
            });
        }
        return gifts;
    }
    else if(what == 'test'){

    }
}


router.get('/api/garage/:get', async (req, res) => {
    let what = req.params.get;
    const userGarage = await Garage.findOne({login: login}, {turret: 1, hull: 1, paint: 1});

    let data;
    if(what == 'turrets'){
        data = await getAll('turrets');
        res.end(JSON.stringify(data));
    }
    else if(what == 'hulls'){
        data = await getAll('hulls');
        res.end(JSON.stringify(data));
    }
    else if(what == 'paints'){
        data = await getAll('paints');
        res.end(JSON.stringify(data));
    }
    else if(what == 'cases'){
        data = await getAll('cases');
        res.end(JSON.stringify(data));
    }
    else if(what == 'supply'){
        data = await getAll('supply');
        res.end(JSON.stringify(data));
    }
    else if(what == 'special'){
        data = await getAll('special');
        res.end(JSON.stringify(data));
    }
    else if(what == 'gifts'){
        data = await getAll('gifts');
        res.end(JSON.stringify(data));
    }

    else if(what == 'all'){
        let turrets = await getAll('turrets');
        let hulls = await getAll('hulls');
        let paints = await getAll('paints');
        let cases = await getAll('cases');
        let supplies = await getAll('supply');
        let special = await getAll('special');
        let gifts = await getAll('gifts');
        
        let installedDetails = await garageInfo(userGarage['turret'], 'turret', login);
        let data = {
            Installed: {
                Turret: userGarage['turret'],
                Hull: userGarage['hull'],
                Paint: userGarage['paint'],
                installedDetails: installedDetails
            },
            Turrets: turrets,
            Hulls: hulls,
            Paints: paints,
            Cases: cases,
            Supplies: supplies,
            Special: special,
            Gifts: gifts
            
        }
        res.end(JSON.stringify(data));
    }
    else{
        res.end();
    }
});

router.get('/api/garage/get-all-paints', async(req, res) => {
    res.end(JSON.stringify({Paints}))
});

module.exports = {router, buyItem, install_route, send_gift, openCase,}