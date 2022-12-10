const { Router } = require('express')
const router = Router()

const { die } = require('../helpers');
const Users = require('../models/Users');

router.use((req, res, next) => {
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    next();
});

router.post('/auth/auth', async (req, res) => {
    let login = req.body.login?.toString();
    let password = req.body.password?.toString();

    // console.log({login, password});
    
    if(!login.length || !password.length) {
        die("Заполните все поля", res);
        return;
    }

    const user = await Users.findOne({
        login: { $regex: new RegExp("^" + login.toLowerCase(), "i") },
        password: password
    }, {id: 1, login: 1, vip: 1, ban: 1, banreason: 1});
    
    if(!user){
        die("Неверный логин или пароль!", res);
        return;
    }
    else{
        if(user.ban == 1) die("Вы были заблокированы по причине: " + user.banreason, res);
        else{
            user.auth_date = new Date();
            await user.save();

            req.session.auth = user._id.toString();
            die(1, res);
        }
    }
});

router.get('/auth/auth/:login/:password', async (req, res) => {
    let login = req.params.login;
    let password = req.params.password;

    // console.log({login, password});
    
    if(!login.length || !password.length) die("Заполните все поля", res);

    const user = await Users.findOne({
        login: { $regex: new RegExp("^" + login.toLowerCase(), "i") },
        password: password
    }, {id: 1, login: 1, vip: 1, ban: 1, banreason: 1});
    
    if(!user){
        die("Неверный логин или пароль!", res);
        return;
    }
    else{
        if(user.ban == 1) die("Вы были заблокированы по причине: " + user.banreason, res);
        else{
            user.auth_date = new Date();
            await user.save();

            req.session.auth = user._id.toString();
            die(1, res);
        }
    }
});

module.exports = router