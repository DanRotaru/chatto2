const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const lotoUsers = new Schema({
    login: String,
    messages: Number,
    kry: {
        type: Number,
        default: 0
    },
    rank: String,
    type: Number
}, {versionKey: false});


const schema = new Schema({
    roomId: {
        type: Number,
        default: 0,
        required: true
    },
    bank: {
        type: Number,
        default: 0
    },
    number: {
        type: Number,
        default: 0
    },
    current_bank: {
        type: Number,
        default: 0
    },
    bank_green: {
        type: Number,
        default: 0
    },
    bank_red: {
        type: Number,
        default: 0
    },
    bank_blue: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    started: Boolean,
    end: {
        type: Number,
        default: 0
    },
    users: [lotoUsers]
}, {versionKey: false});

schema.plugin(AutoIncrement, {inc_field: 'roomId'});

module.exports = model('Lottery', schema);