// Attrb - http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/*Creates the main table */
function createOutsideTable() {
	var main = document.getElementById("main");
	var table = document.createElement("table");
		var row = document.createElement("tr");
	main.appendChild(table);
		var cell = document.createElement("td");
	table.appendChild(row);
	row.appendChild(cell);
	createHoursTable(cell);
	for (var i = 0; i < 7; i++) {

	}

	var tuesday = document.getElementById("tuesday");
	td.innerHTML = "...";
	tuesday.appendChild(tbl);
}

//create a table
function tableCreate() {
	var main = document.getElementById("main");
	var tbl = document.createElement('table');
	tbl.style.width = '100%';

	var tr = tbl.insertRow();
	main.appendChild(tbl);
	for (var i = 0; i < 7; i++) {

		var td;
		tr.appendChild(td);
	}

}

/* create a 24 cell table for a specific day */
function createDayTable() {


	for ( j = 0; j < 24; j++) {
		var row = document.createElement('tr');
		innerTable.appendChild(row);
		var cell = row.insertCell();
	}
	td.appendChild(innerTable);
}


//declare variables
var currentCell,
	durationHour,
	currentEditLeft,
	currentEditTop,
	currentEditWidth,
	currentEditHeight,
	normal = true;

function expandTables() {
	var hoursTable = document.getElementById("hours");
	var monday = document.getElementById("monday");
	var tuesday = document.getElementById("tuesday");
	var wednesday = document.getElementById("wednesday");
	var thursday = document.getElementById("thursday");
	var friday = document.getElementById("friday");
	var saturday = document.getElementById("saturday");
	var sunday = document.getElementById("sunday");

	expandHours(hoursTable);
	expandTable(monday);
	expandTable(tuesday);
	expandTable(wednesday);
	expandTable(thursday);
	expandTable(friday);
	expandTable(saturday);
	expandTable(sunday);
}

/* expand the hours table */
function expandHours(hoursTable) {
	createHeading(hoursTable);
	createHours(hoursTable);
}

/* Creates headings and the rows which extend from them */
function createHeading(table) {
	var row = document.createElement('tr');
	table.appendChild(row);
	var heading = document.createElement('th');
	row.appendChild(heading);
	heading.innerHTML = capitalise(table.id); // Used capitalise function to prettify table names
	//console.log(typeof table.id)
}

/* Creates the hours table and allows dependent columns to be created */
function createHours(table) {
	for (var i = 0; i < 24; i++) {
		var row = document.createElement('tr');
		table.appendChild(row);
		var cell = row.insertCell();
		var div = document.createElement("div");
		cell.appendChild(div);
		div.style.overflow = "auto";
		div.appendChild(document.createElement("br"));
		cell.style.border = "1px solid black";
		cell.style.height = "24px";
		cell.innerHTML = i + ":00";
	}
}

/* allows sub-tables to extend from hours table */
function expandTable(table) {
	createHeading(table);
	for (var i = 0; i < 24; i++) {
		var row = document.createElement("tr");
		table.appendChild(row);
		var cell = document.createElement("td");
		row.appendChild(cell);
		cell.className = i;
		cell.addEventListener("click", displayForm);
		cell.style.border = "1px solid black";
		cell.rowspan = "2";
		var div = document.createElement("div");
		cell.appendChild(div);
		div.style.height = "24px";
		div.style.width = window.innerWidth / 8 + "px";
		div.style.overflow = "auto";
		//creating br element eliminates some location bugs
		div.appendChild(document.createElement("br"));

	}
}

/*  Display a form as well as defining width */
function displayForm() {
	document.getElementById("mainBox").style.visibility = "visible";
	var formDiv = document.getElementById("formDiv");
	formDiv.style.visibility = "visible";
	currentCell = this;
	var box = document.getElementById("details");
	box.cols = (window.innerWidth * 0.9) / 10;
	var startTime = document.getElementById("startTime");
	var endTime = document.getElementById("endTime");
	document.getElementById("duration").value = "01:00";
	var startHour = currentCell.className;
	var endHour = parseInt(currentCell.className) + 1;

	if (startHour < 8) {
		startTime.value = "0" + startHour + ":00";
		endTime.value = "0" + endHour + ":00";
	} else if (startHour == 12) {
		startTime.value = "0" + startHour + ":00";
		endTime.value = endHour + ":00";
	} else {
		startTime.value = startHour + ":00";
		endTime.value = endHour + ":00";
	}

}

