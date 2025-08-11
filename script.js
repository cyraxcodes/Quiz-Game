// DOM Elements 

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the most powerful ability in Valorant?",
        answers: [
            { text: "Jett's Dash", correct: false },
            { text: "Sova's recon dart", correct: false },
            { text: "Alt+F4", correct: true },
            { text: "Buying an Operator", correct: false },
        ], 
    },
    {
        question: "Which agent has got the biggest gyat?",
        answers: [
            { text: "Brimstone", correct: true },
            { text: "Reyna", correct: false },
            { text: "Jett", correct: false },
            { text: "Sage", correct: false },
        ], 
    },
    {
        question: "Whose iconic line is this \"Noden Papaja\"?",
        answers: [
            { text: "Sage", correct: false },
            { text: "Breach", correct: false },
            { text: "Tejo", correct: true },
            { text: "Breach", correct: false },
        ], 
    },
    {
        question: "What's the best way to end a match?",
        answers: [
            { text: "Type ggwp", correct: false },
            { text: "Be toxic and type kal ana bkl", correct: true },
            { text: "Nothing, go to lobby", correct: false },
            { text: "Exit to desktop", correct: false },
        ], 
    },
    {
        question: "What’s the best way to assert dominance in Valorant?",
        answers: [
            { text: "Top frag", correct: false },
            { text: "Spam jump peek", correct: false },
            { text: "Kill with classic", correct: false },
            { text: "Teabag every kill", correct: true },

        ], 
    },
];

// Quiz State Vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    console.log("Quiz Started");
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex + 1)/quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");


        // what is a dataset? it is a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct;
        
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){
    // optimization check
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else if (button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score ++;
        scoreSpan.textContent = score;
    }
    
    setTimeout(() => {
        currentQuestionIndex ++;

        // checks if there are more questions
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }
        else {
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if (percentage === 100){
        resultMessage.textContent = "You're Radiant!";
    }
    if (percentage >= 50){
        resultMessage.textContent = "You're Diamond.";
    }
    else {
        resultMessage.textContent = "You need to hit the range.";
    }
}

function restartQuiz() {
    console.log("Quiz Re-started");

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");

}
