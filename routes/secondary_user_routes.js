const express = require('express');
const router = express.Router();
const Solution = require('../models/solution');
const { check } = require('express-validator/check');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'mongo-data/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".pdf");
    }
});
var upload = multer({storage: storage});

var fs = require('fs');
const path = require('path');
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

router.post('/upload', upload.single('file'), function(req, res){

    var errors = [];
    var dept, courseNumber, year, term, type, professor;

    if(!req.isAuthenticated()){
        const login_error =  { 
            msg: 'Please login before uploading your file.',
            value: '' };
        errors.push(login_error);

    } else{
        dept = req.body.dept;
        courseNumber = req.body.courseNumber;
        year = req.body.year == "Select" ? "" : req.body.year;
        term = req.body.term == "Select" ? "" : req.body.term;
        type = req.body.type == "Select" ? "" : req.body.type;
        professor = req.body.professor;
        // const uploadTime = new Date();

        // log(req.file);

        // Validate fields
        req.checkBody('dept', 'Department code is required.').not().equals("Select");
        req.checkBody('courseNumber', 'Course number is between 100-499.').isInt({ min: 100, max: 499 });

        errors = req.validationErrors();

        if(!req.file){
            const new_error =  {
                param: 'file',
                msg: 'Please upload the PDF file.',
                value: '' };
            errors.unshift(new_error);

        } else{
            const extension = (path.extname(req.file.originalname)).toLowerCase();
            if(extension !== '.pdf'){
                const extention_error =  { 
                    // location: 'file',
                    param: 'file',
                    msg: "PDF file is required. Must end with '.pdf'!",
                    value: '' };
                errors.unshift(extention_error);
            }
        }
    }


    if (errors) {
        res.render('upload', {
            title: 'Upload File',
            js: ['upload.js', 'navbarNeedLogin.js'],
            errors: errors,
        });
    }
    else {

        const file_data = fs.readFileSync('mongo-data/' + req.file.filename);
        const file_name = req.file.originalname;

    	const solution = new Solution({
    		// fileId: file,
    		dept: dept,
    		courseNumber: courseNumber,
    		year: year,
    		term: term,
            author: req.user.username,
            professor: professor,
            type: type
    	});

        solution.file.data = file_data;
        solution.file.name = file_name;
        solution.file.contentType = 'pdf';

    	// log(solution);

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