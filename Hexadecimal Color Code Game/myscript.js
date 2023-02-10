let colorSample = null; // the color sample element
let answers = []; // array of answer elements
let correctColorCode = null;// color code of actual color sample
let score = 0; // number of correct answers
let total = 0; // total number of questions
let options = 0; // answer options in the game
let level = 1; // level of game
let gametype = null;

// initialize page
window.onload = function () {
	
	colorSample = document.getElementById("colorSample");
	
	// initialize array of elements with all possible answers
	answers.push(document.getElementById("a"));
	answers.push(document.getElementById("b"));
	answers.push(document.getElementById("c"));
	answers.push(document.getElementById("d"));
	answers.push(document.getElementById("e"));
	answers.push(document.getElementById("f"));
	answers.push(document.getElementById("g"));
	answers.push(document.getElementById("h"));
	console.log(answers);
	
	// add onclick events to all possible answers
	for (let i = 0; i < answers.length; i++) {
		answers[i].addEventListener('click', function () {
			markIt(this);
		});
	}
	
	openlightbox();
	
};

function openlightbox() {
	
	let code = document.getElementById("code");
	let color = document.getElementById("color");
	
	document.getElementById("lightbox").style.display = "block";
	
	options = 0;
	level = 1;
	
	code.addEventListener('click', function() { 
		gametype = "code";
		gamestart();
	});
	
	color.addEventListener('click', function() {
		gametype = "color";
		gamestart();
	});
	
}

function gamestart() {
	
	score = 0;
	total = 0;
	
	document.getElementById("lightbox").style.display = "none";
	document.getElementById("score").innerHTML = "";
	
	console.log(gametype);
	if (gametype == "code") {
		document.getElementById("title").innerHTML = "What is the color code for this color?";
	}
	
	else {
		document.getElementById("title").innerHTML = "What is the color for this color code?";
	}
	
	document.getElementById("level").innerHTML = "Level: " + level;
	
	console.log(level);
	switch (level) {
		
		case 1:
			options = 2;
			break;
			
		case 2:
			options = 4;
			break;
			
		default:
			options = 8;
			break;
		
	}
	
	// add onclick events to all possible answers
	for (let i = 0; i < answers.length; i++) {
		
		if (i < options) {
			answers[i].style.display = "block";
		}
		
		else {
			answers[i].style.display = "none";
		}
		
	}
	
	// Load a new question
	loadNewQuestion();
	
}

// marks current question
function markIt(elem) {
	
	let gotItRight = false;
	total++;
	
	console.log("Comparing " + elem.innerHTML + " to " + correctColorCode);
	if (elem.innerHTML == correctColorCode) {
		score++;
		gotItRight = true;
	}
	
	document.getElementById("score").innerHTML = score + " / " + total;
	
	window.setTimeout(function() {
		
		if (gotItRight) {
			colorSample.innerHTML += "<br>Correct!";
		}
		
		else {
			colorSample.innerHTML += "<br>Incorrect";
		}
		
	}, 100);
	
	window.setTimeout(function () {
		loadNewQuestion();
	}, 1300);
	
}

// Load a new question
function loadNewQuestion() {
	
	if (total == 10) {
		
		if (level != 3) {
			
			level++;
			gamestart();
			
		}
		
		else {
			openlightbox();
		}
	}
	
	// set color of colorSample
	let colorCode = getRandomHexCode();
	colorSample.innerHTML = "";
	
	if (gametype == "code") {
		colorSample.innerHTML = "";
		colorSample.style.backgroundColor = colorCode;
	}
	
	else {
		colorSample.style.backgroundColor = "white";
		colorSample.innerHTML = colorCode;
	}
	
		correctColorCode = colorCode;
	
		console.log("Answer: " + colorCode);
	
	// pick a random location for correct answer
	let solution = Math.floor(Math.random() * options);
	for (let i = 0; i < options; i++) {
		
		let randomColor = getRandomHexCode();
		
		if (i == solution) {
			answers[i].innerHTML = colorCode;
		}
		
		else {
			answers[i].innerHTML = randomColor;
		}
		
		if (gametype == "code") {
			answers[i].style.backgroundColor = "white";
			answers[i].style.color = "black";
		}
		
		else {
			answers[i].style.backgroundColor = randomColor;
			answers[i].style.color = randomColor;
		}
	}
	
} // LoadNewQuestion

// create random hex code
function getRandomHexCode() {
	
	let result = []; // final code
	let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	
	result.push("#");
	
	for (let n = 0; n < 6; n++) {
		result.push(hexRef[Math.floor(Math.random() * 16)]);
	}
	
	console.log (result.join(''));
	return result.join(''); // #rrggbb
	
} // getRandomHexCode

function cheatmode(userSelect) {
	
	for (let i = 0; i < answers.length ; i++) {
		
		if(userSelect == true) {
			answers[i].style.userSelect = "auto";
		}
		
		else {
			answers[i].style.userSelect = "none";
		}
		
	}
	
}