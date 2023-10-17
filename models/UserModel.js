var mongoose = require('mongoose');

let userSchema = mongoose.Schema(
    {
        username : String,
        password : String,
        cbpassword : String,
    }
);

var UserSchema = mongoose.model('users',userSchema,'users');

module.exports = UserSchema;
