const { Schema, model } = require('mongoose')

const schema = new Schema({
    clanId: {
        type: Number,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    in_clan: {
        type: Number,
        default: 0
    },
    earned: {
        type: Number,
        default: 0
    },
    group: Number,
    date: {
        type: Date,
        default: Date.now()
    }
}, {versionKey: false});

module.exports = model('Clans_users', schema);

/* Clan groups
    "Рядовой", 0 || undefined
    "Офицер", 1
    "Сержант", 2
    "Ветеран", 3
    "Командир", 4
    "Главнокомандующий" 5
*/