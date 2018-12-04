const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    dept: {
        type: String
    },
    courseNumber:{
        type: Number
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
    // fileId :{
    // 	type: String
    // }
    file:
        {data: Buffer, name: String, contentType: String}
});

module.exports = mongoose.model("Solution", SolutionSchema);

