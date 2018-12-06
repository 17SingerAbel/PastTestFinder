const express = require('express');
const router = express.Router();

const Solution = require('../models/solution')
const handlebars = require('handlebars')

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
	Solution.find({dept:dept, courseNumber: courseNumber}).then((solutions) => {
		if(!solutions) {
			res.status(404).send()
		} else {
			yearColumn = ['Year']
			termColumn = ['Term']
			professorColumn = ['Professor']
			solutions.map(soln=>{
				if (yearColumn.indexOf(soln.year) === -1) yearColumn.push(soln.year)
				if (termColumn.indexOf(soln.term) === -1) termColumn.push(soln.term)
				if (professorColumn.indexOf(soln.professor) === -1) professorColumn.push(soln.professor)
				console.log(soln.file.name)
			})
			// console.log(yearColumn)
			// console.log(termColumn)
			// console.log(professorColumn)
			res.render('display', {
	        title: 'Display',
	        css: ['display.css'],
	        js: ['display.js'],
			solutions: solutions,
			courseCode: courseCode,
			yearColumn: yearColumn,
			termColumn: termColumn,
			professorColumn: professorColumn
    		});
		}

	}, (error) =>{
		res.status(400).send(error)
	})
	// res.send({solutionList})
})



router.get('/:courseCode/:year?/:term:?/:type?/:prof?', function(req, res) {
	const courseCode = req.params.courseCode
	console.log(courseCode)
	const dept = courseCode.slice(0, 3)
	const courseNumber = parseInt(courseCode.slice(3, 6), 10)

	let filter = {dept:dept, courseNumber: courseNumber}
	let year = req.params.year
	const term = req.params.term;
	const type = req.params.type;
	const professor = req.params.prof;

	if (year != "Year") filter.year = year
	if (term != "Term") filter.term = term
	if (type != "Type") filter.type = type
	if (professor != "Professor") filter.professor = professor 
	// year = parseInt(year, 10)
	

	Solution.find(filter).then((solutions) => {
		if(!solutions) {
			res.status(404).send()
			console.log("GG")
		} else {
			Solution.find({dept:dept, courseNumber: courseNumber}).then((solns) => {
					yearColumn = ['Year']
					termColumn = ['Term']
					professorColumn = ['Professor']
					solns.map(soln=>{
						if (yearColumn.indexOf(soln.year) === -1) yearColumn.push(soln.year)
						if (termColumn.indexOf(soln.term) === -1) termColumn.push(soln.term)
						if (professorColumn.indexOf(soln.professor) === -1) professorColumn.push(soln.professor)
					})
					console.log(yearColumn)
					console.log(termColumn)
					console.log(professorColumn)
			})
			res.render('display', {
	        title: 'Display',
	        css: ['display.css'],
	        js: ['display.js'],
			solutions: solutions,
			courseCode: courseCode,
			yearColumn: yearColumn,
			termColumn: termColumn,
			professorColumn: professorColumn
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