const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const SolutionSchema = new Schema({
    courseName: {
        type: String
    },
    year: {
        type: Number
    },
    term :{
    	type: String

    },
    type :{
    	type: String

    },
    professor :{
    	type: String

    },
    author :{
    	type: String

    },
    fileId :{
    	type: String

    }
});

SolutionSchema.plugin(passportLocalMongoose);

const Solution = mongoose.model("Solution", SolutionSchema);

module.exports = { Solution };

