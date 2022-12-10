const { Router } = require('express')
const router = Router()
const resp = require('./resp')

const User = require('../models/Users');
const Session = require('../models/Session');
const getRank = require('../data/Ranks')

router.get('/api/online', async (req, res) => {
    let auth = await req.session.auth;
    if(!auth){
        resp(res, 401);
        return;
    }

    let sessions = await Session.distinct('id_session');
    let sess = [];
    for (let id_session of sessions) {
        let user = await User.findById(id_session, {login: 1, kry: 1, score: 1, vip: 1, messages: 1});
        if(!user){
            await User.findByIdAndDelete(id_session);
            continue;
        }
        let rank = getRank(user.score, 5, user.vip);
        sess.push({
            login: user.login,
            kry: user.kry,
            rank: rank,
            messages: user.messages
        });
    }
    res.send(JSON.stringify(sess));
});

module.exports = router