// const {db_connection} = require('./src/db/connection.js')

const Users = require('../models/Users');
const Message = require('../models/Chat');
const Config = require('../models/Config');
const Session = require('../models/Session');
const getRank = require('../data/Ranks')


async function select(table, columns, where){
    
}


/**
 * @param {string} login User login
 * @param {object|number} projection Projection (what to select), default value is all
 * @param {number} byId Specify to select by document id or by login, default by login
 */
async function getUserInfo(login, projection, byId){
    let user, findProjection;
    if(projection == 1) findProjection = {login: 1}
    else if(projection == 2) findProjection = {login: 1, group: 1, vip: 1, chatban: 1}
    else if(projection == 3) findProjection = {id: 1, login: 1, group: 1, helper: 1, messages: 1, score: 1, kry: 1, coin: 1, vip: 1, chatban: 1, chatbandate: 1, chatbanreason: 1, flood: 1, last_message: 1, last_message1: 1, howmuch: 1, ccoins: 1}
    else if(projection == 4) findProjection = {};
    else findProjection = projection;
    
    if(byId) user = await Users.findById({_id: login}, findProjection).limit(1);
    else user = await Users.findOne({login: { $regex: new RegExp("^" + login.toLowerCase(), "i") }}, findProjection);
    return user;
}

/**
 * @param {string} id User id
 * @param {number} bylogin Check by login (default by id)
 */
async function userExists(id, bylogin) {
    id = id.toString();
    let res;
    if(bylogin) res = await Users.findOne({ login: id }, {login: 1});
    else{
        if(id.length < 24 || id.length > 24) return false;
        res = await Users.findById({ _id: id }, {login: 1}).limit(1);
    }
    if(!res) return false;
    return res.login;
}

/**
 * @param {string} login User login
 * @param {string} socket Socket instance
*/
async function getAccount(login, socket){
    let info = await getUserInfo(login, {login: 1, score: 1, vip: 1, rank: 1, messages: 1, coin: 1, kry: 1, group: 1, howmuch: 1});
    let userRank = getRank(info.score, 4, info.vip);
    let account = JSON.parse(JSON.stringify(info._doc));
    delete account['_id'];
    delete account['vip'];

    account['rank'] = userRank.idV;
    account['rank_name'] = userRank.name;
    account['rank_text'] = userRank.score + ' / ' + userRank.needle;
    account['rank_progress'] = userRank.progress;

    socket.emit('account', account);
}

/**
 * @param {string} msg Msg to send
 * @param {string} io IO instance
*/
const sys = async (msg, io) => {
    let savetodb = new Message({
        login: 'sys',
        group: 9,
        text: msg
    });
    savetodb = await savetodb.save();

    let res = {
        _id: savetodb._id,
        text: savetodb.text,
        login: savetodb.login,
        group: 9
    }
    
    io.emit('ChatMsg', [res]);
    return;
}

/**
 * Мульти-обновление прогресса в заданиях
 * @param {object} additions Объект вида `{ type: value, ...typeN: valueN }`
 * @param {string} login Логин пользователя
 */
 async function addProgressInTask(additions, login) {
    const user = await getUserInfo(login, { tasks: 1 });

    if (additions.length === 0 || typeof user.tasks === 'undefined' || user.tasks.length === 0) return;

    additions = Object.entries(additions);
    for (const task of user.tasks) {
        for (const [type, value] of additions) {
            if (task.taskType === +type && (new Date(task.taskTimer)).getTime() <= Date.now()) {
                task.taskCurrent += value;
            }
        }
    }

    await user.save();
}

module.exports = {
    getUserInfo,
    userExists,
    getAccount,
    sys,
    addProgressInTask
}