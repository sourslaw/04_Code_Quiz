
// stats and timer section
let score = 0;

// stats dom stuff
let timer = document.getElementById("timer");
let pointsEarned = document.getElementById("currentScore");
// timer.innerText = time;
pointsEarned.innerText = score;

let highScore = document.getElementById("highScore");
// queston textarea
const questionDisplay = document.getElementById("magicHole");
const messagePalace = document.getElementById("messagePalace");
// buttons
const buttons = document.querySelector("#buttons");

// questions array
// questions from (https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm)
// and (https://data-flair.training/blogs/javascript-quiz-questions/)
const questions = [
	{
		question: "Q1: Which built-in method removes the last element from an array and returns that element?",
		choices: [
			"last()",
			"get()",
			"pop()",
			"none of the above"
		],
		correct: "pop()"
	},
	{
		question: "Q2: Which built-in method returns the characters in a string beginning at the specified location?",
		choices: [
			"substr()",
			"getSubstring()",
			"slice()",
			"none of the above"
		],
		correct: "substr()"
	},
	{
		question: "Q3: Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
		choices: [
			"toSource()",
			"valueOf()",
			"toString()",
			"DeclarationOfIndependent()"
		],
		correct: "toSource()"
	},
	{
		question: "Q4: Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?",
		choices: [
			"fixed()",
			"fontcolor()",
			"fontsize()",
			"italics()"
		],
		correct: "italics()"
	},
	{
		question: "Q5: Which of the following statements will show a message as well as ask for user input in a popup?",
		choices: [
			"alert()",
			"prompt()",
			"confirm()",
			"imessage()"
		],
		correct: "prompt()"
	},
	{
		question: "Q6: What is the correct JavaScript syntax to print “Hello” in the console?",
		choices: [
			"print('Hello')",
			"console.print('Hello')",
			"log.to('Hello')",
			"console.log('Hello')"
		],
		correct: "console.log('Hello')"
	},
	{
		question: "Q7: Determine the result – String(“Hello”) === “Hello”;",
		choices: [
			"true",
			"false",
			"null",
			"booleaned"
		],
		correct: "true"
	}
];

// for index of current question in the questions array
let current = 0;
let correct = 0;

// removes child nodes (https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/)
function removeAllChildNodes(buttons) {
	while (buttons.firstChild) {
		buttons.removeChild(buttons.firstChild);
	}
};

// main function and logic
function running() {

	questionDisplay.textContent = questions[current].question;
	messagePalace.textContent = "";

	// generate buttons
	for (let i = 0; i < questions[current].choices.length; i++) {

		let buttEl = document.createElement("button");
		buttEl.innerText = questions[current].choices[i];
		buttEl.setAttribute("class", "btn btn-primary mb-2 m-1");
		buttEl.setAttribute("type", "button");
		buttEl.setAttribute("id", i);

		// appends button elements to the empty div
		buttons.append(buttEl);

		// buttons event listener
		buttEl.addEventListener("click", function() {
			console.log(`clicked, ${current}, ${questions[current].choices[i]}`);

			removeAllChildNodes(buttons);

			// points logic
			if (questions[current].choices[i] == questions[current].correct) {
				score+=10;
				console.log(`correct, ${score}`);
				pointsEarned.innerText = score;
			// adds seconds to timer
				secondsLeft+=10;
			// increments number of correct answers
				correct+=1;
			} else {
				secondsLeft-=5;
				console.log("wrong");
			};

			// move onto the next question
			current++;

			if (current == questions.length) {
				questionDisplay.textContent = `game is over. you answered ${correct} correctly. your score is ${score}`;
				console.log('bye bye');
				gameOver();
			} else {
				running();
			};
		});
	};
};

let secondsLeft = 45;

