let score = 0;

let timer = document.getElementById("timer");
let pointsEarned = document.getElementById("currentScore");
let highScore = document.getElementById("highScore");

const questionDisplay =  document.getElementById("magicHole");

// timer.innerText = time;
pointsEarned.innerText = score;


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

let current = 0;

function running() {
	// let current = 0;
	let choosen = "";

	questionDisplay.value = questions[current].question;

	// generate buttons
	for (let i = 0; i <questions[current].choices.length; i++) {

		let buttEl = document.createElement("button");
		buttEl.innerText = questions[current].choices[i];
		buttEl.setAttribute("class", "btn btn-primary mb-2 m-1");
		buttEl.setAttribute("type", "button");
		buttEl.setAttribute("id", i);

		// appends button elements to the empty div
		buttons.append(buttEl);

		// buttons event listener
		buttEl.addEventListener("click", function() {
			console.log("clicked");
			console.log(current);
			console.log(questions[current].choices[i]);

			// removes child nodes (https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/)
			function removeAllChildNodes(buttons) {
				while (buttons.firstChild) {
					buttons.removeChild(buttons.firstChild);
				}
			}
			removeAllChildNodes(buttons);

			// points logic
			if (questions[current].choices[i] == questions[current].correct) {
				console.log("correct");
				score+=5;
				console.log(score);
				pointsEarned.innerText = score;
			// adds seconds to timer
				secondsLeft+=10;
			} else {
				console.log("wrong");
			}


			// move onto the next question
			current++;
			running();
		});
	}
}

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

starting();