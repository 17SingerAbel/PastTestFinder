const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD


=======
>>>>>>> master
const CommentsSchema = new Schema({
    username: {
        type: String
    },
    context:{
        type: String
    }
    // time: {
    //     type: Number
    // }
});
<<<<<<< HEAD

// module.exports = mongoose.model("Comments", CommentsSchema);

=======
>>>>>>> master
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
<<<<<<< HEAD
    // fileId :{
    // 	type: String 
=======
>>>>>>> master
    // }
    file: 
      { data: Buffer, name: String, contentType: String },

    comments: [CommentsSchema]
});


module.exports = mongoose.model("Solution", SolutionSchema);
<<<<<<< HEAD
=======

>>>>>>> master
