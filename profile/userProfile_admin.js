//response to "Save" button on popwindow of user profile page
//We can check the login status(user type is regular user or admin) in Phase2, so this file will be merged with the "userProfile_regular.js" 


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

		  	 //In phase2, instead of changing text in HTML, it will change data in database
			$('p#FacultyName').html(newfac.val());
			$('p#yearStudy').html(newyear.val());
			$('p#passW').html(newPassw.val());

})

$(document).on('click', '#deleteUserButton', function(){
	alert('Delete user!');
	//In phase2, some code will be added here to delete data in database
})





	

	



  

