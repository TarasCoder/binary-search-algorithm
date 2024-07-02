// Getting values from the UI
let selectedNr = document.getElementById("selectedNr");
let getRandomNrBtn = document.getElementById("getRandomNrBtn");
let calculateBtn = document.getElementById("calculateBtn");
let selectedNumberInput = document.getElementById("selectedNumberInput");
let maxNumberInput = document.getElementById("maxNumberInput");

// Declaring variables
let totalNumbers = parseInt(maxNumberInput.value);
let maxNumber = totalNumbers;
let minNumber = 0;
let numbers = [];
let guesses = 0;
let direction;
let current_position;

// Getting random number
function getRandomNumber() {
  let minNumber = 0;
  return Math.floor(Math.random() * (totalNumbers - minNumber) + minNumber);
}

// Filling array
for (let i = 1; i <= totalNumbers; i++) {
  numbers.push(i);
}

// Reset values
function resetValues() {
  maxNumber = totalNumbers;
  minNumber = 0;
  guesses = 0;
  direction = "";
  current_position = null;
}

function clearInputFields() {
  selectedNr.innerText = "";
  selectedNumberInput.value = "";
}

// Making a guess
function makeGuess() {
  current_position = Math.floor((maxNumber + minNumber) / 2);
  guesses++;
  console.log("current guess", current_position);
  return current_position;
}

// Checking is that guess correct
function isRight(current_position) {
  let selectedNumber = parseInt(selectedNr.innerText);
  if (current_position === selectedNumber) {
    console.log(`Guessed in ${guesses} steps`);
    return (direction = "match");
  } else if (current_position > selectedNumber) {
    maxNumber = current_position;
    return (direction = "number is lower");
  } else if (current_position < selectedNumber) {
    minNumber = current_position;
    return (direction = "number is higher");
  }
}

// Calculation - guessing number while it will be guessed
function calculate() {
  let i = 0;
  let current_direction = isRight(current_position);
  if (current_direction === "match") {
    return;
  } else {
    console.warn("current_direction:", current_direction);
    while (current_direction !== "match") {
      current_position = makeGuess();
      current_direction = isRight(current_position);
      console.warn("current_direction:", current_direction);
      // This is secure mechanism, to prevent browser stucking
      i++;
      if (i > totalNumbers) return;
    }
  }
}

// Interaction with UI

// If user enter some number to search
selectedNumberInput.addEventListener("input", (ev) => {
  resetValues();
  let userInput = parseInt(ev.target.value);
  selectedNr.innerText = userInput;
  if (userInput >= totalNumbers || userInput < minNumber) {
    clearInputFields();
    alert(`Enter number in range between ${minNumber} and ${maxNumber}!!!`);
  }
});

// Triggering getting random number option
getRandomNrBtn.addEventListener("click", () => {
  let randomNr = getRandomNumber();
  console.log("Random number is: ", randomNr);
  selectedNr.innerText = randomNr;
  selectedNumberInput.value = randomNr;
});

// Changing max number
maxNumberInput.addEventListener("input", (ev) => {
  let userInputMaxNumber = parseInt(ev.target.value);
  if (userInputMaxNumber <= minNumber) {
    alert(`Enter number higher as ${minNumber}`);
  } else {
    resetValues();
    clearInputFields();
    totalNumbers = userInputMaxNumber;
  }
});

// Launching Binary Search Algorithm
calculateBtn.addEventListener("click", () => {
  // Checking if the user entered some number
  if (selectedNr.innerText == "") {
    alert("Enter some number!!!");
  } else {
    resetValues();
    calculate(makeGuess());
  }
});