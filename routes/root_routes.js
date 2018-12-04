const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');

// Index page
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Past Exam Finder',
        css: ['index.css'],
        js: ['index.js'],
    });
});

router.get('/login', isLoggedIn, function (req, res) {
    res.render('login', {
        title: 'Login',
        css: ['registerAndLogin.css'],
        js: ['login.js', 'navbarNeedLogin.js'],
    });
});


router.get('/register', isLoggedIn, function (req, res) {
    res.render('register', {
        title: 'Register',
        css: ['registerAndLogin.css'],
        js: ['login.js', 'navbarNeedLogin.js'],
    });
});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect("/login");
});

router.post('/login', passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/login",
        failureFlash: true,
    }),
    function(req, res){
        res.redirect('/');
    }
);

router.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    // Validate fields
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            title: 'Register',
            css: ['registerAndLogin.css'],
            js: ['login.js', 'navbarNeedLogin.js'],
            errors: errors,
        });
    }
    else {
        User.register(new User({username:req.body.username}), req.body.password, function (err, user) {
            if (err) {
                res.render('register', {
                    title: 'Register',
                    css: ['registerAndLogin.css'],
                    js: ['login.js', 'navbarNeedLogin.js'],
                    errors: err,
                });
            } else {
                passport.authenticate("local")(req, res, function () {
                    req.flash('success_msg', 'You are successfully registered.');
                    res.redirect("/login");
                });
            }
        });
    }
});

function isLoggedIn (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;