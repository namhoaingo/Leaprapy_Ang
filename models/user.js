var mongoose = require('mongoose') ,
    passportLocalMongoose = require('passport-local-mongoose');

// Need to specify thing before you can save it, because of authentication
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    emailAddress:String,
    birthday: Date,
    gender : Number,
    id: String
});

userSchema.plugin(passportLocalMongoose); 

var User = mongoose.model('User', userSchema)

module.exports = User;

