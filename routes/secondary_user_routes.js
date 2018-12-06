const express = require('express');
const router = express.Router();

const Comments = require('../models/comments');
const Solution = require('../models/solution');

const { check } = require('express-validator/check');
const { ObjectID } = require('mongodb')
var fs = require('fs');

const log = console.log;


// user route
router.get('/', function(req, res){
    res.send('<h1>You are in user route.</h1>');
});

router.get('/pt-comments/:id', function(req,res){
    // ObjectId("5c04c0221c5efe3b585affc5")
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Solution.findById(id).then((solution) =>{
        if (!solution) {
            res.status(404).send()
        } else {

            res.render('pt-comments', {
                title: 'Solution and Comments',
                css: ['pt_comments.css'],
                js: ['pt_comments.js', 'navbarNeedLogin.js'],
                comments: solution.comments
            });
        }
    })
	
})

router.get('/solution-data/:id', function(req,res){
    // ObjectId("5c04c0221c5efe3b585affc5")
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Solution.findById(id).then((solution) =>{
        if (!solution) {
            res.status(404).send()
        } else {
            // log([solution.file])
            res.send([solution.file.data]);
        }
    })
    
})



// todo list:
// 1. pdf shown in page
// 2. navbar true, but there are ids


router.post('/pt-comments/:id', function(req,res){

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

	var username, context;
	var errors = [];

	if(!req.isAuthenticated()){
        const login_error =  { 
            msg: 'Please login before leaving your comments.',
            value: '' };
        errors.push(login_error);

    } else{
    	username = req.user.username.split('@')[0];
    	context = req.body.context;

        // Validate fields
        req.checkBody('context', 'Context of comments is required.').notEmpty();

        errors = req.validationErrors();

    }

    if (errors) {

        Solution.findById(id).then((solution) => {

            if(!solution){
                res.status(404).send()
            } else{

                res.render('pt-comments', {
                    title: 'Solution and Comments',
                    css: ['pt_comments.css'],
                    js: ['pt_comments.js', 'navbarNeedLogin.js'],
                    comments: solution.comments,
                    errors: errors,
                    // solutionID: id
                    url: "/user/pt-comments/" + id
                });
            }
            
        }, (error) =>{
            res.status(400).send(error);
        })

    } else{

        Solution.findByIdAndUpdate(id, {$push: {comments: {username, context}}}, {new: true}).then((solution) => {
            if (!solution) {
                res.status(404).send();
            } else {
                req.flash('success_msg', 'You have successfully left your comments.');
                res.redirect('/user/pt-comments/' + id);
            }
        }).catch((error) => {
            res.status(400).send();
        })
    }
})

module.exports = router;


// todo list:
// 1. add username other than email, display in the profile and comments area split(@)
// 2. how to distinguish user and admin
// 3. in admin, delete button for comments
// 4. how to get according pdf