function setTime() {
	const timerInterval = setInterval(function() {
		secondsLeft--;
		timer.textContent = (`${secondsLeft} seconds`);
		
		if (secondsLeft == 0) {
			clearInterval(timerInterval);
			questionDisplay.textContent = "game over, you ran out of time . . ."
			removeAllChildNodes(buttons);
			populateTable();
			stupidButtons();
		};

		if (current == questions.length) {
			clearInterval(timerInterval);
		};

	}, 1000);
};


function starting() {
	lilHighScore()
	populateTable()
	
	questionDisplay.textContent = "Hello . . .";
	messagePalace.innerText = "Welcome to the JavaScript quiz. \n 1. correct answers are awarded 10 points and an additional 10 seconds \n2. incorrect answers result in a deduction of 5 seconds \n3. if the timer reaches 0, the game is over";

	let startButtEl = document.createElement("button");
	startButtEl.innerText = "start";
	startButtEl.setAttribute("class", "btn btn-primary mb-2 m-1");
	startButtEl.setAttribute("type", "button");
	startButtEl.setAttribute("id", "startButton");

	buttons.append(startButtEl);

	startButtEl.addEventListener("click", function() {
		startButtEl.remove();
		setTime();
		running();
	});
};

allScores = [];

function stupidButtons() {
	const highScores = document.createElement("button");
	highScores.innerText = "high scores";
	highScores.setAttribute("class", "btn btn-primary mb-2 m-1");
	highScores.setAttribute("type", "button");
	highScores.setAttribute("id", "highScores");
	highScores.setAttribute("data-bs-toggle", "modal");
	highScores.setAttribute("data-bs-target", "#scores");

	const tryAgain = document.createElement("button");
	tryAgain.innerText = "try again";
	tryAgain.setAttribute("class", "btn btn-primary mb-2 m-1");
	tryAgain.setAttribute("type", "button");
	tryAgain.setAttribute("id", "tryAgain");
	tryAgain.setAttribute("onclick", "history.go(0)");

	buttons.append(highScores, tryAgain);
};

function gameOver() {

	stupidButtons();

	// crap for high score form
	const form = document.createElement("form");
	form.setAttribute("name","form");
	form.setAttribute("id","form");

	const hsName = document.createElement("input");
    hsName.setAttribute("type", "text");
    hsName.setAttribute("name", "FullName");
	hsName.setAttribute("placeholder", "enter your name");
	
	const hsSubmit = document.createElement("button");
	hsSubmit.setAttribute("type", "submit");
	hsSubmit.innerText = "submit your score";

	// append created form field and button to page
	form.appendChild(hsName); 
	form.appendChild(hsSubmit);
	messagePalace.append(form);

	// for localStorage
	let itemsArray = localStorage.getItem('items')
		? JSON.parse(localStorage.getItem('items'))
		: []
	localStorage.setItem('items', JSON.stringify(itemsArray))

	// submit score event/button
	hsSubmit.addEventListener("click", function(event) {
		event.preventDefault();
		let scoreSet = {
			name: hsName.value,
			score: score
		};
		itemsArray.push(scoreSet);
		localStorage.setItem('items', JSON.stringify(itemsArray));

		// removes form field and button toe prevent futher submissions
		hsName.remove();
		hsSubmit.remove();

		populateTable();
	});
	// getScores();
	populateTable();
};

const data = JSON.parse(localStorage.getItem("items")) || [];

// high score display or not 
function lilHighScore() {
	let lettuce = data.sort( (a, b) => {
		return b.score - a.score;
	});
	if (data.length != 0) {
		highScore.textContent = lettuce[0]["score"];
	} else {
		highScore.textContent = "";
	};
};

function populateTable() {
	const scoreList = document.querySelector('.scoreTableBody');
	// sorts the data array of "items" (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
	data.sort( (a, b) => {
		return b.score - a.score;
	});
	// splices the array after whatever the number is
	let fart = data.splice(15);
	// writes to table element in html
	scoreList.innerHTML = data.map((row) => {
		return `<tr><td>${row.name}</td><td>${row.score}</tr>`;
	}).join('');
};

// starts
starting();