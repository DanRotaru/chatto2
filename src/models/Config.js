const { Schema, model } = require('mongoose')

const schema = new Schema({
    enabled: {
        type: Number,
        default: 1
    },
    messages: {
        type: Number,
        default: 0,
    },
    fond: {
        type: Number,
        default: 0
    },
    bot: {
        type: Number,
        default: 0
    },
    turrets_sale: {
        type: Number,
        default: 0
    },
    hulls_sale: {
        type: Number,
        default: 0
    },
    paints_sale: {
        type: Number,
        default: 0
    },
    cgolds: {
        type: Number,
        default: 0
    },
    challenge: {
        type: Number,
        default: 0
    },
    challenge_run: {
        type: Number,
        default: 0
    },
    weekly_tournament: {
        type: Number,
        default: 0
    },
    reload: {
        type: Number,
        default: 0
    },
    created: {
        type: Number,
        default: 1
    }
}, {versionKey: false});

module.exports = model('Config', schema);