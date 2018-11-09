//Add a new user 
//Phase1: user cannot be added to the global array after refreshing web page, so simply just jump to login page after clicking Register button
const submitRegisterForm = document.querySelector('#registerForm');
if(submitRegisterForm){
	submitRegisterForm.addEventListener('submit', checkUserName);
}

function checkUserName(e){
	
	e.preventDefault();
	//Phase2: require data about all username from server, userArray.length will be the size of related database
	for (var i=0; i<userArray.length; i++ ){
		var tempName = userArray[i].username
		var newName = document.querySelector('#newUsername').value
		if (tempName === newName) {
			alert('Username already exists');
			break;
		}
		if(i == (userArray.length-1)) {	
			var firstPassword = document.querySelector('#newPassword').value 
			var secondPassword = document.querySelector('#password-comfirm').value 
			if (firstPassword === secondPassword){
				//direct to login page
				const newRegularUser = new person(newName, firstPassword,'user')
				userArray.push(newRegularUser);

				alert('Register Success!');
				//Phase2: after showing the "Success" alter window, add the input data to database
				//manipulated data in server 
				window.location.href = "login.html";
				break;
				
			}
			else{
				alert('Password does not match the Confirm password.');
				break;
			}
		}		
	}
}

