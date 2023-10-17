var mongoose = require('mongoose');

let productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        name: {
            type:String,
            required: true
        },
        price: {
            type : Number , 
            required : true,
            min : 1
            
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            min: 0
        }
    }
);

var ProductSchema = mongoose.model('products', productSchema, 'products');

module.exports = ProductSchema;
