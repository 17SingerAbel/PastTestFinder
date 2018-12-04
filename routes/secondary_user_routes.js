const express = require('express');
const router = express.Router();

// user route
router.get('/', function(req, res){
    res.send('<h1>You are in user route.</h1>');
    // res.redirect("/user");
});


// router.get("/display", function (req, res) {
//     res.redirect("/user/display");
// })

module.exports = router;