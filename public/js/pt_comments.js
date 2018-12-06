'use strict'

const log = console.log;

const id = window.location.href.split("/")[5];

var pdfData = [];

fetch('/user/solution-data/' + id)
.then((res) => { 
    if (res.status === 200) {
       return res.json();
   } else {
        alert('Could not get solution data');
   }                
})
.then((json) => {
  // alert(json[0].data.length)

  // const base64str = new Buffer(json[0].data).toString('base64');
  // alert(base64str.length)
  

  const base64 = (json[0].data).toString('base64');
  // alert(base64[0])

  const base64str = new Buffer(base64, 'base64');
  // const base64str = Buffer.from("SGVsbG8gV29ybGQ=", 'base64');
  alert(base64str.length)

  pdfData = atob(base64str);
  alert(pdfData.length)


}).catch((error) => {
    console.log(error)
})


var url = 'https://jellycsc.github.io/mdres/pdfs/sample_pt.pdf';
var currentPageNum = 1;
var totalNumberOfPages = 0;
var scale = 1;


// pdfData = atob(
//   'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
//   'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
//   'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
//   'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
//   'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
//   'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
//   'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
//   'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
//   'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
//   'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
//   'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
//   'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
//   'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');

var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js';

//
// Asynchronous download PDF
//
// pdfjsLib.getDocument(url).then(getPdfPastTest);
pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);

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

// const commentsDiv = document.querySelector('#comments');
// commentsDiv.addEventListener('click', removeComment);
// function removeComment(e) {
// 	if (e.target.classList.contains('delete-comment')) {
// 		const commentToRemove = e.target.parentElement.parentElement.parentElement
// 		commentsDiv.removeChild(commentToRemove)
// 	}
// }

// const submitBtn = document.querySelector('#comment-submit-btn');
// submitBtn.addEventListener('click', (e) => {
//     const newComment = document.querySelector('#new-comment');
//     const content = newComment.value;
//     if (content.trim().length == 0) {
//         alert("Invalid comment!");
//     } else {
//         $('.collapse').collapse('hide');
//         newComment.value = '';
//         const newCard = document.createElement('div');
//         newCard.className = "card-body";
//         newCard.innerHTML = `
//         <blockquote class="blockquote mb-0">
//             <p>${content}</p>
//             <footer class="blockquote-footer">
//                 Someone famous in <cite title="Source Title">Source Title</cite>
//                 <button class="delete-comment btn btn-danger">Delete</button>
//             </footer>
//         </blockquote>
//         `;
//         commentsDiv.appendChild(newCard);
//     }
// });
