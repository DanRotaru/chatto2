const { Router } = require('express')
const router = Router()

const Users = require('../models/Users');
const getRank = require('../data/Ranks')

async function getBy(what){
    if(what == 'score'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, vip: 1, kry: 1}, {sort: {score: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'messages'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1}, {sort: {messages: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'kry'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1}, {sort: {kry: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'golds'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1}, {sort: {golds: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'loto'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1}, {sort: {lotoWins: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'new'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1, reg_date: 1}, {sort: {_id: -1}}).limit(15);
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'new1'){
        let users = await Users.find({}, {_id: 0, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1, reg_date: 1}, {sort: {_id: -1}});
        let res = [];
        for (let i of users) {
            i.rank = getRank(i.score, 5, i.vip);
            res.push(i);
        }
        return res;
    }
    else if(what == 'count'){
        let count = await Users.countDocuments();
        return count;
    }
}

router.get('/user-stats/:type', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        res.send();
        return;
    }
    let type = req.params.type;
    if(type == 'score') res.send(JSON.stringify(await getBy('score')));
    else if(type == 'messages') res.send(JSON.stringify(await getBy('messages')));
    else if(type == 'kry') res.send(JSON.stringify(await getBy('kry')));
    else if(type == 'golds') res.send(JSON.stringify(await getBy('golds')));
    else if(type == 'loto') res.send(JSON.stringify(await getBy('loto')));
    else if(type == 'new') res.send(JSON.stringify(await getBy('new')));
    else if(type == 'new1') res.send(JSON.stringify(await getBy('new1')));
    else if(type == 'all'){
        let json = {
            score: await getBy('score'),
            messages: await getBy('messages'),
            kry: await getBy('kry'),
            golds: await getBy('golds'),
            loto: await getBy('loto'),
            new: await getBy('new'),
            count: await getBy('count')
        }
        res.send(JSON.stringify(json));
    }
});

module.exports = router