const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = module.exports = mongoose.model("User", UserSchema);

