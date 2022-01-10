var startButtonEl = document.querySelector("#startbtn");
var startContainer = document.querySelector("#start-div");
var timeLeft = document.querySelector("span");
var time = 30;
var questionContainerEl = document.querySelector("#question-container");
var questionNumber = 0;
var currentScore = 0
var questions = [
    {
        question: "What does DOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 2, 
    },
    {
        question: "What does MOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 3, 
    },
    {
        question: "What does LOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 1, 
    },
    {
        question: "What does ADRIAN stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 4, 
    },
    {
        question: "What does DOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 2, 
    },
    {
        question: "What does MOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 3, 
    },
    {
        question: "What does LOM stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 1, 
    },
    {
        question: "What does LAST stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 4, 
    }
];


// START QUIZ FUNCTION

function startQuiz() {

    startContainer.remove();

    countdown();

    createQuestion(questionNumber);

};


// COUNTDOWN TIMER FUNCTION

var countdown = function() {

    timeLeft.textContent = time;

    var timeCountdown = setInterval(function() {

        if (time < 2) {
            timeLeft.textContent = "";
            clearInterval(timeCountdown);
            // remove();
            score();
        } else {
        time--;
        timeLeft.textContent = time;
        };

        if (questionNumber === questions.length) {
            clearInterval(timeCountdown);
        }
    },1000);

};


// CREATE QUESTION FROM questions ARRAY FUNCTION

var createQuestion = function(questionNumberArg) {
    
    //Create New Div
    var questionDivEl = document.createElement("div");
    questionDivEl.className = "question";
    questionContainerEl.appendChild(questionDivEl);

    //Create New QUESTION
    var questionHeadingEl = document.createElement("h1");
    questionHeadingEl.textContent = questions[questionNumberArg].question;
    questionDivEl.appendChild(questionHeadingEl);

    //Create Button Div
    var choicesDivEl = document.createElement("div");
    choicesDivEl.className = "choices"
    questionDivEl.appendChild(choicesDivEl);

    //Create FOUR buttons, IF/ELSE to add Correct or Wrong IDs
    var questionChoiceEl = document.createElement("button");
    questionChoiceEl.className = "choice choice1";
    questionChoiceEl.textContent = questions[questionNumberArg].choice1;
    if (questions[questionNumberArg].correct === 1) {
        questionChoiceEl.setAttribute ("id", "correct");
    } else {
        questionChoiceEl.className += " wrong";
    };
    choicesDivEl.appendChild(questionChoiceEl);

    questionChoiceEl = document.createElement("button");
    questionChoiceEl.className = "choice choice2";
    questionChoiceEl.textContent = questions[questionNumberArg].choice2;
    if (questions[questionNumberArg].correct === 2) {
        questionChoiceEl.setAttribute ("id", "correct");
    } else {
        questionChoiceEl.className += " wrong";
    };
    choicesDivEl.appendChild(questionChoiceEl);

    questionChoiceEl = document.createElement("button");
    questionChoiceEl.className = "choice choice3";
    questionChoiceEl.textContent = questions[questionNumberArg].choice3;
    if (questions[questionNumberArg].correct === 3) {
        questionChoiceEl.setAttribute ("id", "correct");
    } else {
        questionChoiceEl.className += " wrong";
    };
    choicesDivEl.appendChild(questionChoiceEl);
    
    questionChoiceEl = document.createElement("button");
    questionChoiceEl.className = "choice choice4";
    questionChoiceEl.textContent = questions[questionNumberArg].choice4;
    if (questions[questionNumberArg].correct === 4) {
        questionChoiceEl.setAttribute ("id", "correct");
    } else {
        questionChoiceEl.className += " wrong";
    };
    choicesDivEl.appendChild(questionChoiceEl);

    //Create "Answer" Confirmation
    var answerEl = document.createElement("h3");
    answerEl.className = "answer";

    //EITHER CHOICE event listener
    var choiceEl = document.querySelector(".choice");
    choicesDivEl.addEventListener("click", function(event){

        //CORRECT or WRONG target match
        var targetEl = event.target;
        if (targetEl.matches("#correct")){
            currentScore++;
            answerEl.textContent = "Correct!";
            choicesDivEl.appendChild(answerEl);
        } 
        else if (targetEl.matches(".wrong")){
            answerEl.textContent = "Sorry! That's not right!";
            choicesDivEl.appendChild(answerEl);
            if (time >= 3) {
                time = time - 3;
            } else {
                timeLeft = "";
                score();
            };
            timeLeft.textContent = time;
        };

        //ONE SECOND DELAY to see ANSWER. THEN NEXT QUESTION or score()
        var nextQuestion = setInterval(function() {
            questionNumber++;
            questionDivEl.remove();
            if (questionNumber <= questions.length-1){
                createQuestion(questionNumber);
            } else {
                clearInterval(nextQuestion);
                console.log("Let's see the score!")
                score();
            };
            clearInterval(nextQuestion);
        },1000);
    }, {once : true});
}

startButtonEl.addEventListener("click", startQuiz);