const Users = require('../models/Users');
const Session = require('../models/Session');
const Message = require('../models/Chat');

const getRank = require('../data/Ranks')

const getchat = require('../chat/getchat')
const addMessage = require('../chat/addMessage');
const { getUserInfo, userExists, getAccount } = require('../db/index')

const {addLottery, getLottery} = require('../lottery/lottery')

var lastId = 0, lotoId = 0;

(async () => {
    await Session.deleteMany({date: {$lt: Date.now() - 120000}});
})();

const socketInstance = async (socket, io, auth) => {
    var preventMultiMessage = 0; lastId = 0;
    let ip = socket.handshake.address;
    // let sockets = io.clients();
    // const ids = await io.allSockets();
    // console.log(ids);
    
    auth = socket.handshake.auth?.token;
    if(!auth){
        console.log('a0');
        socket.disconnect();
        return false;
    }
    
    let login = await userExists(auth);
    // console.log('>', login);
    if(!login){
        console.log('a1');
        socket.disconnect();
        return false;
    }

    let userInfo = await getUserInfo(login, {login: 1, group: 1});
    socket.user = {login: userInfo.login, group: userInfo.group};
    // getchat
    let res = await getchat(lastId, userInfo.login, userInfo.group);
    socket.emit('ChatMsg', res.messages);
    lastId = res.lastId;

    // Possibility to use socket.on('*') all sockets messages
    var onevent = socket.onevent;
    socket.onevent = function (packet) {
        var args = packet.data || [];
        onevent.call (this, packet);
        packet.data = ["*"].concat(args);
        onevent.call(this, packet);
    };


    preventMultiMessage = 0;
    socket.on('*', () => {
        preventMultiMessage = Date.now() + 200;
    });

    
    // chat
    socket.on('ChatMsg', async (message) => {
        if(preventMultiMessage > Date.now()) return false;

        // post message
        let add = await addMessage(socket, message, login, ip, io);
        if (add) {
            let res = await getchat(lastId, add.mylogin, add.mygroup);
            if(add.pm == 1){
                const sockets = io.of('/').sockets;
                for (let i of sockets) {
                    if (i[1].user.login === add.mylogin || i[1].user.login === add.writeToLogin || i[1].user.group > 1) {
                        i[1].emit('ChatMsg', res.messages)
                    }
                }
            }
            else io.emit('ChatMsg', res.messages);
            lastId = res.lastId;
        }
    });

    socket.on('ChatMsgDel', async (id) => {
        if(preventMultiMessage > Date.now()) return false;

        if(id.length < 1) return false;
        let info = await getUserInfo(login, 2);
        if(info.group > 1){
            await Message.deleteOne({_id: id});
            io.emit('ChatMsgDel', {login: false, id: id});
        }
    });


    socket.on('getAccount', async () => {
        if(preventMultiMessage > Date.now()) return false;
        getAccount(login, socket);
    });

    socket.on('lottery', async (message) => {
        if(preventMultiMessage > Date.now()) return false;

        //add loto
        await addLottery(socket, message, login, ip, io);
    });

    socket.on('getLottery', async (message) => {
        if(preventMultiMessage > Date.now()) return false;

        await getLottery(socket, message, login);
    });
    
    
    Session.findOne({id_session: auth}, {date: 1}).then(async (res) => {
        if(!res){
            let session = new Session({
                login: login,
                id_session: auth,
                id_socket: socket.id
            })
            await session.save();
        
            // console.log('new')
            let n = await Session.distinct('id_session');
            io.emit('onlineUsers', n.length);
        }
        else{
            res.id_socket = socket.id;
            res.date = new Date().toISOString();
            await res.save();
            // if(res.date < Date.now()){
            //     res.date = new Date().toISOString();
            //     await res.save();
            // }
        }
    });

    // Обновление сессии каждую минуту
    setInterval(async () => {
        let mySession = await Session.findOne({id_session: auth}, {date: 1});
        if(mySession){
            mySession.date = new Date().toISOString();
            await mySession.save();
        }
    }, 60000);

    // Удаление сессий > 2 мин
    // setInterval(async () => {
    //     await Session.deleteMany({date: {$lt: Date.now() - 12000}});
    //     let n = await Session.distinct('id_session');
    //     io.emit('onlineUsers', n.length);
    // }, 12000);

    // socket.on('newUser', async function(){
    //     if(preventMultiMessage > Date.now()) return false;
    // });
    
    socket.on("disconnect", async () => {
        // await Session.deleteMany({date: {$lt: Date.now() - 3600000}}); // 60 min
        await Session.deleteOne({id_socket: socket.id});
        let n = await Session.distinct('id_session');
        io.emit('onlineUsers', n.length);
    });
}

module.exports = socketInstance