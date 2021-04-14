
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


let secondsLeft = 15;

function setTime() {
	const timerInterval = setInterval(function() {
		secondsLeft--;
		timer.textContent = (`${secondsLeft} seconds`);
		
		if (secondsLeft == 0 || current == questions.length) {
			clearInterval(timerInterval);
		};
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

allScores = [];

function gameOver() {
	// create high score and reset buttons
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
	form.setAttribute("id","form");

	var hsName = document.createElement("input");
    hsName.setAttribute("type", "text");
    hsName.setAttribute("name", "FullName");
	hsName.setAttribute("placeholder", "Full Name");
	
	var hsSubmit = document.createElement("button");
	hsSubmit.setAttribute("type", "submit");
	hsSubmit.innerText = "submit";

	// append created form field and button to page
	form.appendChild(hsName); 
	form.appendChild(hsSubmit);
	buttons.append(form);

	// Testing for localStorage
	let itemsArray = localStorage.getItem('items')
		? JSON.parse(localStorage.getItem('items'))
		: []
	localStorage.setItem('items', JSON.stringify(itemsArray))
	// const data = JSON.parse(localStorage.getItem('items'))

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
	});

	// getScores();
	populateTable();
};

const ol = document.querySelector('ol')

// score table test area
const data = JSON.parse(localStorage.getItem("items")) || [];
highScore.textContent = (`${data[0].name}: ${data[0].score}`);

function populateTable() {

	const scoreList = document.querySelector('.scoretable');
	// sorts the data array of "items"
	data.sort( (a, b) => {
		return b.score - a.score;
	});
	// splices the array after whatever the number is
	data.splice(2);

	// writes to table element in html
	scoreList.innerHTML = data.map((row) => {
		return `<tr><td>${row.name}</td><td>${row.score}</tr>`;
	}).join('');
};

// starts
starting();
