const numbers = [];
const totalNumbers = 11;
let guesses = 0;
// let randomNr = Math.round(Math.random() * totalNumbers + 1);
let randomNr = 10;
let current_position;
let direction;
let minNumber = 0;
let maxNumber = totalNumbers;

console.log("Random number is: ", randomNr);

// Filling array
for (let i = 1; i <= totalNumbers; i++) {
  numbers.push(i);
}

// Making a guess
function oneGuess() {
  current_position = Math.floor((maxNumber + minNumber) / 2);
  guesses++;
  return current_position;
}

// Checking is that guess correct
function isRight(current_position) {
  if(current_position === randomNr){
    console.log(`Guessed in ${guesses} steps`);
    return direction = "match"
  } else if(current_position > randomNr) {
    maxNumber = current_position;
    return direction = "number is lower"
  } else if(current_position < randomNr) {
    minNumber = current_position;
    return direction = "number is higher"
  }
}

// Guessing while it will be guessed
while(isRight(current_position) !== 'match'){
  current_position = oneGuess();
  console.log("current_position", current_position);
  let current_direction = isRight(current_position);
  console.log("current_direction", current_direction);
}