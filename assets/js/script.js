var startButtonEl = document.querySelector("#startbtn");
var startContainer = document.querySelector("#start-div");
var timeLeft = document.querySelector("span");
var time = 30;
var questionContainerEl = document.querySelector("#question-container");
var choiceEl = document.querySelector(".choice");
var correctAnswerEl = document.querySelector(".correct");
var wrongAnswerEl = document.querySelector(".wrong");

var questionNumber = 0;

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
        question: "What does DRAMA stand for?",
        choice1: "Diffuse Object Model",
        choice2: "Document Object Model",
        choice3: "Diffuse Objective Model",
        choice4: "Domestic Objective Model",
        correct: 4, 
    }
];

function startQuiz() {

    startContainer.remove();

    //ADD call for countdown Function??
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
        }
    },1000);

        createQuestion(questionNumber);
    
};


var createQuestion = function(questionNumberArg) {

        var questionDivEl = document.createElement("div");
        var questionHeadingEl = document.createElement("h1");
        var choicesDivEl = document.createElement("div");
        var questionChoiceEl = document.createElement("button");

        questionDivEl.className = "question";
        questionContainerEl.appendChild(questionDivEl);

        questionDivEl.className = "question";
        questionContainerEl.appendChild(questionDivEl);

        questionHeadingEl.textContent = questions[questionNumberArg].question;
        questionDivEl.appendChild(questionHeadingEl);

        choicesDivEl.className = "choices"
        questionDivEl.appendChild(choicesDivEl);

        questionChoiceEl.className = "choice choice1";
        questionChoiceEl.textContent = questions[questionNumberArg].choice1;
        if (questions[questionNumberArg].correct === 1) {
            questionChoiceEl.setAttribute ("answer", "correct");
        } else {
            questionChoiceEl.setAttribute ("answer", "wrong");
        };
        choicesDivEl.appendChild(questionChoiceEl);

        questionChoiceEl = document.createElement("button");
        questionChoiceEl.className = "choice choice2";
        questionChoiceEl.textContent = questions[questionNumberArg].choice2;
        if (questions[questionNumberArg].correct === 2) {
            questionChoiceEl.setAttribute ("answer", "correct");
        } else {
            questionChoiceEl.setAttribute ("answer", "wrong");
        };
        choicesDivEl.appendChild(questionChoiceEl);

        questionChoiceEl = document.createElement("button");
        questionChoiceEl.className = "choice choice3";
        questionChoiceEl.textContent = questions[questionNumberArg].choice3;
        if (questions[questionNumberArg].correct === 3) {
            questionChoiceEl.setAttribute ("answer", "correct");
        } else {
            questionChoiceEl.setAttribute ("answer", "wrong");
        };
        choicesDivEl.appendChild(questionChoiceEl);
        
        questionChoiceEl = document.createElement("button");
        questionChoiceEl.className = "choice choice4";
        questionChoiceEl.textContent = questions[questionNumberArg].choice4;
        if (questions[questionNumberArg].correct === 4) {
            questionChoiceEl.setAttribute ("answer", "correct");
        } else {
            questionChoiceEl.setAttribute ("answer", "wrong");
        };
        choicesDivEl.appendChild(questionChoiceEl);
  
        choicesDivEl.addEventListener("click", function(){
            questionNumber++;
            console.log(questionNumber);
            questionDivEl.remove();
            if (questionNumber <= questions.length){
                createQuestion(questionNumber);
            } else {
                console.log
                score();
            };
            
        });

        
    
    
}



    //  correctAnswerEl.addEventListener("click", function() {
    //     console.log("Good!");

        // createQuestion2();

    // });
    

    // wrongAnswerEl.addEventListener("click", function() {
    //     console.log("Bad!");
    //     time = time - 2;
    //     timeLeft.textContent = time;
    // });

     
// };


function checkAnswer() {

    correctAnswerEl.addEventListener("click", function() {
        console.log("Good!");

    });

    wrongAnswerEl.addEventListener("click", function() {
        console.log("Bad!");
        time = time - 2;
        timeLeft.textContent = time;
    });


};

startButtonEl.addEventListener("click", startQuiz);

// correctAnswerEl.addEventListener("click", function() {
//      console.log("Good!");
//      });

