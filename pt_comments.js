'use strict'

//
// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
//
var url = 'https://jellycsc.github.io/mdres/pdfs/sample_pt.pdf';
var currentPageNum = 1;
var totalNumberOfPages = 0;
var scale = 1;

//
// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js';

//
// Asynchronous download PDF
//
pdfjsLib.getDocument(url).then(getPdfPastTest);

function getPdfPastTest(pdf) {
  totalNumberOfPages = pdf.numPages;
  const index = document.querySelector('#page');
  index.innerText = `Page: ${currentPageNum}/${totalNumberOfPages}`
  // console.log(pdf.getMetadata());
  //
  // Fetch the first page
  //
  pdf.getPage(currentPageNum).then(function getPageHelloWorld(page) {

    var viewport = page.getViewport(scale);

    //
    // Prepare canvas using PDF page dimensions
    //
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    //
    // Render PDF page into canvas context
    //
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  });
}

const prevPage = function (e) {
  if (currentPageNum > 1) {
    currentPageNum -= 1;
    pdfjsLib.getDocument(url).then(getPdfPastTest);
  }
}
const nextPage = function (e) {
  if (currentPageNum < totalNumberOfPages) {
    currentPageNum += 1;
    pdfjsLib.getDocument(url).then(getPdfPastTest);
  }
}
const zoomIn = function (e) {
  scale += 0.1;
  pdfjsLib.getDocument(url).then(getPdfPastTest);
}
const zoomOut = function (e) {
    scale -= 0.1;
    pdfjsLib.getDocument(url).then(getPdfPastTest);
}

document.querySelector('#pdf-prev').addEventListener("click", prevPage);
document.querySelector('#pdf-next').addEventListener("click", nextPage);
document.querySelector('#pdf-bigger').addEventListener("click", zoomIn);
document.querySelector('#pdf-smaller').addEventListener("click", zoomOut);
const downloadButton = document.querySelector('#pdf-download');
downloadButton.href = url;

//
// Delete comments
//
const commentsDiv = document.querySelector('#comments');
commentsDiv.addEventListener('click', removeComment);
function removeComment(e) {
	if (e.target.classList.contains('delete-comment')) {
		const commentToRemove = e.target.parentElement.parentElement.parentElement
		commentsDiv.removeChild(commentToRemove)
	}
}

const submitBtn = document.querySelector('#comment-submit-btn');
submitBtn.addEventListener('click', (e) => {
    const newComment = document.querySelector('#new-comment');
    const content = newComment.value;
    if (content.trim().length == 0) {
        alert("Invalid comment!");
    } else {
        $('.collapse').collapse('hide');
        newComment.value = '';
        const newCard = document.createElement('div');
        newCard.className = "card-body";
        newCard.innerHTML = `
        <blockquote class="blockquote mb-0">
            <p>${content}</p>
            <footer class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
                <button class="delete-comment btn btn-danger">Delete</button>
            </footer>
        </blockquote>
        `;
        commentsDiv.appendChild(newCard);
    }
});


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

var login = false;
navBarIsLogin(login, "Liu");
