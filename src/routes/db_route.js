const { Router } = require('express')
const router = Router()

const { die } = require('../helpers');
const Users = require('../models/Users');
const Message = require('../models/Chat');
const Garage = require('../models/Garages');

router.get('/db/get/:table', async function (req, res) {
    let table = req.params.table;

    if(table == 'users'){
        const users = await Users.find({})
        console.log(users);
        res.end(users.toString())
    }
    else if(table == 'chat'){
        const msgs = await Message.find({})
        console.log(msgs);
        res.end(msgs.toString())
    }
    
});
router.get('/truncate/:type', async function (req, res) {
    let type = req.params.type;

    if(type == 'users') await Users.deleteMany({});
    else if(type == 'chat') await Message.deleteMany({});
    else if(type == 'all'){
        await Users.deleteMany({});
        await Message.deleteMany({});
    }
    else{
        type = 'none';
    }
    res.end("Success: " + type);
});

router.get('/chat/:id', async function(req, res){
    const messages = await Message.find({ _id: { $gt: req.params.id} }, null, {sort: {'_id': -1}}).limit(50);
    console.log(messages);
    res.end(JSON.stringify(messages));
});
router.get('/garage/:id', async function(req, res){
    const garage = await Garage.findOne({login: "DanRotaru"}, {login: 1, wasps: 1});
    console.log(garage.wasps);
    console.log(garage);
    res.end(JSON.stringify(garage));
});

module.exports = router