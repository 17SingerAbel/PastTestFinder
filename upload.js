// $( "#narbarSearch" ).on( "click", function() {
//   console.log( $( this ).text() );
// });


$(function() {
  $("#searchButton").click(function(e) {
    e.preventDefault();
    // console.log( $( "#searchBox" ).val() );
    checkInputAtSearchBox($( "#searchBox" ).val());
  });
});

function checkInputAtSearchBox(courseName){
	const dept = courseName.slice(0,3);
	const courseNumber = courseName.slice(3);

	if(isLetter(dept) && isThreeDigits(courseNumber)){
		// const resultCourse = new Course(dept.toUpperCase(), courseNumber);
		console.log(dept.toUpperCase()+courseNumber);
	}
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


const FileInfo = function(dept, courseNumber, year, term, file){
	this.dept = dept;
	this.courseNumber = courseNumber;
	this.year = year;
	this.term = term;

	this.file = file;
	this.uploadTime = new Date();
}

var dept, courseNumber, year, term, file;

// $('#deptSelector').change(function() {
//     dept = $( this ).val();
// });

$('#fileInput').on('change',function(){

    // var fileName = $(this).val();
    file = this.files[0];

    console.log(file);
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(file.name);

	fr = new FileReader();
	fr.readAsDataURL(file);

})


$( "#fileSubmit" ).on( "click", function() {
	dept = $( deptSelector ).val();
	courseNumber = $("#courseNumInput").val();
	year = $( yearSelector ).val();
	term = $( termSelector ).val();

	if(checkCourseNumber(courseNumber)){
		const newFile = new FileInfo(dept, courseNumber, year, term, file);
		console.log(newFile);
	}

});


function checkCourseNumber(str) {
	const num = parseInt(str);

	if(isNaN(num)){
		$("#errorMessageInForm").html("Not a number.");
		return false;
	}
	if(num>=500 || num<100){
		$("#errorMessageInForm").html("Course Number should be within 100-499.");
		return false;
	}

	return true;
}
