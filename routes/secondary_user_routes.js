const express = require('express');
const router = express.Router();
const Solution = require('../models/solution');
const { check } = require('express-validator/check');
const { User } = require('../models/user');
const multer = require('multer');
const fs = require('fs');
const log = console.log;
const path = require('path');
const { ObjectID } = require('mongodb')


var storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'mongo-data/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".pdf");
    }
});

var upload = multer({storage: storage1});

router.get('/upload', function (req, res) {
    res.render('upload', {
        title: 'Upload File',
        js: ['upload.js', 'navbarNeedLogin.js'],
    });
});

router.post('/upload', upload.single('file'), function(req, res) {

    var errors = [];
    var dept, courseNumber, year, term, type, professor;

    if (!req.isAuthenticated()) {
        const login_error = {
            msg: 'Please login before uploading your file.',
            value: ''
        };
        errors.push(login_error);

    } else {
        dept = req.body.dept;
        courseNumber = req.body.courseNumber;
        year = req.body.year == "Select" ? "" : req.body.year;
        term = req.body.term == "Select" ? "" : req.body.term;
        type = req.body.type == "Select" ? "" : req.body.type;
        professor = req.body.professor;
        // const uploadTime = new Date();

        // log(req.file);

        // Validate fieldss
        req.checkBody('dept', 'Department code is required.').not().equals("Select");
        req.checkBody('courseNumber', 'Course number is between 100-499.').isInt({min: 100, max: 499});
        req.checkBody('year', 'Year is required.').not().equals("Select");
        req.checkBody('term', 'Term is required.').not().equals("Select");
        req.checkBody('type', 'Type is required.').not().equals("Select");
        req.checkBody('professor', 'Professor is required').notEmpty();

        errors = req.validationErrors();

        if (!req.file) {
            const new_error = {
                param: 'file',
                msg: 'Please upload the PDF file.',
                value: ''
            };
            errors.unshift(new_error);

        } else {
            const extension = (path.extname(req.file.originalname)).toLowerCase();
            if (extension !== '.pdf') {
                const extention_error = {
                    // location: 'file',
                    param: 'file',
                    msg: "PDF file is required. Must end with '.pdf'!",
                    value: ''
                };
                errors.unshift(extention_error);
            }
        }
    }


    if (errors) {
        res.render('upload', {
            title: 'Upload File',
            js: ['upload.js', 'navbarNeedLogin.js'],
            errors: errors,
        });
    } else {

        const file_data = fs.readFileSync('mongo-data/' + req.file.filename);
        const file_name = req.file.originalname;

        const solution = new Solution({
            // fileId: file,
            dept: dept,
            courseNumber: courseNumber,
            year: year,
            term: term,
            author: req.user.username,
            professor: professor,
            type: type
        });

        solution.file.data = file_data;
        solution.file.name = file_name;
        solution.file.contentType = 'pdf';

        // log(solution);

        solution.save().then((result) => {
            // Save and send object that was saved
            req.flash('success_msg', 'You have successfully uploaded the file.');
            // res.send(result);
            res.redirect('/user/upload');
        }, (error) => {
            res.status(400).send(error); // 400 for bad request
        })
    }
});

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
      js: []
    	
    });
    log("Modify")
 
});

router.post('/profile', changeIMG.single('file'), function(req,res){
    if (req.file){
        console.log('Change Pic')

        User.findByUsername(req.user.username).then(function(theUser){
            // console.log('Before: ' + theUser.img_path)
       
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
         // req.checkBody('req.file', 'Image is required.').notEmpty();
        res.render('profile',{
            title: 'User Profile',
            css: ['userProfile.css'],
            js: [],
            img_err: 'Image is required.',
            img: req.user.img_path
        });
    }
});

router.put('/profile', function(req,res){
  res.redirect("/user/modifyProfile");
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
        User.findOneAndUpdate(
            {"username": req.user.username } ,
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
            res.send([solution.file]);
        }
    })
    
})



// todo list:
// 1. delete button for admin
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

function isAdminPT (req, res, next) {
    if (req.user) {
        if (req.user.status === 'admin') {
            return res.redirect("/admin/display" + req.url);
        } else {
            next();
        }
    } else {
        res.redirect("/login");
    }
}

module.exports = router;

