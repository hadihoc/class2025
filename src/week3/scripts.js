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

/*This function will display the question and its multiple choices answer */
function setupQuestion(){

    if(currentQuestionIndex < questions.length){  /*If the current index of the question array is less than the length of the questions array*/
        questionElement.innerHTML = questions[currentQuestionIndex]; /*Display a multiple-choice question in sequence order, beginning with index 0 */
        answerElement.innerHTML = "";  /*Clear the place holders of a set of possible answers */
        possibleAnswers[currentQuestionIndex].forEach(element =>{  /*Iterate through the possible answers array  */
            let thisAnswer = document.createElement("li");  /*Create a list item for each possible answer */
            thisAnswer.innerHTML = element;  /*Displays a possible answer in sequence order */
            answerElement.appendChild(thisAnswer); /*Add the possible answer to the parent element */
            thisAnswer.onclick =(event) =>{  /*If user clicks on this possible answer, excutes the arrow function */
                if(event.target.innerHTML == answerKeys[currentQuestionIndex]){  /*If the selected possible answer is matched with the correct answer in answerKeys array  */
                   /* alert("Correct!");*/
                    currentQuestionIndex++;  /*Increament currentQuestionIndex to 1 */
                    scores++;  /*Add one to the score keeper or variable*/
                    setupQuestion();  /*Call setupQueston function to display the next question */
                }
                else{  /*If the selected answer is incorrect*/ 
                    /*alert("Wrong answer! It's " + answerKeys[currentQuestionIndex])*/
                    currentQuestionIndex++; /*Increament the currentFQuestionIndex by one */
                    setupQuestion();  /*Calls setupQuestion function to display the next question */
                }
            };
        });
    }
    else{  /*If the current index of the question array is equal to the length of the quetions array*/
        questionsDiv.style.visibility = "hidden";  /*Hide the question screen*/
        quizGameHeader.style.visibility = "hidden"; 
        gameOver.style.visibility = "visible"; /*Set the game over screen visible*/
        finalScore.innerHTML = scores + " out of " + questions.length; /*Display the final score */
    }
   
}

/*When this function is called, the start screen will be invisible and it will be replace by the questions screen*/
function startQuiz(){
    startScreen.style.visibility = 'hidden';
    questionsDiv.style.visibility = 'visible';
    quizGameHeader.style.visibility = 'visible';
    setupQuestion();  /* Calls setup question function*/
}

/* When this function is called, it will refresh the page */
function restartQuiz(setupQuestion){
    location.reload();
}

