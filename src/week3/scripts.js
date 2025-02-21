const questionElement  = document.getElementById("question");
const answerElement = document.getElementById("answers");
let questionsDiv = document.getElementById("questionContainer");
    questionsDiv.style.visibility = "hidden";
let quizGameHeader = document.getElementById("quizGame");
    quizGameHeader.style.visibility = 'hidden';
let gameOver = document.getElementById("gameOverScreen");
    gameOver.style.visibility = "hidden";
let startDiv = document.getElementById("startScreen");
let score = document.getElementById("finalScore");


let questions = [
    "What color is the sky?",
    "What's the coolest dinsoraur?",
    "How many continents do we have?",
    "Who is the main character in Finding Nemo?"
]
questionElement.innerHTML = questions;

let possibleAnswers = [
    ["Red", "Green", "Blue","Cyan","Black"], 
    ["T-Rex", "Raptor","Stego", "D-Rex"],
    [1, 3, 5, 7, 9],
    ["Marlin", "Nemo", "Dory"]
];

let answerKeys=[
    "Blue",
    "D-Rex",
    7,
    "Marlin"
]

let scores = 0;
let currentQuestionIndex = 0;

function setupQuestion(){
    try{

        questionElement.innerHTML = questions[currentQuestionIndex]; 
        answerElement.innerHTML = "";
        possibleAnswers[currentQuestionIndex].forEach(element =>{
            let thisAnswer = document.createElement("li");
            thisAnswer.innerHTML = element;  
            thisAnswer.onclick =(event) =>{
                if(event.target.innerHTML == answerKeys[currentQuestionIndex]){
                   /* alert("Correct!");*/
                    currentQuestionIndex++;
                    scores++;
                    setupQuestion();
                }
                else{
                    /*alert("Wrong answer! It's " + answerKeys[currentQuestionIndex])*/
                    currentQuestionIndex++;
                    setupQuestion();
                }
            };
            answerElement.appendChild(thisAnswer);
        });
    }catch (error){
        questionsDiv.style.visibility = "hidden";
        quizGameHeader.style.visibility = "hidden";
        gameOver.style.visibility = "visible";
        finalScore.innerHTML = scores + " out of " + questions.length;
    }
}

function startQuiz(){
    startScreen.style.visibility = 'hidden';
    questionsDiv.style.visibility = 'visible';
    quizGameHeader.style.visibility = 'visible';
    setupQuestion();
}

function restartQuiz(setupQuestion){
    location.reload();
}

