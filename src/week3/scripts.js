const questionElement  = document.getElementById("question");
const answerElement = document.getElementById("answers");

let questions = [
    "What color is the sky?",
    "What's the coolest dinsoraur?"
]
questionElement.innerHTML = questions;

let possibleAnswers = [
    ["Red", "Green", "Blue","Cyan","Black"], 
    ["T-Rex", "Raptor","Stego", "D-Rex"]
];
let currentQuestionIndex = 0;

function setupQuestion(){
    try{

        questionElement.innerHTML = questions[currentQuestionIndex];
        answerElement.innerHTML = "";
        possibleAnswers[currentQuestionIndex].forEach(element =>{
        let thisAnswer = document.createElement("li");
        thisAnswer.innerHTML = element;  
        thisAnswer.onclick =(event) =>{
            alert(event.target.innerHTML);
            currentQuestionIndex++;
            setupQuestion();
            };
        answerElement.appendChild(thisAnswer);
        });
    }catch (error){
        questionElement.innerHTML ="No more question."
    }

}
setupQuestion();
