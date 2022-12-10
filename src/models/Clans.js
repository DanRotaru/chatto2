const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
    clanId: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true,
    },
    by: {
        type: String,
        required: true,
    },
    teg: {
        type: String,
        required: true,
    },
    description: String,
    logo: String,
    kry: {
        type: Number,
        default: 0
    },
    maxUsers: {
        type: Number,
        default: 10
    },
    users: {
        type: Number,
        default: 1
    },
    violations: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});


schema.plugin(AutoIncrement, {inc_field: 'clanId'});
module.exports = model('Clans', schema);