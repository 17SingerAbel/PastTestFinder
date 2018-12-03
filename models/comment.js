const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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


module.exports = mongoose.model("Comment", CommentSchema);