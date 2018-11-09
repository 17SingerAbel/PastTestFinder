"use strict"

// This file is similar to the "display.js" in master/user/js folder, more comments are made in that file
//This file will be merged to the file mentioned before in Phase2. 

/******************Hardcode Part for Phase1*************************/
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

/********************************************************************/


const tableContainer = document.querySelector('#displayTableContainer')
const table = tableContainer.getElementsByClassName("table table-striped")[0]
const tableBody = table.getElementsByClassName('tableBody')[0]
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
        <td><a class="fileName" href="login.html">'+ name + '</a></td> \
        <td><a class="authorLink" href="#">'+ author + '</td> \
        <td><button type="button" class="delete-row">delete</button></td> \
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
	let targetRow = -1
	for (let i = 1; i < numberOfTemp + 1; i++) {
		let user = tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent;
		if (user === solution.author) { 
			targetRow = i
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


//Phase2: User will be redirected to different type of page based on their type(user or admin)
//Instead of using window.location.href directly, it will have a server call below, obtained user informaiton and then do comparison. 
$(document).on( "click", ".fileName" , function(e) {
	window.location.href = "pt_comments.html";
});

$(document).on( "click", ".authorLink" , function(e) {
	window.location.href = "../profile/userProfile_admin.html";
});




$(function() {
  $("#searchButton").click(function(e) {
    // e.preventDefault();
    if(checkInputAtSearchBox($( "#searchBox" ).val())){
    	$("#searchButton").attr("href", "../display.html");
    }
  });
});

function checkInputAtSearchBox(courseName){
	const dept = courseName.slice(0,3);
	const courseNumber = courseName.slice(3);

	if(isLetter(dept) && isThreeDigits(courseNumber)){
		// const resultCourse = new Course(dept.toUpperCase(), courseNumber);
		$("#navbarErrorMessage").html("");
		console.log(dept.toUpperCase()+courseNumber);
		return true;
	}
	return false;
}


function isLetter(str) {
  	return str.toLowerCase() != str.toUpperCase();
}

function isThreeDigits(str) {
	const num = parseInt(str);

	if(isNaN(num)){
		$("#navbarErrorMessage").html("Not a course number");
		return false;
	}
	if(num>=500 || num<100){
		$("#navbarErrorMessage").html("Should be within 100-499");
		return false;
	}

	return true;
}

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

var login = true;
navBarIsLogin(login, "Admin");
