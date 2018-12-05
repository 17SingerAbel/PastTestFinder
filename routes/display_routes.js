const express = require('express');
const router = express.Router();

const Solution = require('../models/solution')
const handlebars = require('handlebars')
// console.log({Solution})

// user route
router.get('/', function(req, res){
    res.render('display', {
        title: 'Display',
        css: ['display.css'],
        js: ['display.js'],
    });
});

router.get('/:courseCode', function(req, res){
	const courseCode = req.params.courseCode
	const dept = courseCode.slice(0, 3)
	const courseNumber = parseInt(courseCode.slice(3, 6), 10)
	// res.send('<h1> fuck ' +  dept + courseNumber + '</h1>')
	// TODO: check if course exists in the database
	// if(!courseName.isValid(courseName))

	// const solutionList = []
	Solution.find({dept:dept, courseNumber: courseNumber}).then((solutions) => {
		if(!solutions) {
			res.status(404).send()
		} else {

			res.render('display', {
	        title: 'Display',
	        css: ['display.css'],
	        js: ['display.js'],
			solutions: solutions,
			courseCode: courseCode
    		});
		}

	}, (error) =>{
		res.status(400).send(error)
	})
	// res.send({solutionList})
})



// /user/display/CSC309/2016/Winter/Midterm/Ken%20Jackson
router.get('/:courseCode/:year?/:term:?/:type?/:prof?', function(req, res) {

	const year = parseInt(req.params.year, 10);
	console.log(year)
	const term = req.params.term;
	const type = req.params.type;
	const professor = req.params.prof;

	const courseCode = req.params.courseCode
	console.log(courseCode)
	const dept = courseCode.slice(0, 3)
	const courseNumber = parseInt(courseCode.slice(3, 6), 10)

	Solution.find({dept:dept, courseNumber: courseNumber}).then((solutions) => {
		if(!solutions) {
			res.status(404).send()
			console.log("GG")
		} else {
			let filteredSolutions = solutions.filter(soln =>{
				console.log(year === soln.year)
				if (year == soln.year && term == soln.term && type ==  soln.type && professor == soln.professor) {
					return soln
				}

			})
			console.log(filteredSolutions)
			res.render('display', {
	        title: 'Display',
	        css: ['display.css'],
	        js: ['display.js'],
			solutions: filteredSolutions,
			courseCode: courseCode
    		});
		}

	}, (error) =>{
		res.status(400).send(error)
	})
	
})
// router.get('/user/pt-comment/:_id', function(req, res){
// 	const id = req.params.id
// 	res.redirect('/user/pt-comment/' + id)
// })

module.exports = router;