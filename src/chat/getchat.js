const Message = require('../models/Chat');
const Clans = require('../models/Clans');
const Clans_users = require('../models/Clans_users');

async function getUserClan(login){
    let find = await Clans_users.findOne({login: login, in_clan: 1}, {teg: 1, clanId: 1});

}

async function getchat(lastId, login, mygroup){
    let msg = await Message.find({_id: {$gt: lastId}}, null, {sort: {'_id': -1}}).limit(50);
    msg = JSON.parse(JSON.stringify(msg));
    
    if(msg.length) lastId = msg[0]._id;
    for (let i in msg) {
        let userClan = await Clans_users.findOne({login: msg[i].login, in_clan: 1}, {clanId: 1});
        if(userClan) {
            let clan = await Clans.findOne({clanId: userClan.clanId}, {teg: 1});
            msg[i].clan = userClan.clanId + "|" + clan.teg;
        }
        
    }
    let msgs = [];
    if(mygroup > 1) msgs = msg;
    else{
        for (let i of msg) {
            delete i.ip;
            if(i.pm == 1){
                if(i.login === login || i.tologin === login){
                    msgs.push(i);
                }
            }
            else msgs.push(i);
        }
    }
    return {
        messages: msgs,
        lastId: lastId
    }
}

module.exports = getchat