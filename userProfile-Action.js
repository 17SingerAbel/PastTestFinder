//response to buttons on user profile page

 

$(document).on('show.bs.modal','#EditProfile', function (event) {
	 var modal = $(this)
  	var fac =  $('div#FacultyName')
  	var year = $('div#yearStudy');
  	var Passw = $('div#passW');
  
  modal.find($('input#Faculty')).val(fac.text());
  modal.find( $('input#yearOfStudy')).val(year.text());
  modal.find( $('input#Password-text')).val(Passw.text());
	
	 $('#thirdOne').click(function(){
			
		  	var newfac =  $('input#Faculty');
		  	var newyear = $('input#yearOfStudy');
		  	var newPassw = $('input#Password-text');

		  //	console.log(newfac.val())
		  //	console.log( $('div#FacultyName').text())
		  		  	
			modal.find($('div#FacultyName')).val(newfac.val());
			modal.find($('div#yearStudy')).val(newyear.val());
			modal.find($('input#Password-text')).val(newPassw.val());
	
			})

})


	

	



  

