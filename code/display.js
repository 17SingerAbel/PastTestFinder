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

let numberOfSolutions = 4; // total number of solution

let solutionList = []

let Solution1 = new Solution("CSC309", 2016, "Midterm", "Ken Jackson", "jellycsc", "so");
let Solution2 = new Solution("CSC309", 2017, "Midterm", "Ken Jackson", "Cosmos", " ");
let Solution3 = new Solution("CSC309", 2017, "Midterm", "David Liu", "Claire", " ");
let Solution4 = new Solution("CSC411", 2016, "Midterm", "Ken Jackson", "17Singer", " ");
solutionList.push(Solution1);
solutionList.push(Solution2);
solutionList.push(Solution3);
solutionList.push(Solution4);

const tableContainer = document.querySelector('#displayTableContainer')
const table = tableContainer.getElementsByClassName("table table-striped")[0]
const tableBody = table.getElementsByClassName('tableBody')[0]

tableContainer.addEventListener('click', deleteSolutionFromTable);

function searchUsername(username) {
	for (let i=0; i < numberOfSolutions; i++) {
		if (username == solutionList[i].author) {
			return solutionList[i]
		}
	}
}

function deleteSolutionFromTable(e){
	e.preventDefault();
	if(e.target.classList.contains("delete-row")) {
		let user = e.target.parentElement.parentElement.getElementsByTagName('td')[1].textContent;
		const solution = searchUsername(user)
		removeSolutionFromTable(solution)
	}

}


function removeSolutionFromTable(solution) {
	const tableContainer = document.querySelector('#displayTableContainer')
	const table = tableContainer.getElementsByClassName("table table-striped")[0]
	const tableBody = table.getElementsByClassName('tableBody')[0]
	let rowNum = tableBody.getElementsByTagName('tr').length
	for (let i = 0; i < rowNum; i++) {
		let user = tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent;
		if (user === solution.author) { 
			tableBody.deleteRow(i)
			rowNum -= 1;

		}

	}
}
