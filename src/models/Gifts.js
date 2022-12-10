const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
    giftId: {
        type: Number,
        default: 0
    },
    login: {
        type: String,
        required: true,
    },
    tologin: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    ip: {
        type: String,
        default: '',
    },
    type: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});

schema.plugin(AutoIncrement, {inc_field: 'giftId'});
module.exports = model('Gifts', schema);