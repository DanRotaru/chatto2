const { Router } = require('express')
const router = Router()
const resp = require('./resp')
const axios = require('axios');
require('dotenv').config()

const { getUserInfo, userExists } = require('../db/index')
// const qiwi = require('./donation_qiwi')
const QIWI = require('../payments/qiwi.class')

router.get("/api/donation", async(req, res) => {
    let auth = await req.session.auth;
    login = await userExists(auth);
    if(!login){
        resp(res, 401);
        return;
    }

    // let method = req.body.method?.toString();
    // let amount = req.body.amount?.toString();
    // let tologin = req.body.tologin?.toString();

    // if(method.length < 1 || isNaN(amount) || tologin.length < 1){
    //     res.end(JSON.stringify({
    //         error: "Введите валидные данные!"
    //     }));
    //     return;
    // }
    let tologin = 'user';
    let amount = 100;

    amount = Number(amount);

    let user = await getUserInfo(tologin);
    if(!user){
        res.end(JSON.stringify({
            error: "Введенный вами пользователь не найден!"
        }));
        return;
    }

    // axios.post("https://edge.qiwi.com/funding-sources/v2/persons/personId/accounts", {hello: 1}, {
    //     headers: {
    //         'Authorizationx': '123'
    //     }
    // })
    let qiwi = new QIWI(process.env.QIWI_NUMBER, process.env.QIWI_TOKEN);
    let b = await qiwi.getBalance();
    let d = qiwi.getBalance();
    res.send(b);
    console.log(b);
    console.log(d.then(e => {console.log(e)}));

    // axios({
    //     method: 'GET',
    //     url: `https://edge.qiwi.com/payment-history/v2/persons/${process.env.QIWI_NUMBER}/payments?rows=50&operation=IN`,
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': `Bearer ${process.env.QIWI_TOKEN}`
    //     }
    // }).then(response => {
    //     console.log("Done");
    //     console.log(response.data);
    //     res.end(JSON.stringify(response.data));
    //     return;
    // }).catch(err => {
    //     console.log('Error');
    //     res.end(JSON.stringify(err));
    //     return;
    // });

});
module.exports = router;