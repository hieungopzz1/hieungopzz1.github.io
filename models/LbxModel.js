var mongoose = require('mongoose');

let lbxSchema = mongoose.Schema(
    {
        titlle:String,
        name:String,
        quantity:Number,
        price:Number,
        image:String,
        description:String,
    }
);

var LbxSchema = mongoose.model('lbxs', lbxSchema, 'lbxs');

module.exports = LbxSchema;
