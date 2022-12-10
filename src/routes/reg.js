const { Router } = require('express')
const router = Router()

const { die, htmlspecialchars } = require('../helpers');
const Users = require('../models/Users');
const Garage = require('../models/Garages');
const Paint = require('../models/Paints');
const Message = require('../models/Chat');

router.use((req, res, next) => {
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    next();
});

const register = io => {
    router.post('/auth/reg', async (req, res) => {
        let login = req.body.login?.toString();
        let password = req.body.password?.toString();
        let ip = req.socket.remoteAddress;
    
        // console.log({login, password});
        if(!login.length || !password.length){
            die("Заполните все поля", res);
            return;
        }
    
        login = login.trim();
    
        let loginRegExp = new RegExp(/^[a-zA-Z0-9\.\-_]+$/);
        let loginRegExp1 = new RegExp(/^[a-zA-Z0-9]+$/);
        let badWords = ["danrotaru1", "admin", "moderator", "tanki.chat", "suka", "syka", "cyka", "pidr", "pidar", "pidor", "lox", "loh", "pizdec", "huilo", "gandon", "blya", "blyat", "suchka", "pizda", "haxyu", "gavno", "porno", "pizdabol"];
    
        if(login.length < 4){
            die("Недопустимое кол-во символов!", res);
            return;
        }
        else if(login.length > 20){
            die("Недопустимое кол-во символов!", res);
            return;
        }
        else if(!loginRegExp.test(login)){
            die("Недопустимое имя!", res);
            return;
        }
        else if(!loginRegExp1.test(login.slice(-1))){
            die("Недопустимое имя!", res);
            return;
        }
        else if(!loginRegExp1.test(login[0])){
            die("Недопустимое имя!", res);
            return;
        }
        else if(badWords.includes(login.toLowerCase())){
            die("Недопустимое имя!", res);
            return;
        }
        for(let word of badWords){
            if(login.toLowerCase().search(word) > -1){
                die("Недопустимое имя!", res);
                return;
            }
        }
    
        const user = await Users.findOne({login: { $regex: new RegExp("^" + login.toLowerCase(), "i") }}, {login: 1});
    
        if(user){
            die("Данное имя уже занято!", res);
            return;
        }
    
        login = htmlspecialchars(login);
        password = htmlspecialchars(password);
    
        // Успешная регистрация
        const newUser = new Users({
            login: login,
            password: password,
            reg_ip: ip,
            last_ip: ip
        })
        
        let createdUser = await newUser.save();

        // Создаём гараж пользователя
        const newGarage = new Garage({login: login});
        await newGarage.save();

        const newPaint = new Paint({login: login});
        await newPaint.save();

        // Добавляем сообщение в чат
        let regMsg = new Message({
            login: 'sys',
            group: 9,
            text: 'Приветствуем нового пользователя {:c-user='+login+':}'
        });
        regMsg = await regMsg.save();

        let regMsgReturn = {
            _id: regMsg._id,
            text: regMsg.text,
            login: regMsg.login,
            group: 9
        }
        io.emit('ChatMsg', [regMsgReturn]);
        
        req.session.auth = createdUser._id.toString();
        die(1, res);
    });
}

router.post('/auth/name', async (req, res) => {
    let login = req.body.login;
    
    login = login.trim();

    let loginRegExp = new RegExp(/^[a-zA-Z0-9\.\-_]+$/);
    let loginRegExp1 = new RegExp(/^[a-zA-Z0-9]+$/);
    let badWords = ["danrotaru1", "admin", "moderator", "tanki.chat", "ebIan", "suka", "syka", "cyka", "pidr", "pidar", "pidor", "lox", "loh", "pizdec", "huilo", "gandon", "blya", "blyat", "suchka", "pizda", "haxyu", "gavno", "eblan", "porno", "pizdabol"];

    if(login.length < 4){
        die("Недопустимое кол-во символов!", res);
        return;
    }
    else if(login.length > 17){
        die("Недопустимое кол-во символов!", res);
        return;
    }
    else if(!loginRegExp.test(login)){
        die("Недопустимое имя!", res);
        return;
    }
    else if(!loginRegExp1.test(login.slice(-1))){
        die("Недопустимое имя!", res);
        return;
    }
    else if(!loginRegExp1.test(login[0])){
        die("Недопустимое имя!", res);
        return;
    }
    else if(badWords.includes(login.toLowerCase())){
        die("Недопустимое имя!", res);
        return;
    }
    for(let word of badWords){
        if(login.toLowerCase().search(word) > -1){
            die("Недопустимое имя!", res);
            return;
        }
    }

    const user = await Users.findOne({login: { $regex: new RegExp("^" + login.toLowerCase(), "i") }}, {login: 1});

    if(user) die("Данное имя уже занято!", res);
    else die(1, res);

});

module.exports = {router, register}