const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const settings = new Schema({
    showmenu: {
        type: Number,
        maxlength: 2,
        default: 1
    },
    showviewer: {
        type: Number,
        maxlength: 1,
        default: 1
    },
    smilesclose: {
        type: Number,
        maxlength: 1,
        default: 0
    },
    uppercase: {
        type: Number,
        maxlength: 1,
        default: 0
    },
    ambientSound: {
        type: Number,
        maxlength: 1,
        default: 0
    },
    goldSound: {
        type: Number,
        maxlength: 1,
        default: 0
    },
    caseSound: {
        type: Number,
        maxlength: 1,
        default: 1
    },
    theme: {
        type: Number,
        maxlength: 3,
        default: 0
    }
});

const task = new Schema({
    taskId: Number,
    taskCurrent: Number,
    taskType: Number,
    taskTimer: Date
});

const schema = new Schema({
    userId: {
        type: Number,
        default: 0
    },
    login: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    messages: {
        type: Number,
        required: true,
        default: 0
    },
    group: {
        type: Number,
        default: 1
    },
    helper: Number,
    score: {
        type: Number,
        default: 0,
    },
    rank: String,
    kry: {
        type: Number,
        default: 0
    },
    coin: {
        type: Number,
        default: 0
    },
    ccoins: {
        type: Number,
        default: 0
    },
    vip: Number,
    howmuch:  {
        type: String,
        default: '0|0|0|0'
    },
    kick: Number,
    golds: Number,
    reg_ip: {
        type: String,
        default: ''
    },
    last_ip: {
        type: String,
        default: ''
    },
    reg_date: {
        type: Date,
        default: Date.now()
    },
    auth_date: {
        type: Date,
        default: Date.now()
    },
    chatban: Number,
    chatbandate: Date,
    chatbanreason: String,
    chatbanby: String,
    ban: Number,
    banreason: String,
    banby: String,
    bandate: Date,
    bandate1: Date,
    flood: Number,
    daily_bonus: Number,
    last_message: String,
    last_message1: String,
    lotos: Number,
    lotoWins: Number,
    kcard: Number,
    promocard: Number,
    premium_promocard: Number,
    cldonat: Number,
    settings: {
        type: settings,
        default: () => ({})
    },
    tasks: [task, task, task],
    vk: String
}, {versionKey: false});

schema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports = model('Users', schema)
