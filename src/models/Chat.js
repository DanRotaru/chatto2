const { Schema, model, mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new Schema({
    _id: {
        type: Number,
        default: 0
    },
    login: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tologin: String,
    group: {
        type: Number,
        default: 0
    },
    ip: {
        type: String,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now()
    },
    pm: Number,
    clan: String,
    user_rank: {
        type: String,
        default: '1'
    },
    user_msg: {
        type: Number,
        default: 0
    },
    user1_rank: String,
    f: Number
}, {
    versionKey: false,
    _id: false
})

schema.plugin(AutoIncrement, {inc_field: '_id'});
module.exports = model('Chat', schema);
