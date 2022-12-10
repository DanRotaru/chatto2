const Users = require('../models/Users');
const Message = require('../models/Chat');

const { addMessage } = require('./addMessage');


var lastId = 0;
async function getNewMessages(){
    const messages = await Message.find({ _id: { $gt: lastId} }, null, {sort: {'_id': -1}}).limit(50);
    if(messages.length) lastId = messages[0]._id;
    return messages;
}

async function userExists(id) {
    // id = '62142b5539b2c85897d4a2db';
    id = id.toString();
    if(id.length < 24 || id.length > 24) return false;
    let res = await Users.findById({ _id: id }, {_id: 1}).limit(1);
    return res?.id;
}
async function getchat(socket, io, auth){
    // let token = socket.handshake.auth?.token;
    let ip = socket?.handshake?.address;

    if(!auth) auth = socket.handshake.auth?.token;

    if(!auth){
        console.log('u');
        socket.disconnect();
        return false;
    }
    let userId = await userExists(auth);
    if(!userId){
        console.log('ff');
        socket.disconnect();
        return false;
    }

    lastId = 0;

    // get all messages from chat
    let messages = await getNewMessages();
    socket.emit('ChatMsg', messages);

    socket.on('ChatMsg', async(msg) => {
        let add = await addMessage(socket, msg, userId, ip, io);
        if(add){
            // send to other users my message
            let messages2 = await getNewMessages();
            io.emit('ChatMsg', messages2);
        }
    });
}

module.exports.getchat = getchat