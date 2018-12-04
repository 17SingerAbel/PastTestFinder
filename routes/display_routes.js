const express = require('express');
const router = express.Router();

// user route
router.get('/', function(req, res){
    // res.send('<h1>You are in display route.</h1>');
    res.render('display', {
        title: 'Display',
        css: ['display.css'],
        js: ['display.js'],
    });
});

module.exports = router;