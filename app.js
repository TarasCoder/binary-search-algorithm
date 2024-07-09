// Getting values from the UI
let selectedNr = document.getElementById("selectedNr");
let getRandomNrBtn = document.getElementById("getRandomNrBtn");
let calculateBtn = document.getElementById("calculateBtn");
let selectedNumberInput = document.getElementById("selectedNumberInput");
let maxNumberInput = document.getElementById("maxNumberInput");
let resultsBlock = document.getElementById("resultsBlock");

// Declaring variables
let totalNumbers = parseInt(maxNumberInput.value);
let maxNumber = totalNumbers;
let minNumber = 0;
let numbers = [];
let guesses = 0;
let direction;
let current_position;
let resultIsOdd = true;

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
  resultsBlock.innerHTML = "";
  resultsBlock.classList.add("results_block_hide");
  resultIsOdd = true;
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
  displayingInfo(`Algorithm guess: ${current_position}`);
  return current_position;
}

// Checking is that guess correct
function isRight(current_position) {
  let selectedNumber = parseInt(selectedNr.innerText);
  if (current_position === selectedNumber) {
    console.log(`Guessed in ${guesses} steps`);
    displayingInfo(`Guessed in ${guesses} steps`);
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
    displayingInfo(`System: ${current_direction}`);
    while (current_direction !== "match") {
      current_position = makeGuess();
      current_direction = isRight(current_position);
      console.warn("current_direction:", current_direction);
      displayingInfo(`System: ${current_direction}`);
      // This is secure mechanism, to prevent browser stucking
      i++;
      if (i > totalNumbers) return;
    }
  }
}

// Filling results on the main page
function displayingInfo(info) {
  let record_wrapper = document.createElement("div");
  let record = document.createElement("p");
  
  record_wrapper.classList.add("record_wrapper");
  if (resultIsOdd) {
    record_wrapper.classList.add("record_wrapper_left");
  } else {
    record_wrapper.classList.add("record_wrapper_right");
  }
  
  record.classList.add("single_record");
  record.classList.add("single_record_right");
  record.innerText = info;

  // Preventing adding last message as match (after message "Guessed in ... steps")
  if(record.innerText == "System: match") {
    return;
  }
  if(record.innerText == `Guessed in ${guesses} steps`) {
    record.classList.add("guessed_msg");
  }
  
  record_wrapper.append(record);
  resultsBlock.append(record_wrapper);

  resultIsOdd = !resultIsOdd;
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
    resultsBlock.classList.remove("results_block_hide");
    calculate(makeGuess());
  }
});

// displayingInfo("sasa");
// displayingInfo("sasa pipa");
// displayingInfo("sasa");
// displayingInfo("sasa makasa");