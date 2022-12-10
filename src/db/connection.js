const mongoose = require('mongoose')
require('dotenv').config()

var mongoURL = process.env.MONGO_URI_local
if(process.env.heroku) mongoURL = process.env.MONGO_URI

async function db_connection(cb) {
    mongoose.connect(mongoURL, function(err) {
        if (err) {
            console.log("Database Error:", err.message);
            return;
        }

        if(cb) cb();
    });
}
module.exports = db_connection