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
// router.get('/', function(req, res){
//     res.render('index', {
//         title: 'Past Exam Finder',
//         css: ['index.css'],
//         js: ['index.js'],
//     });
// });



router.get('/profile/:linkedUsername', function(req, res){
    const username = req.user.username.split("@")[0]
    const linkedUsername = req.params.linkedUsername
    let sameUser = false
    // console.log(username)
    console.log(linkedUsername)
    if (username == linkedUsername){
        sameUser = true
        console.log(req.user)
        req.user.username = req.user.username.split("@")[0]
        res.render('profile',{
            title: 'User Profile',
            css: ['userProfile.css'],
            js: [],
            // img: req.user.img_path,
            loggedUser: req.user,
            sameUser: sameUser
        });
    } else {
        sameUser = false
        
        User.find({username: new RegExp(linkedUsername, "i")}).then(function(theUser){
            console.log(theUser)
            // theUser = theUser[0]
            theUser[0].username = theUser[0].username.split("@")[0]
            res.render('profile',{
                title: 'User Profile',
                css: ['userProfile.css'],
                js: [],
                // img: theUser.img_path,
                loggedUser: theUser[0],
                sameUser: sameUser
            });
       }, (error) => {
           res.status(400).send(error); // 400 for bad request
       })
        
    }
    log('GET profile')
});

router.get('/:linkedUsername/modifyProfile', function(req, res){
    const linkedUsername = req.params.linkedUsername
    console.log(linkedUsername)
    res.render('modifyProfile',{
    	title: 'modify User Profile',
        css: ['userProfile.css'],
        linkedUsername: linkedUsername,
        loggedUser: req.user
    	//js: ['navbarNeedLogin.js'],
    });
    log("Modify")
 
});

router.post('/profile/:linkedUsername', changeIMG.single('file'), function(req,res){
	//console.log('profile POSt')
   // log(req.file)
   const linkedUsername = req.params.linkedUsername
   const sameUser = true
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
            const result = req.user;
            result.img_path = pth;
            result.username = result.username.split("@")[0]
            res.render('profile',{
                title: 'User Profile',
                css: ['userProfile.css'],
                linkedUsername: linkedUsername,
                loggedUser: result,
                sameUser: sameUser
            });
        })
    }
    else {
        res.redirect("/user/" + linkedUsername + "/modifyProfile");
    }

});

router.post('/:linkedUsername/modifyProfile', function(req, res){
    let linkedUsername = req.params.linkedUsername
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
                    linkedUsername: linkedUsername,
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
                        res.redirect('/user/profile/' + linkedUsername);
                    }
                });        
                
            }
    }
    else { 
        res.redirect('/user/profile/' + linkedUsername);
    }

});



module.exports = router;
