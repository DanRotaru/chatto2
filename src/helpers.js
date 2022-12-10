const htmlspecialchars = require('htmlspecialchars');
const getRank = require('../src/data/Ranks')

const die = (data, res) => {
    if(data == 1 || data == undefined) data = JSON.stringify({"success": true});
    else data = JSON.stringify({"error": data});
    res.end(data);
}

function dieS(title, data, socket, info){
    // JSON.stringify({"success": true})
    if(data == 1 || data == undefined) data = {"success": true}
    else if(info) data = data;
    else data = {"error": data};
    socket.emit(title, data);
}

function find(needle, text){
    needle = needle.toString().toLowerCase();
    if(typeof text == 'object'){
        let found = false;
        for(let i of text) if(i.indexOf(needle) !== -1) found = true;
        return found;
    }
    else{
        if(text.indexOf(needle) == -1) return false;
        else return true;
    }
}

function getNumEnding(number, endingArray) {
    let ending;
    number = number % 100;
    if (number >= 11 && number <= 19) ending = endingArray[2];
    else{
        i = number % 10;
        if(i == 1) ending = endingArray[0];
        else if (i == 4) ending = endingArray[1];
        else ending = endingArray[2];
    }
    return ending;
}

function remaining(timer) {
    let res = '';
    let day, dayt, hr, hrt, min, mint, sec, sect;
    
    timer = Math.floor(timer / 1000);

    day = Math.floor(timer / 86400);
    dayt = getNumEnding(day, ['день', 'дня', 'дней']);

    hr = Math.floor((timer % 86400) / 3600);
    hrt = getNumEnding(hr, ['час', 'часа', 'часов']);

    min = Math.floor((timer % 3600) / 60);
    mint = getNumEnding(min, ['минута', 'минуты', 'минут']);

    sec = (timer % 60);
    sect = getNumEnding(sec, ['секунды', 'секунд', 'секунд']);

    if (day) res = `${day} ${dayt}`;
    if (hr) res += ` ${hr} ${hrt}`;
    if (min) res += ` ${min} ${mint}`;
    if (sec) res += ` ${sec} ${sect}`;

    return res;
}

function number_format(e, n, t, i) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var r, a, o, d = isFinite(+e) ? +e : 0,
        h = isFinite(+n) ? Math.abs(n) : 0,
        l = void 0 === i ? " " : i,
        g = void 0 === t ? " " : t,
        u = "";
    return 3 < (u = (h ? (r = d, a = h, o = Math.pow(10, a), "" + (Math.round(r * o) / o).toFixed(a)) : "" + Math.round(d)).split("."))[0].length && (u[0] = u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)), (u[1] || "").length < h && (u[1] = u[1] || "", u[1] += new Array(h - u[1].length + 1).join("0")), u.join(g)
}

function ModernUser(login, score, vip){
    let rank = getRank(score, 5, vip);
    return `{:c-u${rank}=${login}:}`;
}

function endsWith(text, needle){
    text = text.toString(), needle = needle.toString();
    return needle == text.slice(-needle.length) ? true : false;
}

/**
 * Returns unix time in sec
 */
function time(){
    return Math.floor(Date.now() / 1000);
}

function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get date from unix timestamp
*/
function toDate(unix, res){
    let date = new Date(unix);
    let y = date.getFullYear();
    let month = date.getMonth() + 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    
    if(res == 1) return `${day}.${month}.${y}`;
    else if(res == 2) return `${day}.${month}.${y} ${h}:${m}:${s}`;
    else return `${day}.${month}.${y} ${h}:${m}`;
}



module.exports = {
    htmlspecialchars,
    die,
    dieS,
    find,
    getNumEnding,
    remaining,
    number_format,
    ModernUser,
    time,
    endsWith,
    rand,
    toDate
}