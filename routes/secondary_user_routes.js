const express = require('express');
const router = express.Router();

const Comments = require('../models/comments');
const { check } = require('express-validator/check');

const log = console.log;

// user route
router.get('/', function(req, res){
    res.send('<h1>You are in user route.</h1>');
});

router.get('/pt-comments', function(req,res){

    Comments.find().then((comments) => {
        res.render('pt-comments', {
            title: 'Solution and Comments',
            css: ['pt_comments.css'],
            js: ['pt_comments.js', 'navbarNeedLogin.js'],
            comments: comments
        });
    }, (error) => {
        res.status(400).send(error);
    })

	
})

router.post('/pt-comments', function(req,res){

	var username, context;
	var errors = [];

	if(!req.isAuthenticated()){
        const login_error =  { 
            msg: 'Please login before leaving your comments.',
            value: '' };
        errors.push(login_error);

    } else{
    	username = req.user.username;
    	context = req.body.context;

        // Validate fields
        req.checkBody('context', 'Context of comments is required.').notEmpty();

        errors = req.validationErrors();

    }

    if (errors) {

        Comments.find().then((comments) => {
            res.render('pt-comments', {
                title: 'Solution and Comments',
                css: ['pt_comments.css'],
                js: ['pt_comments.js', 'navbarNeedLogin.js'],
                comments: comments,
                errors: errors
            });
        }, (error) => {
            res.status(400).send(error);
        })

    } else{

    	const new_comments = new Comments({
	    	username: username,
	    	context: context
	    });

        new_comments.save().then((result) => {
            // Save and send object that was saved
            req.flash('success_msg', 'You have successfully left your comments.');
            res.redirect('/user/pt-comments');

        }, (error) => {
            res.status(400).send(error); // 400 for bad request
        })
    }

	

    


})

module.exports = router;


// todo list:
// 1. add username other than email, display in the profile and comments area