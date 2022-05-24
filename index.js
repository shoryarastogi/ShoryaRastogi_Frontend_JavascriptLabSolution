
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return choice === this.answer;
};

/**
 * Create Quiz class 
 */
function Quiz(questions) {
    // number of correct answers - initially 0
    this.score = 0;
    this.questions = questions;
    // we start with the first question currently displayed in the quiz
    this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.questionIndex];
};

// checks the current question's answer 
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    // If correct, increases the score 
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }

    // Increments the questionIndex
    this.questionIndex++;
};

// checks if the quiz has ended (if the current questionIndex is 1 more than the last index in questions array)
// return true if ended and false if not
Quiz.prototype.isEnded = function () {
    // Complete the function
    return this.questions.length === this.questionIndex;
};

function showScore() {
    // display the final score 
    percentage = gradQuiz.score / gradQuiz.questions.length * 100;
    document.querySelector('#quiz').innerHTML = `
      <h1>Result</h1>
      <div id="score">You scored ${gradQuiz.score} / ${gradQuiz.questions.length}</div>
      <div id="per_score">Your percentage score is ${percentage}%</div>
    `;
}

// displays the current question and choices. Also sets up the necessary event handlers
function loadQuestion() {
    if (gradQuiz.isEnded()) {
        showScore();
        return;
    }


    // populate the current question's text

    var currentQuestion = gradQuiz.getCurrentQuestion();

    document.querySelector('#question').textContent = currentQuestion.text;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        document.getElementById('choice' + i).textContent = currentQuestion.choices[i];
        handleOptionButtonClick('btn' + i, currentQuestion.choices[i]);
    }

    showProgress();
}

// btnId = id of the button & choice is the text within that button.
function handleOptionButtonClick(btnId, choice) {
    var button = document.querySelector('#' + btnId);
    button.onclick = function () {
        gradQuiz.checkOptionWithAnswer(choice);
        loadQuestion();
    };
}

// shows the current question 
function showProgress() {
    document.querySelector('#progress').textContent = 'Question ' + (gradQuiz.questionIndex + 1) + ' of ' + gradQuiz.questions.length;
}

// questions 
var questions = [
    new Question("Which of them are closures in Javascript?", ["Variables", "Functions", "Objects", "All of the above"], "All of the above"),
    new Question("Which function is used to serialize an object into a JSON string in Javascript?", ["stringify()", "parse()", "convert()", "None of the above"], "stringify()"),
    new Question("Which keyword is used to check whether a given property is valid or not?", ["in", "is in", "exists", "lies"], "in"),
    new Question("Upon encountering empty statements, what does Javascript Interpreter do?", ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"], "Ignores the statements"),
    new Question("JavaScript is an ________ language ", ["Object-Oriented", "Object-Based", "Procedural", "None of the above"], "Object-Oriented")
];

var gradQuiz = new Quiz(questions);
loadQuestion();