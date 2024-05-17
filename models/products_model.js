const mong = require('mongoose');

const Schema = mong.Schema

const productsSchema = new Schema({
    pName   : String,
    pDesc   : String,
    pPrice  : Number,
    fPath   : String,
    add_by  : Number
    
});

module.exports = mong.model('products_list',productsSchema,'products_db');