const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true
    },
    kry: {
        type: Number,
        default: 0
    },
    type: {
        type: Number,
        default: 0
    },
    room: {
        type: Number,
        default: 1
    }
}, {versionKey: false});

module.exports = model('Loto', schema);