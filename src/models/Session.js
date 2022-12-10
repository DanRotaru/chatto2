const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: {
        type: String,
        required: true
    },
    id_session: {
        type: String,
        default: ''
    },
    id_socket: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    }
    
}, {versionKey: false});

module.exports = model('Session', schema);