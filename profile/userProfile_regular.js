//response to buttons on regular user profile page


$(document).on('show.bs.modal','#EditProfile', function (event) {
	
	 var modal = $(this)
  	var fac =  $('p#FacultyName')
  	var year = $('p#yearStudy');
  
  modal.find($('input#Faculty')).val(fac.text());
  modal.find( $('input#yearOfStudy')).val(year.text());
	

})

 $(document).on('click','#EditProfile', 'btn btn-primary',function(event){
		
			var newfac =  $('input#Faculty');
		  	var newyear = $('input#yearOfStudy');
		  

			$('p#FacultyName').html(newfac.val());
			$('p#yearStudy').html(newyear.val());

})





	

	



  

