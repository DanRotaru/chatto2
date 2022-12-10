const { find } = require('../helpers');


function filter(msg){
    msg = msg.replace(/<</g, '«');
    msg = msg.replace(/>>/g, '»');
    msg = msg.replace(/<--/g, '←');
    msg = msg.replace(/-->/g, '→');

    msg = msg.replace(/ᅠ/g, '');

    return msg;
}

module.exports = filter;