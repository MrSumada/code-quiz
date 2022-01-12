var startButtonEl = document.querySelector("#startbtn");
var startContainer = document.querySelector("#start-div");
var highScoreEl = document.querySelector("#high-score");
var timeLeft = document.querySelector("span");

var highScoreObj = JSON.parse(localStorage.getItem("highScoreObj")) || {points: 0, name: "No One!"};

var time = 60;
var questionContainerEl = document.querySelector("#question-container");
var questionNumber = 0;
var currentScore = 0;
var questions = [
    {
        question: "What does DOM stand for?",
        choices: ["Diffuse Object Model","Document Object Model", "Diffuse Objective Model","Domestic Objective Model"],
        correct: 2, 
    },
    {
        question: "Which of the following would change an element's background to red?",
        choices: ['element.setAttribute("style", "red");','element.setAttribute("class", "background: red");', 'element.setAttribute("red");','element.setAttribute("style", "background-color: red");'],
        correct: 4, 
    },
    {
        question: "When using the setInterval() function, what unit of time is utilized for the delay?",
        choices: ["seconds","minutes", "milliseconds","rem"],
        correct: 3, 
    },
    {
        question: "Which statement best describes what is happening to data when it is persisted to local storage.",
        choices: ["The data is stored in the window called localStorage.","The data is stored under the Applications tab in Chrome Dev Tools.", "The data is stored in the database in the backend.","The data is stored in the client or browser."],
        correct: 4, 
    },
    {
        question: "Which property can you use in order to implement event delegation?",
        choices: ["event.addEventListener()","event.stopPropagation()", "event.target","event.preventDefault()"],
        correct: 3, 
    },
    {
        question: "Why do we need to convert an object into JSON in order for it to properly persist to local storage?",
        choices: ["Local storage only accepts JSON objects.","Local storage cannot read JavaScript, so we convert JavaScript into JSON.", "It is convention to store objects using JSON, and we must follow that pattern so that our code is easy to read.","Local storage can only store strings, so we convert the object to JSON to store it properly."],
        correct: 4, 
    },
    {
        question: "While creating a form, you decide that you do not want the corresponding browser actions to happen. What would you use to make this possible?",
        choices: ["event.stopAction()","event.preventDefault()", "event.stopPropagation()","event.dispatchEvent()"],
        correct: 2, 
    },
    {
        question: "Which of the following best describes a Web API?",
        choices: ["Web APIs are built into your web browser and contain methods that allow us to manipulate a web page via JavaScript.","Web APIs are a part of the JavaScript language itself and are built into your browser.", "Web APIs are low level code (say C or C++) that directly control the computer's GPU or other graphics functions.","Web APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the Web."],
        correct: 1, 
    }
];


// START QUIZ FUNCTION

function startQuiz() {

    startContainer.remove();

    countdown();

    createQuestion(questionNumber);

};

// Remove ALL children function

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

// COUNTDOWN TIMER FUNCTION

var countdown = function() {

    timeLeft.textContent = time;

    var timeCountdown = setInterval(function() {

        if (questionNumber === questions.length) {
            clearInterval(timeCountdown);
        }

        if (time < 2) {
            timeLeft.textContent = 0;
            clearInterval(timeCountdown);
            score();
        } else {
        time--;
        timeLeft.textContent = time;
        };
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

    for (var i = 0; i < 4; i++) {
    var questionChoiceEl = document.createElement("button");
    questionChoiceEl.className = "choice";
    
    questionChoiceEl.textContent = questions[questionNumberArg].choices[i];
    if (questions[questionNumberArg].correct === i + 1) {
        questionChoiceEl.setAttribute ("id", "correct");
    } else {
        questionChoiceEl.className += " wrong";
    };
    choicesDivEl.appendChild(questionChoiceEl);
    };

    //Create "Answer" Confirmation
    var answerEl = document.createElement("h3");
    answerEl.className = "answer";

    //EITHER CHOICE event listener
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
                time = 0;
                timeLeft.textContent = time;
                questionDivEl.remove();
            };
            timeLeft.textContent = time;
        };

        //ONE SECOND DELAY to see ANSWER. THEN NEXT QUESTION or score()
        var nextQuestion = setInterval(function() {
            questionNumber++;
            questionDivEl.remove();
            if (questionNumber <= questions.length-1){
                if (time > 1) {
                createQuestion(questionNumber);
                }
            } else {
                clearInterval(nextQuestion);
                if (time > 1) {
                score();
                };
            };
            clearInterval(nextQuestion);
        },1000);
    }, {once : true});
}

function score() {

    var deleteContainer = document.querySelector("#question-container");
    removeAllChildren(questionContainerEl);

    var scoreContainerEl = document.querySelector("#score-container");

    var scoreDivEl = document.createElement("div");
    scoreDivEl.className = "score";
    scoreContainerEl.appendChild(scoreDivEl);

    var scoreHeaderEl = document.createElement("h1");

    scoreHeaderEl.textContent = "You did it! Your score is " + currentScore + "!";
    scoreDivEl.appendChild(scoreHeaderEl);

    var initialsEl = document.createElement("input");
    initialsEl.className = "initials";
    initialsEl.setAttribute("type", "text");
    initialsEl.setAttribute("placeholder", "What's Your Name?");
    scoreDivEl.appendChild(initialsEl);

    var submitScore = document.createElement("button");
    submitScore.className = "submit";
    submitScore.textContent = "Submit Score?"
    scoreDivEl.appendChild(submitScore);

    var playAgain = document.createElement("button");
    playAgain.className = "again";
    playAgain.textContent = "Play Again?"
    scoreDivEl.appendChild(playAgain);

    submitScore.addEventListener("click", function(){
        var submitName = document.querySelector(".initials").value;

        if (!submitName) {
            submitName = "Ol' No Name"
        };

        if (currentScore >= highScoreObj.points) {
            highScoreObj.points = currentScore;
            highScoreObj.name = submitName;
            localStorage.setItem("highScoreObj", JSON.stringify(highScoreObj));

            window.alert("The Current High Score is " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");
        } else {
            window.alert("Your score is " + currentScore + ", but the Current High Score is still " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");
        }
        }
    );

    playAgain.addEventListener("click", function() {
        time = 30;
        currentScore = 0;
        questionNumber = 0;
        startQuiz();
        scoreDivEl.remove();

        var main = document.querySelector("main");
        var newQuestionContainerEl = document.createElement("div");
        newQuestionContainerEl.setAttribute = ("id", "question-container");
        main.appendChild(questionContainerEl);
    });
};

function viewHighScore() {
    window.alert("The Current High Score is " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");
};

startButtonEl.addEventListener("click", startQuiz);

highScoreEl.addEventListener("click", viewHighScore);