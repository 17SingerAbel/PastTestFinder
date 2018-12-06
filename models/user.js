const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    /********************************/
    faculty: String,
    year:  String,
    img: { data: Buffer, contentType: String },
    img_path: String,
    status:{
        //not used 
    	type:String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
