/***************************************
 * API.JS i slibrary with api function *
 ***************************************/



/***************************************
 * Graph APIs
 */

async function getAllIds(username) {
/** returns all graphs id for one user */
  let response = await fetch('https://pixe.la/v1/users/' + username + '/graphs' , {
	method: 'GET',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-USER-TOKEN':'thisissecret'
}});

	let data = await response.json();

	try {
	 ids =  data.graphs.map( (graph) => graph.id );
	 await showSVG(username, ids);

	} catch (e) {
	 let message = 'There is problem on the API provider side, please repeat action !'
	 showMessage('api', 'danger', message);

	 $('#loading').empty();
	}
};

async function getGraphStats(username, habitId) {
	const url = 'https://pixe.la/v1/users/' + username + '/graphs/' + habitId + '/stats';
	
	let response = await fetch(url , {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-USER-TOKEN':'thisissecret'
	}});

try{
	let data = await response.json();
	displayStats(data);
} catch (e) {
	let message = 'ERROR with loading informations about: <strong>'+ habitId +'</strong> habit.';
	showMessage('api', 'danger', message);
}

}

function showSVG(username, habitIds) { 
/** it gets svg in linemode...
 * ! USE ONLY FOR allhabits.html
 */	
	habitIds.forEach(habitId => {
		
		let xmlHttp = new XMLHttpRequest();

		xmlHttp.open( "GET",'https://pixe.la/v1/users/'+ username +'/graphs/' + habitId + '?mode=line', false ); // false for synchronous request
		xmlHttp.send( null ); 
		
		let element =  createHabitPreview(xmlHttp.responseText, habitId);
		
		$('#svg').append(element);
		getTodays(habitId, username);
	});
	
	
	$('#loading').empty();
	$('svg').addClass('svgStyles');
};

async function getGraphUnit(username, habitId) {
	/** returns unit for one graph */

	const url = 'https://pixe.la/v1/users/' + username + '/graphs/' + habitId + '/graph-def';
	
		let response = await fetch(url , {
    	method: 'GET',
    	headers: {
     		'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-USER-TOKEN':'thisissecret'
  	}});

	try{
		let data = await response.json();
		// console.log(data);
		displayUnit(data.unit);
	

	} catch (e) {
		let message = 'ERROR with loading informations about: <strong>'+ habitId +'</strong> habit.';
		showMessage('api', 'danger', message);
	}
};

function showSVGByType(username, habitId, type, targetElement) { 
	let xmlHttp = new XMLHttpRequest();
	
	xmlHttp.open( "GET",'https://pixe.la/v1/users/'+ username +'/graphs/' + habitId + '?mode=' + type, false ); // false for synchronous request
	xmlHttp.send( null ); 
	

	$('#' + targetElement).append(xmlHttp.responseText);
	$('svg').addClass('svgStyles');
};


async function getTodays(habitId, username) {
	console.log('inside get Today')
	const url = 'https://pixe.la/v1/users/' + username + '/graphs/' + habitId + '/stats';

	let response = await fetch(url , {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-USER-TOKEN':'thisissecret'
	}});

	try{
		let data = await response.json();
		console.log(data);
		displayToday(data.todaysQuantity, habitId);
	} catch (e) {
		let message = 'ERROR with loading informations about: <strong>'+ habitId +'</strong> habit.';
		showMessage('api', 'danger', message);
	}
}



/***************************************
 * PIXELS APIs
 */


function updatePixelByOne(username, graphId, option) {
	/** up or down one pixel */
	fetch('https://pixe.la/v1/users/' +  username + '/graphs/' + graphId + '/' + option , {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-USER-TOKEN':'thisissecret'
		}
	})
	.then(response => response.json())
	.then(response => {
		if (JSON.stringify(response.isSuccess) == 'false'){
			let message = 'Could not increment or decrement Your habit, reload page and try again';
			showMessage('api', 'danger', message);
		}else {
			let message = 'Habit: <strong>'+ graphId +'</strong> was ' + option;
			showMessage('api', 'success', message);
		}
	});
};




async function updatePixel(username, habitId, amount) {
	let date = getDate();

	await fetch('https://pixe.la/v1/users/' +  username + '/graphs/' + habitId + '/' + date , {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-USER-TOKEN':'thisissecret'
		},
		body: JSON.stringify({ 
		"quantity": amount,
		})
	})
	.then(response => response.json())
	.then(response => {
		if (JSON.stringify(response.isSuccess) == 'false'){
			console.log(response);
			let message = response.message;
			showMessage('api', 'warning', message);
		}else {
			let message = 'Habit: <strong>'+ habitId +'</strong> was set to <strong>' + amount +'</strong>';
			showMessage('api', 'success', message);
		}
	});
}

/************************************************
 * USER
 */
function createUser(username) {
	fetch('https://pixe.la/v1/users/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			
		},
		body: JSON.stringify({ 
		"token": "thisissecret",
		"username": username,
		"agreeTermsOfService":"yes",
		"notMinor":"yes"
		})
	})
	.then(response => response.json())
	.then(response => {
		if (JSON.stringify(response.isSuccess) == 'false'){
			console.log(response);
			let message = response.message;
			showMessage('api', 'warning', message);
		}else {
			let message = 'User: <strong>'+ username +'</strong> was created, you can now log in';
			showMessage('api', 'success', message);
		}
	});
}

function userExists(username) {
	fetch('https://pixe.la/v1/users/'+ username + '/graphs', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-USER-TOKEN':'thisissecret'
		},
	})
	.then(response => response.json())
	.then(response => {
		if (JSON.stringify(response.isSuccess) == 'false'){
			console.log(response);
			let message = response.message;
			showMessage('api', 'warning', message);
			// console.log('false');
			return false;
		}else{
			let message = 'You Are logged as <strong>'+ username +'</strong>';
			showMessage('api', 'success', message);
			// console.log('true');
			localStorage.setItem('username', username)

			loadPage();

		}
	});
}
