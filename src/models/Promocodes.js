const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
    promoId: {
        type: Number,
        default: 0
    },
    serial: String,
    cvv: String,
    by: {
        type: String,
        required: true,
    },
    used: {
        type: Number,
        maxlength: 1
    },
    prize: {
        type: Array,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    expire: {
        type: Date,
        default: Date.now()
    },
    activated: String,
    hash: String
}, {versionKey: false});


schema.plugin(AutoIncrement, {inc_field: 'promoId'});
module.exports = model('Promocodes', schema);