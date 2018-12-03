const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const { check } = require('express-validator/check');

const log = console.log;

// user route
router.get('/', function(req, res){
    res.send('<h1>You are in user route.</h1>');
});

router.get('/pt-comments', function(req,res){
	res.render('pt-comments', {
        title: 'Solution and Comments',
        css: ['pt_comments.css'],
        js: ['pt_comments.js', 'navbarNeedLogin.js']
    });
})

router.post('/pt-comments', function(req,res){

	var username, context;
	var errors = [];
	log(req.user)

	log(req.body)

	if(!req.isAuthenticated()){
        const login_error =  { 
            msg: 'Please login before leaving a comment.',
            value: '' };
        errors.push(login_error);

    } else{
    	username = req.user.username;
    	context = req.body.context;
    	log("auth true")

        // Validate fields
        req.checkBody('context', 'Context of comment is required.').notEmpty();

        errors = req.validationErrors();

    }

    if (errors) {
        // res.render('upload', {
        //     title: 'Upload File',
        //     js: ['upload.js', 'navbarNeedLogin.js'],
        //     errors: errors,
        // });
        log("there are errors")
        res.send(errors)
    } else{

    	const new_comment = new Comment({
	    	username: username,
	    	context: context
	    });

	    res.send(new_comment);
    }

	

    


})

module.exports = router;


// todo list:
// 1. add username other than email, display in the profile and comments area