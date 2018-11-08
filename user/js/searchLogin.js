const courses = [];

class Course {
	constructor(dept, courseNumber) {
		this.dept = dept;
		this.courseNumber = courseNumber;
	}

	getCourseName() {
		return this.dept + this.courseNumber;
	}
}

courses.push(new Course('CSC','309'));
courses.push(new Course('MAT','194'));

$('#searchBox').on('keypress', function(e) {
	if (e.keyCode == 13) { 
	  document.getElementById("searchButton").click();
	}

});

$( "#searchButton" ).on( "click", function(){
    // e.preventDefault();

    console.log("checking whether book is valid");

	// const courseName = document.querySelector('#courseName').value;
	const courseName = $('#courseName').val();
	const dept = courseName.slice(0,3);
	const courseNumber = courseName.slice(3);

	if(isLetter(dept) && isThreeDigits(courseNumber)){
		const resultCourse = new Course(dept.toUpperCase(), courseNumber);
		console.log(resultCourse);
		$("#searchButton").attr("href", "display.html");
	}
});



function isLetter(str) {
  	return str.toLowerCase() != str.toUpperCase();
}

function isThreeDigits(str) {
	const num = parseInt(str);

	if(isNaN(num)){
		$("#errorMessage").html("Not a course number. <br> Please input a valid number, like 'CSC'+'309'.");
		return false;
	}
	if(num>=500 || num<100){
		$("#errorMessage").html("Course Number should be within 100-499. <br> Please input a valid number, like 'CSC'+'309'.");
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
navBarIsLogin(login, "Liu");