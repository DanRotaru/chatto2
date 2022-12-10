const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const { getUserInfo } = require('../db/index');
const User = require('../models/Users');
const Session = require('../models/Session');
const getRank = require('../data/Ranks')


router.get('/api/profile/:login', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    if(!req.params.login || req.params.login.length < 1){
        res.end(JSON.stringify({
            error: "Введите логин пользователя!"
        }));
        return;
    }

    let login = req.params.login;

    let user = await getUserInfo(login, {
        userId: 1,
        login: 1,
        messages: 1,
        group: 1,
        score: 1,
        kry: 1,
        coin: 1,
        howmuch: 1,
        reg_ip: 1,
        last_ip: 1,
        reg_date: 1,
        last_date: 1,
        bandate1: 1,
        last_message: 1,
        last_message1: 1,
        ccoins: 1,
        golds: 1,
        _id: 0
    });
    user = JSON.parse(JSON.stringify(user));

    let ME = await getUserInfo(auth, {login: 1, group: 1}, 1);
    if(ME){
        if(ME.group < 2){
            delete user.reg_ip;
            delete user.last_ip;
        }
    }

    res.end(JSON.stringify(user));
});

module.exports = router;