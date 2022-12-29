const showMessage = (elementClass, messageType, message) => {
	let element = `
	<div class="`+ elementClass + ` alert alert-`+ messageType +` alert-dismissible fade show" role="alert">
		<div>
			<button type="button" onclick="removeElement('`+ elementClass +`')" class=" btn btn-`+ messageType +` pr-4" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
			</button>
			`+ message +`
		</div>	
	</div>
	`;
	$('#messageBox').append(element);
}

const createUrl = (id) => {
	return new URL('https://esotemp.vse.cz/~mict11/Habit/index.html?habit=' + id);
} 

const createHabitPreview = (svg, habitId) => {
	let url = createUrl(habitId);
	let preview = `
	
	<div class="container">
	<hr>
		<div class="row">
		  <div class="col-4">
				<div class="row">
					<h2> <a class="link-dark habitTitle" href="`+ url.href +`">`+ habitId +` </a> </h2>
				</div>
				<div class="row">
					<div class="col-12">
						<button type="button" onclick="editPixel('`+ habitId +`', 'increment')" class="btn btn-outline-secondary btn-block">+1</button>
						<button type="button" onclick="editPixel('`+ habitId +`', 'decrement')" class="btn btn-outline-danger btn-block">-1</button>
					</div>
				</div>
			</div>
			<div class="col-8">
			  <div class="row">
					`+ svg +`
				</div>
				<div id="today-`+habitId+`" class="row"></div>
			</div>
		</div>			
	</div>	
	`;

	return preview;
}

const createUserLoginForm = () => {
	return `
	<h2>Log in</h2>
	<div id="create" class="row row-cols-lg-auto g-3 align-items-center">
  
	<div class="col-12">
    <label class="" for="username">Username:</label>
    <div class="input-group">
      <input type="text" class="form-control" id="username" placeholder="enter your username">
    </div>
  </div>
  <div class="col-12">
    <button type="submit" onclick="logMeIn()" class="btn btn-primary">Log me in!</button>
  </div>
</div>
	`;
}

const createUserRegisterForm = () => {
	return `
	<h2>Registration</h2>
	<div id="create" class="row row-cols-lg-auto g-3 align-items-center">
  
	<div class="col-12">
    <label class="" for="username">Username:</label>
    <div class="input-group">
      <input type="text" class="form-control" id="username" placeholder="enter your username">
    </div>
  </div>
  <div class="col-12">
    <button type="submit" onclick="registerMe()" class="btn btn-primary">Register me!</button>
  </div>
</div>
	`;
}
const getDate = () => {
  const date = new Date();

	let yyyy = date.getFullYear();
	let mm = date.getUTCMonth() + 1; // 0 is january like wtf 
	let dd = date.getUTCDate();



	return `${yyyy}${mm}${dd}`;
}

const removeElement = (elementClass) => {
	$('.'+elementClass).remove();
}

const clearSelectedElements = (array) => {
  array.forEach(element => {
		$('#' + element).empty();
  });
}

const clearElement = (elementId) => {
	$('#' + elementId).empty();
}

const appendElement = (targetId, element) => {
	$('#' + targetId).append(element);

}

const displayStats = (data) => {
	appendElement('totalQuantity', '<p class="definition"><strong>Total: &emsp; </strong>' + data.totalQuantity + '</p>');
	appendElement('maxQuantity', '<p class="definition"><strong>Max: &emsp; </strong>' + data.maxQuantity+ '</p>');
	appendElement('minQuantity', '<p class="definition"><strong>Min: &emsp; </strong>' + data.minQuantity+ '</p>');
	appendElement('avgQuantity','<p class="definition"><strong>Avg: &emsp; </strong>' + data.avgQuantity+ '</p>');
	appendElement('todaysQuantity','<p class="definition today"><strong>Today: &emsp; </strong>' + data.todaysQuantity+ '</p>');
	appendElement('totalPixelsCount','<p class="definition"><strong>Days: &emsp; </strong>' + data.totalPixelsCount+ '</p>');
}

const displayUnit = (unit) => {
	appendElement('unit', '<p class="definition"><strong>Unit: &emsp; </strong>' + unit+ '</p>');
}
const displayToday = (data, habitid) => {
	console.log(data);
	let element = '<p class="definition pt-3"><strong>Today: &emsp; </strong>' + data + '</p>'
	$('#today-'+habitid).append(element);
}
