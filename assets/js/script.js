var startButtonEl = document.querySelector("#startbtn");
var startContainer = document.querySelector("#start-div");
var timeLeft = document.querySelector("span");
var time = 30;
var questionContainerEl = document.querySelector("#question-container");
var correctAnswerEl = document.querySelector(".correct");
var wrongAnswerEl = document.querySelector(".wrong");

var questions = [];

function startQuiz() {
    startContainer.remove();

    createQuestion();

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

    

};

function createQuestion() {
     var questionDivEl = document.createElement("div");
     var questionHeadingEl = document.createElement("h1");
     questionDivEl.textContent = "HELLO!";
     questionHeadingEl.textContent = "HOWDY!";
     questionContainerEl.appendChild(questionDivEl);
     questionDivEl.appendChild(questionHeadingEl);
};


function score() {

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