/* Invoked by the cancel button on the input form */
function enterDetails(form) {
	var details = form.details.value;
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;
	var duration = document.getElementById("duration").value;
	var split = duration.split(":");
	durationHour = parseInt(0);
	durationMinutes = parseInt(split[0]);
	("0" + durationHour).slice(-2);

	if (durationInHours() > 8) {
		durationError.innerText = " Duration must be 8 hours or less. ";
		return;
	}

	if (endTime < startTime) {
		durationError.innerText = " Appointments cannot extend to multiple days. ";
	
		return;
	}

	var appointment = document.createElement("div");
	var appointments = document.getElementById("appointments");
	appointments.appendChild(appointment);
	appointment.className = "appointment";
	
	appointment.addEventListener('mouseover', mouseEnter(displayImages), true);
	appointment.addEventListener('mouseout', mouseEnter(removeImages), true);
	if (normal === true) {

		appointment.style.left = currentCell.getBoundingClientRect().left + "px";
		appointment.style.top = currentCell.getBoundingClientRect().top + "px";
		appointment.style.width = (currentCell.getBoundingClientRect().right - currentCell.getBoundingClientRect().left) + "px";
		appointment.style.height = (((currentCell.getBoundingClientRect().bottom - currentCell.getBoundingClientRect().top) * durationInHours())) + "px";

	} else {
		appointment.style.left = currentEditLeft;
		appointment.style.top = currentEditTop;
		appointment.style.width = currentEditWidth;
		appointment.style.height = currentEditHeight;
		normal = true;
	}
	appointment.setAttribute("data-startTime", startTime);
	appointment.setAttribute("data-endTime", endTime);
	appointment.setAttribute("data-details", details);
	appointment.innerHTML = appointment.getAttribute("data-startTime") + " - " + appointment.getAttribute("data-endTime") + " " + appointment.getAttribute("data-details");
	appointment.style.background = colour.value;

	var rect2;
	rect2 = appointment.getBoundingClientRect();
	
	if (inputIsValid(form)) {
		document.getElementById("formDiv").style.visibility = "hidden";
		document.getElementById("mainBox").style.visibility = "hidden";
		durationError.innerText = "";
		warningMessage.innerText = "";
		form.details.value = "";
	} else {
		appointments.removeChild(appointment);
	}
	
	/* all below was added from cancel button 
	and should ensure the form closes after creation*/
	document.getElementById("coverDiv").style.visibility = "hidden";
	document.getElementById("formDiv").style.visibility = "hidden";
	durationError.innerText = "";
	warningMessage.innerText = "";
	form.details.value = "";

}


/* allows divisibility of time periods */
function durationInHours() {
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;
	var duration = document.getElementById("duration").value;
	var endSplit = endTime.split(":");
	var startSplit = startTime.split(":");
	durationHour = parseInt(endTime) - parseInt(startTime);
	durationMinutes = parseInt(endSplit[1]) - parseInt(startSplit[1]);
	return durationHour + (durationMinutes / 60);
}

/* checks for valid input */
function inputIsValid(form) {
	var details = form.details.value;
	var startTime = document.getElementById("startTime").value;
	var endTime = document.getElementById("endTime").value;
	var duration = document.getElementById("duration").value;
	var warningMessage = document.getElementById("warningMessage");
	if (details == "") {
		warningMessage.innerText = "Enter relevant details. ";
	}
	if (duration == "") {
		durationError.innerText = " Enter appointment length. ";
	}
	if (endTime == "") {
		durationError.innerText = " Enter appointment length. ";
	}
	return details != "" && startTime != "" && endTime != "";

}


/*Rectangle overlaps seem to work with or without this method, though bugs seem more common without it*/
function rectangleOverlap(rect1, rect2) {
	var overlap = !(rect1.right <= rect2.left || rect1.left >= rect2.right || rect1.bottom <= rect2.top || rect1.top >= rect2.bottom);
	
	return overlap;
}

/*invoked by the cancel button on the input form */
function closeForm(form) {
	document.getElementById("mainBox").style.visibility = "hidden";
	document.getElementById("formDiv").style.visibility = "hidden";
	durationError.innerText = "";
	warningMessage.innerText = "";
	form.details.value = "";
}

/*Events cannot even be created without this function*/
function displayImages() {

	this.innerHTML = this.getAttribute("data-startTime") + " - " + this.getAttribute("data-endTime") + " " + this.getAttribute("data-details") + '<span class="pencil_icon" id="edit" onclick="editAppointment(this.parentNode)"></span> <span class="x_icon" id="close" onclick="removeAppointment(this.parentNode)"></span>';
}

/* Events also cannot be created without this */
function removeImages() {
	this.innerHTML = this.getAttribute("data-startTime") + " - " + this.getAttribute("data-endTime") + " " + this.getAttribute("data-details");
}

/*Required for createButton's onClick to work*/
function mouseEnter(_fn) {
	return function(_evt) {
		var relTarget = _evt.relatedTarget;
		if (this === relTarget || isAChildOf(this, relTarget)) {
			return;
		}

		_fn.call(this, _evt);
	};
}

/* allows the creation of multiple events, instead of stopping at one */
function isAChildOf(_parent, _child) {
	if (_parent === _child) {
		return false;
	}
	while (_child && _child !== _parent) {
		_child = _child.parentNode;
	}

	return _child === _parent;
}



/* edit selected appointment (onClick functionality of the edit button) */
//based heavily on code provided to me by Brendan Kehoe
function editAppointment(appointment) {
	currentCell = appointment;

	currentEditLeft = currentCell.getBoundingClientRect().left + "px";
	currentEditTop = currentCell.getBoundingClientRect().top + "px";
	currentEditWidth = (currentCell.getBoundingClientRect().right - currentCell.getBoundingClientRect().left) + "px";
	currentEditHeight = ((currentCell.getBoundingClientRect().bottom - currentCell.getBoundingClientRect().top) * durationInHours()) + "px";

	var appointments = document.getElementById("appointments");
	appointments.removeChild(appointment);
	var box = document.getElementById("details");
	box.cols = (window.innerWidth * 0.9) / 12;
	var startTime = document.getElementById("startTime");
	var endTime = document.getElementById("endTime");
	startTime.value = appointment.getAttribute("data-startTime");

	endTime.value = appointment.getAttribute("data-endTime");
	box.value = appointment.getAttribute("data-details");

	document.getElementById("mainBox").style.visibility = "visible";
	var formDiv = document.getElementById("formDiv");
	formDiv.style.visibility = "visible";

	var rect2 = appointments.children[0].getBoundingClientRect();
	normal = false;

	
}

/*removes selected appointment (onClick functionality of delete button)*/
function removeAppointment(appointment) {
	appointment.parentNode.removeChild(appointment);
}


