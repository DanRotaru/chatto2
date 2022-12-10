const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true,
    },
    rub: {
        type: Number,
        default: 0
    },
    ip: {
        type: String,
        default: ''
    },
    method: {
        type: String,
        default: ''
    },
    uniq: {
        type: String,
        default: ''
    },
    num: {
        type: String,
        default: ''
    },
    success: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});

module.exports = model('Gifts', schema);