const { dieS, number_format, rand } = require('../helpers');
const Users = require('../models/Users');
const Message = require('../models/Chat');
const Lottery = require('../models/Lottery');
const { getUserInfo, getAccount, sys } = require('../db/index');
const getRank = require('../data/Ranks');



async function getLottery(socket, id, login){
    const ask = (msg, info) => dieS('lottery', msg, socket, info);

    let rooms = [1, 2, 3];
    let typeName = ['Зелёный', 'Красный', 'Синий'];
    if(!rooms.includes(Number(id))){
        ask("Введенная вами комната не найдена!");
        return;
    }
    let info = await getUserInfo(login, {login: 1, messages: 1, score: 1, vip: 1, kry: 1, lotos: 1});
    if(!info) return;
    login = info.login;

    let room = await Lottery.findOne({roomId: id});
    if(!room) {
        ask("Введенная вами комната не найдена!");
        return;
    }

    //Если вдруг приложение упадёт то обнулить ставки
    if(room.started && (room.end < Date.now()) && room.users.length > 0){
        room.started = false;
        room.current_bank = 0;
        room.bank_green = 0;
        room.bank_red = 0;
        room.bank_blue = 0;
        room.current_bank = 0;
        room.end = 0;
        room.users = [];
        await room.save();
    }

    room = JSON.parse(JSON.stringify(room));
    delete room['_id'];
    room.started = room.started ? 1 : 0;

    for (let i in room.users) delete room.users[i]['_id'];
    socket.emit('lottery', room);

}
async function addLottery(socket, msg, login, ip, io){
    const ask = (msg, info) => dieS('lottery', msg, socket, info);

    let rooms = [1, 2, 3];
    let typeName = ['Зелёный', 'Красный', 'Синий'];
    if(!rooms.includes(msg.room) || !rooms.includes(msg.type)){
        ask("Введенная вами комната не найдена!");
        return;
    }
    
    let info = await getUserInfo(login, {login: 1, messages: 1, score: 1, vip: 1, kry: 1, lotos: 1});
    if(!info) return;
    login = info.login;

    let room = await Lottery.findOne({roomId: msg.room});
    if(!room) {
        ask("Введенная вами комната не найдена!");
        return;
    }

    if(info.kry < msg.kry){
        ask("Недостаточно кристаллов!");
        return;
    }

    if(msg.kry < room.min){
        ask(`Минимальная ставка составляет ${room.min} кристаллов!`);
        return;
    }
    
    if(room.started){
        if(room.end - Date.now() < 5000){
            ask(`Поздно! Ставку уже нельзя ставить!`);
            return;
        }
    }

    for (const u of room.users) {
        if(u.login == login && u.type !== msg.type){
            ask(`Вы можете поставить только на один цвет (${typeName[u.type - 1]})`);
            return;
        }
    }

    let bankType, roomText;
    if(msg.type == 1) bankType = 'bank_green';
    else if(msg.type == 2) bankType = 'bank_red';
    else if(msg.type == 3) bankType = 'bank_blue';
    roomText = msg.room  + '-' + typeName[msg.type - 1];

    let user_rank = getRank(info.score, 5, info.vip);
    info.kry -= msg.kry;
    info.lotos = (info.lotos || 0) + 1;
    await info.save();

    room[bankType] += msg.kry;
    room.current_bank += msg.kry;
    room.bank += msg.kry;
    room.number += 1;

    let findU = false;
    for (let u in room.users) {
        if(room.users[u].login == login){
            room.users[u].kry += msg.kry;
            findU = true;
            break;
        }
    }

    if(!findU){
        room.users.push({
            login: login,
            messages: info.messages,
            rank: user_rank,
            kry: msg.kry,
            type: msg.type
        });
    }

    if(room.users.length > 1){
        if(!room.started){
            room.started = true;
            room.end = Date.now() + 20000;
            io.emit('lotteryStarted', new Date(room.end).toISOString());
            let end = 20 * 1000;
            // end = 10 * 1000;
            let room_type = rand(1, 3);
            setTimeout(() => io.emit('lotteryWheel', room_type), end - 2000);
            setTimeout(async () => {
                room = await Lottery.findOne({roomId: msg.room});
                let winners = [];
                let winnersText = '';
                for (let u in room.users) {
                    if(room.users[u].type == room_type){
                        winners.push(room.users[u]);
                    }
                }
                let prize = Math.floor(room.current_bank / winners.length);
                if(!winners.length){
                    sys(`{:cLotoE=${rand(1, 10)}=${typeName[room_type - 1]}:}`, io);
                }
                else{
                    for (const w of winners) {
                        let user = await Users.findOne({login: w.login}, {kry: 1});
                        if(user){
                            winnersText += `{:c-u${w.rank}=${w.login}:}`;
                            user.kry += prize;
                            await user.save();
                        }
                    }
                    if(winners.length == 1) sys(`{:cLotoE1=${rand(1, 10)}=${typeName[room_type - 1]}=${winners.length}=${number_format(prize)}=${winnersText}:}`, io);
                    else sys(`{:cLotoE=${rand(1, 10)}=${typeName[room_type - 1]}=${winners.length}=${number_format(prize)}=${winnersText}:}`, io);
                }
                
                
                room.started = false;
                room.current_bank = 0;
                room.bank_green = 0;
                room.bank_red = 0;
                room.bank_blue = 0;
                room.current_bank = 0;
                room.end = 0;
                room.users = [];
                await room.save();
                io.emit('lotteryEnd', room.roomId);
            }, end);
        }
    }

    await room.save();
    let room1 = JSON.parse(JSON.stringify(room));

    delete room1['_id'];
    for (let i in room.users) delete room1.users[i]['_id'];
    room1.started = room1.started ? 1 : 0;
    room1.end = new Date(room1.end).toISOString();

    sys(`{:cLoto=${user_rank}=${login}=${number_format(msg.kry)}=${roomText}:}`, io);
    getAccount(info.login, socket);
    ask(1);
    io.emit('lottery', room1);
}

module.exports = {
    getLottery,
    addLottery
}