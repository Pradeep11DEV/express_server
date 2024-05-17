const mongoose = require('mongoose');

const Schema = mongoose.Schema

const loggerSchema = new Schema({
    uName : String,
    uEmail : String,
    uPass : String,
    uPhone : Number,
    uAPhone: Number
    
})

module.exports = mongoose.model('loggers',loggerSchema,'loggers_db');