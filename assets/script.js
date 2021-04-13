
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
// buttons
const buttons = document.querySelector("#buttons");

// questions array
const questions = [
	{
		question: "Q1: Who came up with theory of relativity?",
		choices: [
			"Sir Isaac Newton",
			"Nicolaus Copernicus",
			"Albert Einstein",
			"Ralph Waldo Emmerson"
		],
		correct: "Albert Einstein"
	},
	{
		question: "Q2: Who is on the two dollar bill?",
		choices: [
			"Thomas Jefferson",
			"Dwight D. Eisenhower",
			"Benjamin Franklin",
			"Abraham Lincoln"
		],
		correct: "Thomas Jefferson"
	},
	{
		question: "Q3: What event began on April 12, 1861?",
		choices: [
			"First manned flight",
			"California became a state",
			"American Civil War began",
			"Declaration of Independence"
		],
		correct: "American Civil War began"
	},
	{
		question: "Q4: True or False",
		choices: [
			"True",
			"False",
		],
		correct: "True"
	}
];

// for index of current question in the questions array
let current = 0;
// main function and logic
function running() {

	questionDisplay.value = questions[current].question;

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

			// removes child nodes (https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/)
			function removeAllChildNodes(buttons) {
				while (buttons.firstChild) {
					buttons.removeChild(buttons.firstChild);
				}
			}
			removeAllChildNodes(buttons);

			// points logic
			if (questions[current].choices[i] == questions[current].correct) {
				score+=5;
				console.log(`correct, ${score}`);
				pointsEarned.innerText = score;
			// adds seconds to timer
				secondsLeft+=10;
			} else {
				console.log("wrong");
			};

			// move onto the next question
			current++;

			if (current == questions.length) {
				// questionDisplay.value = "game is over";
				questionDisplay.value = `game is over. your score is ${score}`;
				
				console.log('bye bye');
				gameOver();
			} else {
				running();
			};

		});
	};
};


let secondsLeft = 205;

function setTime() {
	const timerInterval = setInterval(function() {
		if (secondsLeft > 0) {
			secondsLeft--;
			timer.textContent = (`${secondsLeft} seconds`);
		} else {
		clearInterval(timerInterval);
	  }
	}, 1000);
}

function starting() {
	questionDisplay.value = "welcome";

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

function gameOver() {

	let highScores = document.createElement("button");
	highScores.innerText = "high scores";
	highScores.setAttribute("class", "btn btn-primary mb-2 m-1");
	highScores.setAttribute("type", "button");
	highScores.setAttribute("id", "highScores");
	highScores.setAttribute("data-bs-toggle", "modal");
	highScores.setAttribute("data-bs-target", "#scores");

	let tryAgain = document.createElement("button");
	tryAgain.innerText = "try again";
	tryAgain.setAttribute("class", "btn btn-primary mb-2 m-1");
	tryAgain.setAttribute("type", "button");
	tryAgain.setAttribute("id", "tryAgain");
	tryAgain.setAttribute("onclick", "history.go(0)");

	buttons.append(highScores, tryAgain);

	// crap for high score form
	var form = document.createElement("form");
	form.setAttribute("name","form");
	// form.setAttribute("action","");
	// form.setAttribute("onsubmit");

	var FN = document.createElement("input");
    FN.setAttribute("type", "text");
    FN.setAttribute("name", "FullName");
    FN.setAttribute("placeholder", "Full Name");

	var s = document.createElement("button");
	s.setAttribute("type", "submit");
	// s.setAttribute("value", "Submit");
	s.innerText = "submit";

	form.appendChild(FN); 
	form.appendChild(s);

	// questionDisplay.append(form);
	buttons.append(form);

}

starting();