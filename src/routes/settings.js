const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const { getUserInfo, userExists } = require('../db/index')

/*
showmenu
smilesclose
showgarage
uppercase
ambientSound
goldSound

*/

router.post("/api/settings/:option", async(req, res) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }

    let option = req.params.option, value = req.body.value;
    let possibleOptions = [
        'showmenu', 
        'showviewer', 
        'smilesclose', 
        'uppercase', 
        'ambientSound', 
        'goldSound',
        'caseSound',
        'theme'
    ]
    if(!option || !value){
        res.end(JSON.stringify({
            error: "Не выбрано никакое действие!"
        }));
        return;
    }
    if(option.length < 1 || value.length < 1 || isNaN(value)){
        res.end(JSON.stringify({
            error: "Не выбрано никакое действие!"
        }));
        return;
    }
    if(!possibleOptions.includes(option)){
        res.end(JSON.stringify({
            error: "Вы выбрали не существующее действие!"
        }));
        return;
    }
    let info = await getUserInfo(auth, { settings: 1 }, 1);
    if(!info.settings){
        info.settings = {
            showmenu: 0,
            showviewer: 0,
            smilesclose: 0,
            uppercase: 0,
            ambientSound: 0,
            goldSound: 0,
            caseSound: 0,
            theme: 0
        }
        await info.save();
    }

    info.settings[option] = value;
    await info.save();
    res.send(JSON.stringify({success: 1}));
});

module.exports = router