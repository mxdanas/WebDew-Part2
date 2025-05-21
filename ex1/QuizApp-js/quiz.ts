interface Answer{
    option:string;
    correct: boolean;
}
interface Question {
    question: string;
    answers: Answer[];
}
const questions :Question[] = [
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

const questionElement = document.getElementById('question')as HTMLElement;
const nextBtn  = document.getElementById('next-btn') as HTMLButtonElement;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz():void {
    currentQuestionIndex = 0;
    score = 0;
    if (nextBtn) {
        nextBtn.innerHTML = "Next";
      }
    showQuestion();
}
function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;

    const questionHTML = `
        <h2>${questionNo}. ${currentQuestion.question}</h2>
        <div id="answer-buttons">
            ${currentQuestion.answers.map(answer => `
                <button class="btn" data-correct="${answer.correct}">${answer.option}</button>
            `).join('')}
        </div>
    `;

    questionElement.innerHTML = questionHTML;

    const answerButtons = document.getElementById('answer-buttons') as HTMLButtonElement;
    const buttons = answerButtons.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener("click", selectAnswer);
    });

    nextBtn.style.display = "none";
}

function resetState(): void{
    nextBtn.style.display = "none";
    questionElement.innerHTML = "";
}
function selectAnswer(e:Event):void{
    const selectedBtn = e.target as HTMLButtonElement;
    const isCorrect :boolean = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    const answerButtons = document.getElementById('answer-buttons')as HTMLDivElement;
    Array.from(answerButtons.children).forEach(child => {
        const button = child as HTMLButtonElement;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

function showScore() :void {
    resetState();
    questionElement.innerHTML = `<h2>You scored ${score} out of ${questions.length}!</h2>`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextButton() :void {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
