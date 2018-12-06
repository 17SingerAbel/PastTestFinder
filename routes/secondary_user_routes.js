const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
var multer = require('multer');
var fs = require('fs');
const log = console.log
const path = require('path');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      console.log(__dirname);
    cb(null, __dirname + '/../public/imgs/')      //you tell where to upload the files,
  },
  filename: function (req, file, cb) {
    cb(null,  file.fieldname + '-' + Date.now() + '.png')
  }
})

var changeIMG = multer({storage: storage});

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
    	js: [],
        img: req.user.img_path
    });

    log('GET profile')

});

router.get('/modifyProfile', function(req, res){
    res.render('modifyProfile',{
    	title: 'modify User Profile',
    	css: ['userProfile.css'],
    	//js: ['navbarNeedLogin.js'],
    });
    log("Modify")
 
});

router.post('/profile', changeIMG.single('file'), function(req,res){
	//console.log('profile POSt')
   // log(req.file)
    if (req.file){
        console.log('Change Pic')

        User.findByUsername(req.user.username).then(function(theUser){
             console.log('Before: ' + theUser.img_path)
       
            const file_data = fs.readFileSync(req.file.path);
            theUser.img.data = file_data;
            theUser.img.contentType = 'image/png';

            // console.log(path.basename(req.file.path));
            theUser.img_path = '/imgs/' + path.basename(req.file.path)
            theUser.save();

            console.log(theUser);

            console.log('After req.user.img_path: ' + req.user.img_path)
            return theUser.img_path;
        }, (error) => {
            res.status(400).send(error); // 400 for bad request
        }).then((pth) => {
            res.render('profile',{
                title: 'User Profile',
                css: ['userProfile.css'],
                js: [],
                img: pth
            });
        })
    }
    else {
        res.redirect("/user/modifyProfile");
    }

});

router.post('/modifyProfile', function(req, res){
    log(req.body)
    var newfaculty = req.body.InputFaculty;
    var newyear = req.body.InputYear;
    var InputPass = req.body.InputPass;
    var ComfirmPass = req.body.ComfirmPass;
   // log("InputPass = "+ InputPass)

    //var newpassword = req.body.InputPass;

    if (newfaculty != "") { 
        req.user.faculty = newfaculty;
       // log("New fa = " + req.user.faculty)
        User.findOneAndUpdate( {"username": req.user.username } ,
         {$set: {faculty: newfaculty}}).catch((error) => {
         res.status(400).send(error)
       })
    }
    if (newyear != "") { 
        req.user.year = newyear;
      //   log("New year = " + req.user.year)
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
                          //  log("Change Pass!");
                            })
                        res.redirect('/user/profile');
                    }
                });        
                
            }
    }
    else { 
        res.redirect('/user/profile');
    }

});



module.exports = router;
