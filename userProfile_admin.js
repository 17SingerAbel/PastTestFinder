//response to buttons on user profile page


$('#EditProfile').on('show.bs.modal', function (event) {

	 var modal = $(this)
  	var fac =  $('p#FacultyName')
  	var year = $('p#yearStudy');
  	var Passw = $('p#passW');
  
  modal.find($('input#Faculty')).val(fac.text());
  modal.find( $('input#yearOfStudy')).val(year.text());
  modal.find( $('input#Password-text')).val(Passw.text());
	

})

 $(document).on('click','#EditProfile', 'btn btn-primary',function(event){
 			
			var newfac =  $('input#Faculty');
		  	var newyear = $('input#yearOfStudy');
		  	var newPassw = $('input#Password-text');

			$('p#FacultyName').html(newfac.val());
			$('p#yearStudy').html(newyear.val());
			$('p#passW').html(newPassw.val());

})

$(document).on('click', '#deleteUserButton', function(){
	alert('Delete user!');
	//redirect to another page
})





	

	



  

