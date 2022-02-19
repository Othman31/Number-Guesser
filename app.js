/*
GAME FUNCTION:
 Player must guess a number between a min and max
 player gtes a certain amount of guesses
 notify player of guesses remaining
 notify the player of the correct answer if loose
 let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  //mousedown not a click to it only click one time
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = "green";
    // // Set message
    // setMessage(`${winningNum} is correct you win!`, "green");

    //new function to replace above code
    gameOver(true, `${winningNum} is correct you win!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // // Game over
      // // Disable input
      // guessInput.disabled = true;
      // // Change border color
      // guessInput.style.borderColor = "red";
      // // Set message
      // setMessage(
      //   `Game Over, you lost the orrect number was ${winningNum}`,
      //   "green"
      // );

      //new function to replace above code
      gameOver(
        false,
        `Game Over, you lost the correct number was ${winningNum}`
      );
    } else {
      // Game continue answer wrong
      setMessage(
        `${guess} is not correct, you have ${guessesLeft} guesses left`,
        "red"
      );
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
