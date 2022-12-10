const { Router } = require('express')
const router = Router()
const resp = require('./resp')

// Models
const Garage = require('../models/Garages');
const Paint = require('../models/Paints');
const Gift = require('../models/Gifts');

// Static data
const Turrets = require('../data/Turrets');
const Hulls = require('../data/Hulls');
const Paints = require('../data/Paints');
const Gifts = require('../data/Gifts');
const { allTurrets, allHulls, allGarage } = require('../data/allGarage')

const getRank = require('../data/Ranks')
const { remaining } = require('../helpers');
const { getUserInfo, sys, addProgressInTask } = require('../db/index');
const { gold } = require('../chat/functions')

// Нужна io instance чтобы применять (сбросить) голд
const install_route = async io => {
    router.post('/api/garage/:type/:id/install', async (req, res) => {
        let login, user_rank;
        let auth = await req.session.auth;
        if(!auth){
            resp(res, 401);
            return;
        }
        let userInfo = await getUserInfo(auth, {id: 1, login: 1, score: 1, vip: 1}, 1);
        login = userInfo.login;
        user_rank = getRank(userInfo.score, userInfo.vip);
        if(!login){
            resp(res, 401);
            return;
        }

        let id = req.params.id, type = req.params.type;
        if(type == 'turret' || type == 'hull'){
            if (!allGarage.includes(id)) {
                res.end();
                return;
            }
    
            if(type == 'turrets'){
                if(!allTurrets.includes(id)){
                    res.end();
                    return;
                }
            }
            else if(type == 'hull'){
                if(!allHulls.includes(id)){
                    res.end();
                    return;
                }
            }
    
            const userGarage = await Garage.findOne({login: login});
            let item = userGarage[id] || 0;
            let xts = ['_xt', '_lc', '_p', '_dc', '_tc', 'jgr', 'UT', '_n'];
            for (const i of xts) {
                if(item.toString().indexOf(i) !== -1) {
                    res.end();
                    break;
                }
            }
    
            userGarage[type] = id;
            await userGarage.save();
    
            let installed_turret = userGarage.turret,
                installed_hull = userGarage.hull,
                installed_paint = userGarage.paint;
            
            let turret_m = userGarage[installed_turret] || 0;
            let hull_m = userGarage[installed_hull] || 0;
    
            installed_turret = Turrets.getTurret(turret_m, installed_turret, 'img');
            installed_hull = Hulls.getHull(hull_m, installed_hull, 'img');
            let paint = Paints.getPaint(installed_paint);
            let paintV = '../' + paint.imageV;
            installed_paint = paint.image;
    
            let p = JSON.parse(JSON.stringify(paint));
            let animated = {
                animated: 0,
                frameWidth: 0,
                frameHeight: 0,
                fps: 0,
                numFrames: 0
            }
            if(p.d){
                let d = p.d.split(",");
                animated.animated = 1;
                animated.frameWidth = d[0];
                animated.frameHeight = d[1];
                animated.fps = d[2];
                animated.numFrames = d[3];
            }
    
            res.end(JSON.stringify({
                success: 1,
                info: {
                    turret: installed_turret,
                    hull: installed_hull,
                    color: [
                        paintV,
                        animated
                    ]
                }
            }));
        }
        else if(type == 'paint'){
    
            if(isNaN(id)){
                res.end();
                return;
            }
    
            let myPaints = await Paint.findOne({login: login});
            let item = myPaints['p'+id] || 0;
            if(!item){
                res.end(JSON.stringify({
                    error: "Вам это не принадлежит!"
                }));
                return;
            }
            
            const userGarage = await Garage.findOne({login: login});
            userGarage.paint = id;
            await userGarage.save();
    
            let installed_turret = userGarage.turret,
                installed_hull = userGarage.hull,
                installed_paint = userGarage.paint;
            
            let turret_m = userGarage[installed_turret] || 0;
            let hull_m = userGarage[installed_hull] || 0;
    
            installed_turret = Turrets.getTurret(turret_m, installed_turret, 'img');
            installed_hull = Hulls.getHull(hull_m, installed_hull, 'img');
            let paint = Paints.getPaint(installed_paint);
            let paintV = '../' + paint.imageV;
            installed_paint = paint.image;
    
            let p = JSON.parse(JSON.stringify(paint));
            let animated = {
                animated: 0,
                frameWidth: 0,
                frameHeight: 0,
                fps: 0,
                numFrames: 0
            }
            if(p.d){
                let d = p.d.split(",");
                animated.animated = 1;
                animated.frameWidth = d[0];
                animated.frameHeight = d[1];
                animated.fps = d[2];
                animated.numFrames = d[3];
            }
    
            res.end(JSON.stringify({
                success: 1,
                info: {
                    turret: installed_turret,
                    hull: installed_hull,
                    color: [
                        paintV,
                        animated,
                        paint.image
                    ]
                }
            }));
        }
        else if(type == 'supply'){
            if(id == 1){
                const userGarage = await Garage.findOne({login: login}, {golds: 1});
                if(userGarage.golds <= 0){
                    res.end(JSON.stringify({"error": "У вас нет золотых ящиков!"}));
                    return;
                }
                if(req.session.goldTimeout > Date.now()){
                    res.end(JSON.stringify({"error": "Золотые ящики можно бросить раз в 2 минуты. Осталось " + remaining(req.session.goldTimeout - Date.now())}));
                    return;
                }

                sys(`{:chatto-gold-soon=${user_rank}=${login}:}`, io);
                userGarage.golds = userGarage.golds - 1;
                await userGarage.save();

                setTimeout(() => {
                    gold(1, login, io);
                }, 7000);
                
                await addProgressInTask({6: 1}, login);
                req.session.goldTimeout = Date.now() + (2 * 60000);
                res.end(JSON.stringify({"success": 1}));
                return;
            }
            res.end();
            return;
        }
    
    });
}

