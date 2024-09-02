const randomNum = Math.round(Math.random() * 100 + 1);
console.log(randomNum)

const submitBtn = document.getElementById("subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const totalGuesses = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

// array to save previous guesses
let preGuessesArray = [];

let playGame = true;

// function to check valid user input
function validateGuess(guess) {
  if (guess > 100 || guess < 0) {
    alert("Enter number between 1 and 100");
  } else if (isNaN(guess)) {
    alert("enter valid input");
  } else {
    preGuessesArray.push(guess);
    checkGuess(guess);
    updatInfo(guess);
  }
}

// function to check the guess is correct or not
function checkGuess(guess) {
  if (guess == randomNum) {
    displayMessage(`You guessed the correct number ${randomNum}`);
    endGame();
  } else if (guess < randomNum) {
    displayMessage(`Number is TOOO low`);
  } else if (guess > randomNum) {
    displayMessage(`Number is TOOO High`);
  }
}

function updatInfo(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess},  `;

  //   checking and updating number of guesses
  //   NOTE : (it may be little complicated)
  const remainGuesses = totalGuesses.textContent;
  if (remainGuesses > 1) {
    --totalGuesses.textContent;
  } else {
    displayMessage(`You loose, Random number was ${randomNum}`);
    endGame();
  }
}

function displayMessage(message) {
  lowOrHi.textContent = message;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  playGame = false;
  newGame();
}

function newGame() {
  // creating the new game button
  const newButton = document.createElement("button");
  newButton.innerText = "New Game";
  newButton.setAttribute("id", "new-game-btn");
  console.log(newButton);
  startOver.append(newButton);

  // event listener for the button
  newButton.addEventListener("click", () => {
    const randomNum = Math.round(Math.random() * 100 + 1);
    preGuessesArray = [];
    guessSlot.innerHTML = "";
    totalGuesses.textContent = 10;
    userInput.removeAttribute("disabled");
    playGame = true;
  });
}

// button event listener
if (playGame) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}
