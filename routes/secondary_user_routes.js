const express = require('express');
const router = express.Router();
const Solution = require('../models/solution');

const log = console.log;

// user route
router.get('/', function(req, res){
    // res.send('<h1>You are in user route.</h1>');
    res.redirect('/');
});

router.get('/upload', function (req, res) {
    res.render('upload', {
        title: 'Upload File',
        js: ['upload.js', 'navbarNeedLogin.js'],
    });
});

router.post('/upload', function(req, res){

	const file = req.body.file;
    // const dept = req.body.dept == "Select" ? "" : req.body.dept;
    const dept = req.body.dept;
    const courseNumber = req.body.courseNumber;
    const year = req.body.year == "Select" ? "" : req.body.year;
    const term = req.body.term == "Select" ? "" : req.body.term;

    // const uploadTime = new Date();

    // Validate fields
    req.checkBody('file', 'File is required').notEmpty();
    req.checkBody('dept', 'Department code is required').not().equals("Select");
    req.checkBody('courseNumber', 'Course number is between 100-499.').isInt({ min: 100, max: 499 });

    const errors = req.validationErrors();

    if (errors) {
        res.render('upload', {
            title: 'Upload File',
            js: ['upload.js', 'navbarNeedLogin.js'],
            errors: errors,
        });
    }
    else {

    	const solution = new Solution({
    		fileId: file,
    		dept: dept,
    		courseNumber: courseNumber,
    		year: year,
    		term: term
    	});

    	log(solution);

    	solution.save().then((result) => {
			// Save and send object that was saved
			req.flash('success_msg', 'You have successfully uploaded the file.');
			// res.send(result);
			res.redirect('/user/upload');
		}, (error) => {
			res.status(400).send(error); // 400 for bad request
		})
    }
});

module.exports = router;