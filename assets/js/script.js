//Wait for the DOM to finish loading before running the game
// Get the button elements  and aad event listeners to hem

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    // Below is the old-fashioned way of doing this. New method is found below.
    // for (let i = 0; i < buttons.length; i++) { }

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") { //Collects the data-type value of the button that is clicked and checks if it it the submit button.
                checkAnswer();
            } else { // if it's not submit it's one of the game modes, "this" takes the value of the button clicked (and it's data-type) and notifies the user accordingly
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    //Checks if user presses Enter and allows it to use it to Submit their answer.
    document.getElementById('answer-box').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Empties the answer box after every answer.
    document.getElementById('answer-box').value = '';

    // sets the cursor to be in the box, so you can immediately type your answer without clicking on it first.
    document.getElementById('answer-box').focus();
    
    // Generates two random numbers between 1 and 25. Floor rounds the code down to the nearest integer. +1 ensures it's never 0 and can be 25.
    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;

    switch (gameType) {
        case "addition":
            displayAdditionQuestion(num1, num2);
            break;
        case "subtract":
            displaySubtractQuestion(num1, num2);
            break;
        case "multiply":
            displayMultiplyQuestion(num1, num2);
            break;
        case "division":
            displayDivisionQuestion(num1, num2);
            break;
        default:
            alert(`Unimplemented operator ${gameType}`);
            throw(`Unimplemented operator ${gameType}". Aborting!"`);
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value); //parseInt checks if the value is an integer, and passes it on as such to make sure it can be added-up correctly. .value is required because it comes from an input element.
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) and the operator (plus, minus etc.)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;
    
    switch (operator) {
        case "+":
            return [operand1 + operand2, "addition"];
        case "-":
            return [operand1 - operand2, "subtract"];
        case "x":
            return [operand1 * operand2, "multiply"];
        case "÷":
            return [operand1 / operand2, "division"];
        default:
            alert(`Unimplemented operator ${operator}`);
            throw(`Unimplemented operator ${operator}". Aborting!"`);
    }

}

/**
 *  Gets current score from the dom and increments it by 1.
 */
function incrementScore() {
   let oldScore = parseInt(document.getElementById('score').innerText); 
   document.getElementById('score').innerText =  ++oldScore; // the ++ is before the variable because it would otherwise return the oldscore first to the dom and THEN PROCEED to increment it. NOw it increments BEFORE sending it back
}

/**
 *  Gets current wrong answer score from the dom and increments it by 1.
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText); 
    document.getElementById('incorrect').innerText =  ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    operand1 = operand1 * operand2;    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "÷";

}