const Users = require('../models/Users');
const Message = require('../models/Chat');
const Garages = require('../models/Garages');
const getRank = require('../data/Ranks')
const { sys, addProgressInTask } = require('../db/index');
const { rand, number_format } = require('../helpers');


async function gold(type, login, io){
    let getLastMsg = await Message.findOne( {login: { $ne: 'sys' }, pm: 1 }, {login: 1}, {sort: {'_id': -1}});
    let ulogin = getLastMsg?.login || login;
    let user = await Users.findOne({login: ulogin}, {kry: 1, vip: 1, score: 1, golds: 1});
    let userRank = getRank(user.score, 5, user.vip);
    let prize = 0, prize_text = '';
    if(type == 1){
        prize = 1000;
        prize_text = number_format(prize);
        setTimeout(() => {
            sys(`{:chatto-gold=${userRank}=${ulogin}=${prize_text}:}`, io);
        }, 100);
    }
    // Ультра голд
    else{
        prize = rand(5000, 15000);
        prize_text = number_format(prize);
        setTimeout(() => {
            sys(`{:chatto-ugold=${userRank}=${ulogin}=${prize_text}:}`, io);
        }, 100);
    }
    user.kry = user.kry + prize;
    user.golds = user.golds || 0;
    user.golds += 1;
    await user.save();
    await addProgressInTask({3: 1}, ulogin);
}


module.exports = {
    gold
}