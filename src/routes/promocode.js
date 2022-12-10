const { Router } = require('express')
const router = Router()

const Promocodes = require('../models/Promocodes')

router.get("/api/:hash/get-promocode", async (req, res) => {
    // const { createCanvas } = require("canvas");
    let hash = req.params.hash;

    const text2Svg = require('text-svg');

    if(!hash){
        res.end();
        return;
    }

    let promo = await Promocodes.findOne({hash: hash});
    if(!promo){
        res.end();
        return;
    }
    if(promo.expire < Date.now()){
        res.end();
        return;
    }

    let text = `SERIAL: ${promo.serial} CVV: ${promo.cvv}`;
    let font = '30px Arial';
    let color = '#ffef62';

    let buffer = text2Svg(text, { color: color, padding: 5, font: font});
    res.writeHead(200, { "Content-Type": "image/svg+xml", });
    res.end(buffer);
});

const create = (io) => {
    router.post("/api/promocodes/create-promo", async(req, res) => {
        let auth = await req.session.auth;
        login = await userExists(auth);
        if(!login){
            resp(res, 401);
            return;
        }


        let serial = req.body.serial?.toString();
        let cvv = req.body.cvv?.toString();
        let type = req.body.type?.toString();

    });
}

const activate = (io) => {
    router.post("/api/promocodes/activate-promo", async(req, res) => {
        let auth = await req.session.auth;
        login = await userExists(auth);
        if(!login){
            resp(res, 401);
            return;
        }

        let serial = req.body.serial?.toString();
        let cvv = req.body.serial?.toString();

        let type = req.body.type?.toString();

        if(!serial.length){
            res.end(JSON.stringify({
                error: "Введённая вами карта не найдена!"
            }));
            return;
        }

    });
}

module.exports = {
    router,
    activate
}