const send_gift = async io => {
    router.post('/api/garage/send-gift', async (req, res) => {
        let login, user_rank, tologin_rank;
        let auth = await req.session.auth;
        if(!auth){
            res.status(401).end();
            return;
        }
        let userInfo = await getUserInfo(auth, {login: 1, kry: 1, score: 1, vip: 1}, 1);
        login = userInfo.login;
        user_rank = getRank(userInfo.score, userInfo.vip);
        if(!login){
            res.status(401).end();
            return;
        }

        let id = req.body.id, text = req.body.text, tologin = req.body.tologin;
        let gift = Gifts.getGift(id);
        if(!tologin){
            res.send(JSON.stringify({"error": "Введенный вами пользователь не найден!"}))
            return;
        }
        if(text.length > 300){
            res.send(JSON.stringify({"error": "Слишком длинный текст!"}))
            return;
        }
        if(!gift || isNaN(id)){
            res.send(JSON.stringify({"error": "Введенный вами подарок не найден!"}))
            return;
        }

        let user2Info = await getUserInfo(tologin, {login: 1, score: 1});
        if(!user2Info){
            res.send(JSON.stringify({"error": "Введенный вами пользователь не найден!"}))
            return;
        }
        tologin = user2Info.login;
        tologin_rank = getRank(user2Info.score, 5, user2Info.vip);

        if(userInfo.kry < gift.price){
            res.send(JSON.stringify({"error": "Недостаточно кристаллов!"}))
            return;
        }
        userInfo.kry -= gift.price;
        await userInfo.save();
        let newgift = new Gift({
            login: login,
            tologin: tologin,
            text: text,
            type: id,
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
        })
        await newgift.save();
        sys(`{:cGiftSend=${user_rank}=${login}=${tologin_rank}=${tologin}=${gift.name}:}`, io);
        if(id == 1) await addProgressInTask({7: 1}, login);
        else if(id == 2) await addProgressInTask({10: 1}, login);
        else if(id == 4) await addProgressInTask({8: 1}, login);
        else if(id == 6) await addProgressInTask({11: 1}, login);
        else if(id == 15) await addProgressInTask({9: 1}, login);
        
        res.end(JSON.stringify({"success": 1}));
    })
}

router.post('/api/garage/:id/gift-delete', async (req, res) => {

});


module.exports = {router, install_route, send_gift};