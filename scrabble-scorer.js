// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");

   let inputWord = input.question('Enter a word to score: ')
   return inputWord;
};

function simpleScorer(word){
   word = word.toLowerCase();
   return word.length
};

//let vowelBonusScorer;
function vowelBonusScorer(word) {
   word=word.toLowerCase();
   let vowelScore = 0;
   for(i=0; i<word.length; i++) {
      let vowels=["a","e","i","o","u"];
      if (vowels.includes(word[i])){
         vowelScore += 3; 
      } else {
         vowelScore += 1;
      }
   } 
   return vowelScore;
}

function scrabbleScorer(word){
   let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]]
      
	}
	
	return letterPoints;
}


let objectSimpleScorer = {
   name: "Simple Scorer",
   description: "Each letter is worth 1 point",
   scorerFunction: simpleScorer
};

let objectVowelBonusScorer = {
   name: "Bonus Vowels",
   description: "Vowels are 3 points, consonants are 1",
   scorerFunction: vowelBonusScorer
};

let objectOldScrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring method",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [objectSimpleScorer, objectVowelBonusScorer, objectOldScrabbleScorer];

function scorerPrompt() {
let scoreChoice = input.question("Which scoring method would you like to use? \nPlease enter 0 for Simple Score\n1 for Vowel Bonus \n2 for original Scrabble:\n ")
if (scoreChoice === "0"){
   return scoringAlgorithms[0]
   
} else if (scoreChoice === "1") {
   return scoringAlgorithms[1]
   
} else {
   return scoringAlgorithms[2]
   
}
};
//return object and then console log the method inside runProgram
function transform(oldPointStructure) {
   let newPoint = {}
   for (let pointValue in oldPointStructure){
     for (let i=0; i<oldPointStructure[pointValue].length; i++) {
        newPoint[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
      }
   }
   
   return newPoint;   
}
let newPointStructure = transform(oldPointStructure)
  

function runProgram() {
   let inputWord = initialPrompt()   
   let scoreChoice = scorerPrompt()
   
   console.log(scoreChoice.scorerFunction(inputWord))


   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
