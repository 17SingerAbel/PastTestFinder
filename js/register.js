
const submitRegisterForm = document.querySelector('#registerForm');
if(submitRegisterForm){
	submitRegisterForm.addEventListener('submit', checkUserName);
}


function checkUserName(e){
	
	e.preventDefault();

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
				
				console.log(userArray.length)
				console.log(userArray[userArray.length-1].username)

				alert('Register Success!');
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

