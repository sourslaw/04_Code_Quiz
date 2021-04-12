let score = 0;

const questionDisplay =  document.getElementById("magicHole");

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
	}
];


function running() {
	current = 0;
	choosen = "";

	questionDisplay.value = questions[current].question;

	// generate buttons
	for (let i = 0; i <questions[current].choices.length; i++) {

		let buttEl = document.createElement("button");
		buttEl.innerText = questions[current].choices[i];
		buttEl.setAttribute("class", "btn btn-primary mb-2 m-1");
		buttEl.setAttribute("type", "button");
		buttEl.setAttribute("id", i);

		buttEl.addEventListener("click", function() {
			console.log("clicked");
			console.log(current);
			console.log(questions[current].choices[i]);

			current++;
			questionDisplay.value = questions[current].question;
			running();
		});

		buttons.append(buttEl);	


	}
}

function next() {
	current++;

	questionDisplay.value = questions[current].question;

	// for (i=0; i < questions[current].choices.length; i++) {
	// 	buttEl.innerText = questions[current].choices[i];
		
	// }
}

running();
