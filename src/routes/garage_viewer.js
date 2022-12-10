const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const { getUserInfo } = require('../db/index');
// Models
const Garage = require('../models/Garages');
const Lottery = require('../models/Lottery');

// Static data
const Turrets = require('../data/Turrets');
const Hulls = require('../data/Hulls');
const Paints = require('../data/Paints');


router.get('/garage-viewer', async function(req, res){
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }
    let userInfo = await getUserInfo(auth, {id: 1, login: 1, score: 1, vip: 1}, 1);
    if(!userInfo){
        resp(res, 401);
        return;
    }
    login = userInfo.login;

    let myGarage = await Garage.findOne({login: login});

    let turret_mod = myGarage[myGarage.turret] || 0;
    let hull_mod = myGarage[myGarage.hull] || 0;
    
    let turret_details = Turrets.getTurret(turret_mod, myGarage.turret, 'img');
    let hull_details = Hulls.getHull(hull_mod, myGarage.hull, 'img');

    let turret = turret_details?.toString().replace('preview.webp', '');
    let hull = hull_details?.toString().replace('preview.webp', '');
    // let paint = '../assets/garage/colors/view/Zombie_texture.jpg';
    let paint = Paints.getPaint(myGarage.paint);
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
    paint = '../' + p.imageV;

    res.set({'Content-Type': 'text/html; charset=UTF-8'});
    res.render('pages/garage-viewer', {
        installed: {
            turret: turret,
            hull: hull,
            paint: paint,
            animated: animated
        }
    });
});

router.get('/lottery', async function(req, res){
    // var lottery = new Lottery({
    //     roomId: 1,
    //     type: 0
    // });
    // await lottery.save();
    // res.send(lottery);
    let newuser = {
        login: "DanRotaru",
        messages: 100,
        kry: 200,
        type: 1
    }
    let l = await Lottery.findOne({roomId: 1});
    // l.users.push(newuser);
    // await l.save();
    res.send(l);

});

module.exports = router;