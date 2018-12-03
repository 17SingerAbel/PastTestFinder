const express = require('express');
const router = express.Router();

// admin route
router.get('/', function(req, res){
    res.send('<h1>You are in admin route.</h1>');
});

module.exports = router;