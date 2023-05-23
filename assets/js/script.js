//Wait for the DOM to finish loading before running the game
// Get the button elements  and aad event listeners to hem

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    // Below is the old-fashioned way of doing this. New method is found below.
    // for (let i = 0; i < buttons.length; i++) { }

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") { //Collects the data-type value of the button that is clicked and checks if it it the submit button.
                alert("You clicked Submit!");
            } else { // if it's not submit it's one of the game modes, "this" takes the value of the button clicked (and it's data-type) and notifies the user accordingly
                let gameType = this.getAttribute("data-type");
                alert(`You clicked ${gameType}`)
            }
        })
    }
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame() {
    // Generates two random numbers between 1 and 25. Floor rounds the code down to the nearest integer. +1 ensures it's never 0 and can be 25.
    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;
}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {
    
}

function displayMultiplyQuestion() {
    
}