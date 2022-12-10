const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true,
    },
    tologin: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});

module.exports = model('Friends_req', schema);