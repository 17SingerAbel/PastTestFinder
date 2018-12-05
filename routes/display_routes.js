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
			// let solutions = { solutions }
			// const year = 2016
			// const term = 'Fall'
			// const type = 'Midterm'
			// const professor = 'Ken Jackson'

			// let filteredSolutions = solutions.filter(soln =>{
			// 	if (year === soln.year && term === soln.term && type ===  soln.type && professor === soln.professor) {
			// 		return soln
			// 	}

			// })
			// console.log(filteredSolutions)
			res.render('display', {
	        title: 'Display',
	        css: ['display.css'],
	        js: ['display.js'],
	        solutions: solutions
    		});
		}

	}, (error) =>{
		res.status(400).send(error)
	})
	// res.send({solutionList})
})


router.post('/:cousrseCode/filter', function(req, res) {
	const year = req.body.year;
	const term = req.body.term;
	const type = req.body.type;
	const professor = req.body.professor;

	
})
// router.get('/user/pt-comment/:_id', function(req, res){
// 	const id = req.params.id
// 	res.redirect('/user/pt-comment/' + id)
// })

module.exports = router;