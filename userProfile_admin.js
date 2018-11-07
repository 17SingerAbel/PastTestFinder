//response to buttons on user profile page

 

$(document).on('show.bs.modal','#EditProfile', function (event) {

	 var modal = $(this)
  	var fac =  $('div#FacultyName')
  	var year = $('div#yearStudy');
  	var Passw = $('div#passW');
  
  modal.find($('input#Faculty')).val(fac.text());
  modal.find( $('input#yearOfStudy')).val(year.text());
  modal.find( $('input#Password-text')).val(Passw.text());
	

})

 $(document).on('click','#EditProfile', 'btn btn-primary',function(event){
 			
			var newfac =  $('input#Faculty');
		  	var newyear = $('input#yearOfStudy');
		  	var newPassw = $('input#Password-text');

			$('div#FacultyName').html(newfac.val());
			$('div#yearStudy').html(newyear.val());
			$('div#passW').html(newPassw.val());

})

$(document).on('click', '#deleteUserButton', function(){

	console.log('delete user!')
})





	

	



  

