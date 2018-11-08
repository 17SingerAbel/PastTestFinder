// hardcode one regular user and one admin
class person{
	constructor(username, password, type,faculty,year){
		this.username = username
		this.password = password
		this.type = type
	}

}

const regularUser = new person('user', 'user', 'user');
const adminUser = new person('admin', 'admin', 'admin');

const userArray = []
userArray.push(regularUser);
userArray.push(adminUser);


const inputArea = document.querySelector('#Login');
if(inputArea){
	inputArea.addEventListener('submit', checkExists);
}

function checkExists(e){
	e.preventDefault();
	//check wheather the user exists or not
	//check user name first
	console.log('hhh')
	var userInputName = document.querySelector('#inputUsername').value 
	console.log(userInputName)
	for (var i=0; i<userArray.length; i++ ){
		var tempName = userArray[i].username
		console.log(i)
		console.log(userInputName)
		console.log(tempName)
		if (userInputName === tempName) {			
			//check passwaord
			var userInputPassword = document.querySelector('#inputPassword').value 
			var tempPassword = userArray[i].password
			if (tempPassword === userInputPassword) {
				console.log('Find Password, exists')
				//direct to index page
				break;		
			}
			else {				
				alert('Password is not correct');
				break;
			}			
		}
		if (i === (userArray.length-1) ){
			alert('Username or Password is not correct');
		}		
	}
}



