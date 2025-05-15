var questions = [
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        answers: [
            { option: "let", correct: false },
            { option: "const", correct: true },
            { option: "var", correct: false },
            { option: "define", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { option: "Microsoft", correct: false },
            { option: "Netscape", correct: true },
            { option: "Google", correct: false },
            { option: "Oracle", correct: false }
        ]
    },
    {
        question: "What does `NaN` stand for?",
        answers: [
            { option: "No assigned number", correct: false },
            { option: "Not a Null", correct: false },
            { option: "Not a Number", correct: true },
            { option: "Negative and Null", correct: false }
        ]
    },
    {
        question: "Which method is used to convert JSON to a JavaScript object?",
        answers: [
            { option: "JSON.parse()", correct: true },
            { option: "JSON.stringify()", correct: false },
            { option: "JSON.convert()", correct: false },
            { option: "JSON.toObject()", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { option: "//", correct: true },
            { option: "<!-->", correct: false },
            { option: "#", correct: false },
            { option: "/* */", correct: false }
        ]
    },
    {
        question: "What is the output of `typeof null` in JavaScript?",
        answers: [
            { option: "null", correct: false },
            { option: "object", correct: true },
            { option: "undefined", correct: false },
            { option: "boolean", correct: false }
        ]
    },
    {
        question: "Which method adds one or more elements to the end of an array?",
        answers: [
            { option: "push()", correct: true },
            { option: "pop()", correct: false },
            { option: "shift()", correct: false },
            { option: "unshift()", correct: false }
        ]
    },
    {
        question: "What will `2 + '2'` return in JavaScript?",
        answers: [
            { option: "4", correct: false },
            { option: "22", correct: true },
            { option: "NaN", correct: false },
            { option: "Error", correct: false }
        ]
    },
    {
        question: "Which scope is NOT available in JavaScript?",
        answers: [
            { option: "Global", correct: false },
            { option: "Function", correct: false },
            { option: "Block", correct: false },
            { option: "Module", correct: true }
        ]
    },
    {
        question: "What does the `===` operator do?",
        answers: [
            { option: "Checks value only", correct: false },
            { option: "Checks value and type", correct: true },
            { option: "Assigns a value", correct: false },
            { option: "Compares only types", correct: false }
        ]
    }
];
var questionElement = document.getElementById('question');
var nextBtn = document.getElementById('next-btn');
var currentQuestionIndex = 0;
var score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (nextBtn) {
        nextBtn.innerHTML = "Next";
    }
    showQuestion();
}
function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    var questionHTML = "\n        <h2>".concat(questionNo, ". ").concat(currentQuestion.question, "</h2>\n        <div id=\"answer-buttons\">\n            ").concat(currentQuestion.answers.map(function (answer) { return "\n                <button class=\"btn\" data-correct=\"".concat(answer.correct, "\">").concat(answer.option, "</button>\n            "); }).join(''), "\n        </div>\n    ");
    questionElement.innerHTML = questionHTML;
    var answerButtons = document.getElementById('answer-buttons');
    var buttons = answerButtons.querySelectorAll('.btn');
    buttons.forEach(function (button) {
        button.addEventListener("click", selectAnswer);
    });
    nextBtn.style.display = "none";
}
function resetState() {
    nextBtn.style.display = "none";
    questionElement.innerHTML = "";
}
function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    var answerButtons = document.getElementById('answer-buttons');
    Array.from(answerButtons.children).forEach(function (child) {
        var button = child;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = "<h2>You scored ".concat(score, " out of ").concat(questions.length, "!</h2>");
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextBtn.addEventListener('click', function () {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();
