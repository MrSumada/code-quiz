var startButtonEl = document.querySelector("#startbtn");
var startContainer = document.querySelector("#start-div");
var highScoreEl = document.querySelector("#high-score");
var timeLeft = document.querySelector("span");

var highScore = 0;
var initials = "AP";
var highScoreObj = {points: highScore, name: initials};

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

    // NEED TO ADD A TEXT BOX TO ADD INITIALS
    // LINKS TO HIGH SCORES
    // HIGH SCORES CAN 'GO BACK' or 'CLEAR HIGH SCORE'


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
        initials = submitName;
        highScore = currentScore;
        
        var savedTasks = localStorage.getItem("highScoreObj");

        console.log("Submit Name");
        // console.log(submitName);
        // console.log("initials");
        // console.log(initials);
        // console.log("currentScore");
        // console.log(currentScore);
        // console.log("highScore");
        // console.log(highScore);
        // console.log("object points");
        // console.log(highScoreObj.points);
        // console.log(highScoreObj.points + 1);

        if (highScore > highScoreObj.points) {
            highScoreObj.points = highScore;
            highScoreObj.name = initials;
            localStorage.setItem("highScoreObj", JSON.stringify(highScoreObj));
            // console.log("storage Obj");
            // console.log(highScoreObj);
            window.alert("The Current High Score is " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");
        } else {
            window.alert("The Current High Score is still " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");
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


//SAVE and LOAD HighScore

var saveScore = function() {
    localStorage.setItem("highScoreObj", JSON.stringify(highScoreObj));
};

var loadTasks = function() {
    var savedTasks = localStorage.getItem("highScoreObj");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks) {
        return false;
    }

    // parse into array of objects
    savedScore = JSON.parse(savedScore);
};

// function saveHighScore() {
//     loadTasks();
//     if (currentScore > highScoreObj.points) {
//         saveScore();
//         window.alert("The Current High Score is " + highScoreObj.points + "! Held by " + highScoreObj.name + "!");

//     } else {
//         window.alert("The Current High Score is still" + highScoreObj.points + "! Held by " + highScoreObj.name + "!");

//     }
// }

function viewHighScore() {
    window.alert("The Current High Score is " + highScore + "! Held by " + initials + "!");
};




startButtonEl.addEventListener("click", startQuiz);

highScoreEl.addEventListener("click", viewHighScore);