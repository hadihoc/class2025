/*function true_or_false(){
    let color = document.getElementById("fav_color").value
    color = color.toUpperCase()
    if(color === "WHITE"){
        alert("It is true.")
    }
    else{
        alert("It is false.")
    }
}
    */

function calculateTwoNumbers(){
    //Get first number, second number, and operation type
    let firstNumber = parseInt(document.getElementById('firstNumber').value)
    let secondNumber = parseInt(document.getElementById('secondNumber').value)
    let operationType = document.getElementById('operation').value

    //Alert user when either first number or second number field is empty

    
    //Selecting an operation type
    switch( operationType){
        case "Add":
            document.getElementById('result').innerHTML = addTwoNumbers(firstNumber,secondNumber)
            break;
        case "Subtract":
            document.getElementById('result').innerHTML= subtractTwoNumbers(firstNumber, secondNumber)
            break;
        case "Multiply":
            document.getElementById('result').innerHTML= multiplyTwoNumbers(firstNumber, secondNumber)
            break;
        case "Divide":
            document.getElementById('result').innerText = divideTwoNumbers(firstNumber,secondNumber)
    }
}

//This function adds two numbers
function addTwoNumbers(value1, value2){
    let sum = value1 + value2;
    return sum;
}

//This function subtracts two numbers
function subtractTwoNumbers(value1, value2){
    let sum = value1 - value2;
    return sum;
}

//This function  multiply two numbers
function multiplyTwoNumbers(value1, value2){
    let sum = value1 * value2;
    return sum;
}

//This function divides two numbers
function divideTwoNumbers(value1, value2){
    if(value2 != 0){  //If divisor is not = 0
      let sum = value1/value2;
      return sum.toFixed(2);  // rounds to 2 decimal number
    }
    else{  //If divisor is = 0
        let sum = "!Undefined! Divided by zero."
        return sum;
    } 
}   