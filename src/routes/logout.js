const { Router } = require('express')

const router = Router()
const Session = require('../models/Session');

const logout = (io) => {
    router.get('/logout', async (req, res) => {
        let auth = await req.session.auth;
        await Session.findOneAndDelete({id_session: auth});
    
        let n = await Session.distinct('id_session');
        io.emit('onlineUsers', n.length);
        req.session = null;
        res.redirect('/');
    });
}

module.exports = {
    router, 
    logout
}