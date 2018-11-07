"use strict"

class Solution {
	constructor(courseName, year, type, professor, author, fileId){
		this.courseName = courseName;
		this.year = year;
		this.type = type;
		this.professor = professor;
		this.author = author;
		this.fileId = fileId;
	}
}

let numberOfSolutions = 0; // total number of solution

let solutionList = []

let Solution1 = new Solution("CSC309", 2016, "Midterm", "Ken Jackson", "jellycsc", "solution.html");
let Solution2 = new Solution("CSC309", 2017, "Midterm", "Ken Jackson", "Cosmos", " ");
let Solution3 = new Solution("CSC309", 2017, "Midterm", "David Liu", "Claire", " ");
let Solution4 = new Solution("CSC411", 2016, "Midterm", "Ken Jackson", "17Singer", " ");
solutionList.push(Solution1);
solutionList.push(Solution2);
solutionList.push(Solution3);
solutionList.push(Solution4);

// const tableContainer = document.querySelector('#displayTableContainer')
// const table = tableContainer.getElementsByClassName("table table-striped")[0]
// const tableBody = table.getElementsByClassName('tableBody')[0]
// console.log(tableBody)

function removeSolutionFromTable(solution) {
	// Add code here
	const tableContainer = document.querySelector('#displayTableContainer')
	const table = tableContainer.getElementsByClassName("table table-striped")[0]
	const tableBody = table.getElementsByClassName('tableBody')[0]
	// console.log(tableBody)
	
	const rowNum = tableBody.getElementsByTagName('tr').length
	for (let i = 0; i < rowNum; i++) {
		// console.log(tableBody.getElementsByTagName('tr')[i]);
		let user = tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent
		if (user === solution.author) { 
			tableBody.deleteRow(i)
		}

	}
}

const deleteButton = document.querySelector('.delete-row');
// deleteButton.addEventListener('click', removeSolutionFromTable(Solution1));




// console.log(deleteButton)
// let table = $('#tableBody')
// console.log(table)
