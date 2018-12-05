const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const User = require('../models/user');


const log = console.log
// user route
router.get('/', function(req, res){
    res.render('index', {
        title: 'Past Exam Finder',
        css: ['index.css'],
        js: ['index.js'],
    });
});



router.get('/profile', function(req, res){
    res.render('profile',{
    	title: 'User Profile',
    	css: ['userProfile.css'],
    	js: ['userProfile.js'],
    });

    log('GET profile')

});

router.get('/modifyProfile', function(req, res){
    res.render('modifyProfile',{
    	title: 'modify User Profile',
    	css: ['userProfile.css'],
    	//js: ['navbarNeedLogin.js'],
    });
  // log('modifyProfile GET')
 
});

router.post('/profile', function(req,res){
	console.log('POSt')
	res.redirect("/modifyProfile");

});

router.post('/modifyProfile', function(req, res){
        log(req.body)
    var newfaculty = req.body.InputFaculty;
    var newyear = req.body.InputYear;
    var InputPass = req.body.InputPass;
    var ComfirmPass = req.body.ComfirmPass;
    log("InputPass = "+ InputPass)

    //var newpassword = req.body.InputPass;

    if (newfaculty != "") { 
        req.user.faculty = newfaculty;
        log("New fa = " + req.user.faculty)
        User.findOneAndUpdate( {"username": req.user.username } ,
         {$set: {faculty: newfaculty}}).catch((error) => {
         res.status(400).send(error)
       })
    }
    if (newyear != "") { 
        req.user.year = newyear;
         log("New year = " + req.user.year)
        User.findOneAndUpdate( {"username": req.user.username } ,
         {$set: {year: newyear}}).catch((error) => {
        res.status(400).send(error)
        })
    }

   
  
   
  //  req.flash('success_msg', 'Edit profile successfuly.');
      if (InputPass != "") {
        req.checkBody('ComfirmPass', 'Passwords do not match').equals(req.body.InputPass);
         const errors = req.validationErrors();
          if (errors) {
                res.render('modifyProfile',{
                    title: 'modify User Profile',
                    css: ['userProfile.css'],
                     errors: errors,
                 });

            }
            else {
                User.findByUsername(req.user.username). then(function(theUser){
                    if (theUser){
                        theUser.setPassword(ComfirmPass, function(){
                            theUser.save();
                            log("Change Pass!");
                            })
                        res.redirect('/user/profile');
                    }
                });        
                
            }
    }
    else { 
        res.redirect('/user/profile');
    }

    
   
/**/

});




/*router.patch('/profile', function(req, res){
	console.log("PATCH")
	console.log(req.body)
	var facultyname = req.body.faculty;
	var yearnew = req.body.year;

	User.findOneAndUpdate({username : req.body.username},
					{$set: {faculty:facultyname, year: yearnew}})
		  
	User.save().then((result) => {
				res.send( {User})
				}, (error) => {
					res.status(400),send(error)
			})	
			

});
*/




module.exports = router;


