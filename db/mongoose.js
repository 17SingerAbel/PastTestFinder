const mongoose = require('mongoose');

// Connect to our remote database hosted on aws ec2 central Canada
mongoose.connect('mongodb://localhost:27017/solutionAPI', { useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

module.exports = { mongoose };