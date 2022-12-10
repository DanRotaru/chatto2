const { Schema, model } = require('mongoose')

const schema = new Schema({
    login1: {
        type: String,
        required: true,
    },
    login2: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});

module.exports = model('Friends', schema);