"use strict"

class Solution {
	constructor(courseName, year, term, type, professor, author, fileId){
		this.courseName = courseName;
		this.year = year;
		this.type = type;
		this.professor = professor;
		this.author = author;
		this.fileId = fileId;
		this.term = term;
	}
}

let numberOfSolutions = 4; // total number of solution
let numberOfTemp = 0;
let solutionList = []
let tempList = []
let Solution1 = new Solution("CSC309", "2016","Fall", "Midterm", "Ken Jackson", "jellycsc", "Solution1.pdf");
let Solution2 = new Solution("CSC309", "2017", "Fall", "Final", "Ken Jackson", "Cosmos", "Solution2.pdf");
let Solution3 = new Solution("CSC309", "2017", "Winter", "Midterm", "David Liu", "Claire", "Solution3.pdf");
let Solution4 = new Solution("CSC309", "2016", "Winter", "Midterm", "Ken Jackson", "17Singer", "Solution4.pdf");
solutionList.push(Solution1);
solutionList.push(Solution2);
solutionList.push(Solution3);
solutionList.push(Solution4);

const tableContainer = document.querySelector('#displayTableContainer')
const table = tableContainer.getElementsByClassName("table table-striped")[0]
const tableBody = table.getElementsByClassName('tableBody')[0]
// const filterContainer = document.querySelector('#filterContainer')
tableContainer.addEventListener('click', deleteSolutionFromTable);

function searchUsername(username) {
	for (let i=0; i < numberOfSolutions; i++) {
		if (username === solutionList[i].author) {
			return solutionList[i]
		}
	}
}

function filterSolutions(){
	tableBody.innerHTML = '<tbody class="tableBody">\
          					 <tr></tr>\
        				   </tbody>'
	tempList = [];
	numberOfTemp = 0;
	let yearSelector = document.querySelector('#deptSelectorYear')
	let year = yearSelector.options[yearSelector.selectedIndex].text
	let typeSelector = document.querySelector('#deptSelectorType')
	let type = typeSelector.options[typeSelector.selectedIndex].text
	let profSelector = document.querySelector('#deptSelectorProf')
	let prof = profSelector.options[profSelector.selectedIndex].text
	let termSelector = document.querySelector('#deptSelectorTerm')
	let term = termSelector.options[termSelector.selectedIndex].text
	for (let i=0; i < numberOfSolutions; i ++) {
		if (yearSelector.selectedIndex === 0) { year = solutionList[i].year}
		if (typeSelector.selectedIndex === 0)  { type = solutionList[i].type}
		if (profSelector.selectedIndex === 0) { prof = solutionList[i].professor}
		if (termSelector.selectedIndex === 0) { term = solutionList[i].term}

		if (solutionList[i].year === year && solutionList[i].type === type &&
						solutionList[i].professor === prof && term === solutionList[i].term){
			tempList.push(solutionList[i])
			numberOfTemp = numberOfTemp +  1;

		}
	}
	console.log(tempList)
	console.log(numberOfTemp)
	addSolutionsToTable(tempList, numberOfTemp);
}


function addSolutionsToTable(solutions, numberOfTempSolutions){
	for (let i=0; i < numberOfTempSolutions; i++) {
		let solution = solutions[i]
		let row = i+1
		let name = solution.fileId
		let author = solution.author
		$('.tableBody tr:last').after('<tr> \
        <th scope="row">' + row + '</th> \
        <td><a class="doc-name" href="solution.html">'+ name +'</a></td> \
        <td>'+ author + '</td> \
      	</tr>');
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
	// let num = numberOfTemp
	let targetRow = -1
	// deleteSolutionFromList(solution)
	for (let i = 1; i < numberOfTemp + 1; i++) {
		let user = tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent;
		if (user === solution.author) { 
			targetRow = i
			// console.log(numberOfTemp)
		}
	}

	let targetIndex = -1;
	for (let j =0; j<numberOfSolutions; j++) {
		if (solution.author === solutionList[j].author) {
			targetIndex = j
		}
	}

	solutionList.splice(targetIndex, 1)
	console.log(solutionList)
	numberOfSolutions = numberOfSolutions - 1
	numberOfTemp -= 1
	tableBody.deleteRow(targetRow)
}


filterSolutions()

function navBarIsLogin(login, username){
	if(login){
		$("#loginButton").hide();
		$("#logoutButton").show();

		$("#navBarUserName").html("Hello, "+ username + "!");
		login = false;
		console.log('ready to logout');
	}
	else{
		$("#loginButton").show();
		$("#logoutButton").hide();
		login = true;
		console.log("ready to login");
	}
}

$(".doc-name").on( "click", function(e) {
	window.location.href = "www.baidu.com";
});

var login = true;
navBarIsLogin(login, "Liu");
