const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");
const questionBox = document.querySelector("#questions");
const questionEl = document.querySelector("#question");
const answerBtns = document.querySelector("#answerBtns");
const scoreEl = document.querySelector("#score");
const username = document.querySelector(".username");

let shuffle, currentQuestionI, shuffledQuestions;
let score = 0;

const startGame = () => {
	console.log("Begin the Games!!");
	console.log(username.value);
	if (username.value === "") {
		alert("Please Fill in Username Details");
	} else {
		localStorage.setItem("username", username.value);
		startBtn.classList.add("hide");
		username.classList.add("hide");

		shuffle = questions.sort(() => Math.floor(Math.random() - 0.5));
		currentQuestionI = 0;
		questionBox.classList.remove("hide");
		nextQuestion();
	}
};

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
	currentQuestionI++;
	nextQuestion();
});

const nextQuestion = () => {
	resetState();
	showQuestions(shuffle[currentQuestionI]);
};

const resetState = () => {
	clearStatusClass(document.body);
	nextBtn.classList.add("hide");
	while (answerBtns.firstChild) {
		answerBtns.removeChild(answerBtns.firstChild);
	}
};

const showQuestions = (q) => {
	questionEl.innerText = `Question: ${q.question} ?`;
	q.answers.forEach((a) => {
		const button = document.createElement("button");
		button.innerText = a.text;
		button.classList.add("btn");
		if (a.correct) {
			button.dataset.correct = a.correct;
		}

		button.addEventListener("click", selectAnswer);
		answerBtns.appendChild(button);
	});
};

const selectAnswer = (e) => {
	const selectedBtn = e.target;
	const correct = selectedBtn.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answerBtns.children).forEach((btn) => {
		setStatusClass(btn, btn.dataset.correct);
	});
	if (shuffle.length > currentQuestionI + 1) {
		nextBtn.classList.remove("hide");
	} else {
		startBtn.innerText = "Restart Game";
		startBtn.classList.remove("hide");
	}
};

const setStatusClass = (element, correct) => {
	clearStatusClass(element);
	if (correct) {
		element.classList.add("correct");
		score += 10;
		scoreEl.innerHTML = `<h2>Score: <span>${score}</span></h2>`;
	} else {
		element.classList.add("wrong");
	}
};

const clearStatusClass = (element) => {
	element.classList.remove("correct");
	element.classList.remove("wrong");
};

const questions = [
	{
		question: "2 + 2",
		answers: [
			{ text: "4", correct: true },
			{ text: "34", correct: false },
			{ text: "1", correct: false },
			{ text: "0", correct: false },
		],
	},
	{
		question: "24 * 58",
		answers: [
			{ text: "1392", correct: true },
			{ text: "2458", correct: false },
			{ text: "1391", correct: false },
			{ text: "22", correct: false },
		],
	},
	{
		question: "What does “www” stand for in a website browser?",
		answers: [
			{ text: "World Wide Web", correct: true },
			{ text: "West World Wishing", correct: false },
			{ text: "Internet is Good", correct: false },
			{ text: "Wide Web Wrestlinig", correct: false },
		],
	},
	{
		question: "How long is an Olympic swimming pool (in meters)?",
		answers: [
			{ text: "50", correct: true },
			{ text: "200", correct: false },
			{ text: "Infinty", correct: false },
			{ text: "-200", correct: false },
		],
	},
	{
		question: "What is cynophobia?",
		answers: [
			{ text: "Fear of dogs", correct: true },
			{ text: "Fear of cats", correct: false },
			{ text: "Fear of clowns", correct: false },
			{ text: "Fear of stairs", correct: false },
		],
	},
];
