//response to buttons on regular user profile page


$(document).on('show.bs.modal','#EditProfile', function (event) {
	
	 var modal = $(this)
  	var fac =  $('div#FacultyName')
  	var year = $('div#yearStudy');
  
  modal.find($('input#Faculty')).val(fac.text());
  modal.find( $('input#yearOfStudy')).val(year.text());
	

})

 $(document).on('click','#EditProfile', 'btn btn-primary',function(event){
		
			var newfac =  $('input#Faculty');
		  	var newyear = $('input#yearOfStudy');
		  

			$('div#FacultyName').html(newfac.val());
			$('div#yearStudy').html(newyear.val());

})





	

	



  

