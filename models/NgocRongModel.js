var mongoose = require('mongoose');

let ngocrongSchema = mongoose.Schema(
    {
        name:String,
        quantity:Number,
        price:Number,
        image:String,
        description:String,
    }
);

var NgocRongSchema = mongoose.model('ngocrongs', ngocrongSchema, 'ngocrongs');

module.exports = NgocRongSchema;
