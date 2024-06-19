const numbers = [];
const totalNumbers = 5;
let guesses = 0;
// let randomNr = Math.floor(Math.random() * totalNumbers + 1);
let randomNr = 8;
let current_position;
let direction;
let minNumber = 0;
let maxNumber = totalNumbers;
console.log("randomNr", randomNr);

// Filling array
for (let i = 1; i <= totalNumbers; i++) {
  numbers.push(i);
}

// Making first guess
function oneGuess(minMax) {
  current_position = Math.floor(minMax / 2);
  guesses++;
  return current_position;
}

// Checking is that guess correct
function isRight(current_position) {
  if(current_position === randomNr){
    console.log(`Guessed in ${guesses} steps`);
    return direction= "match"
  } else if(current_position > randomNr) {
    maxNumber = current_position;
    return direction = "lower"
  } else if(current_position < randomNr) {
    minNumber = current_position;
    return direction = "higher"
  }
}

// Making further guesses
function allGuesses(direction) {
    switch (direction) {
      case 'lower':
        oneGuess(maxNumber);
        console.log("current_position", current_position);
        break;
      case 'higher':
        oneGuess(minNumber);
        console.log("current_position", current_position);
        break;
      case 'match':
        console.log(`Guessed in ${guesses} steps`);
        return "guessed"
        break;
    }
  }

debugger
current_position = oneGuess(maxNumber);
let current_direction = isRight(current_position);
while(allGuesses(direction) !== "guessed"){
    current_direction = isRight(current_position);
    allGuesses(current_direction);
};

// console.log("current_direction", current_direction);
// console.log("current_position", current_position);
// console.log("arr", numbers);
console.log("guesses", guesses);
console.log("randomNr", randomNr);