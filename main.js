
var guessesLeft;
var letterClicked;
var wordArray = ["JAVASCRIPT", "ARRAYS", "FUNCTIONS", "HOISTING", "RECURSION", "EVENTS", "KEYUP", "TERNARY"];
var wordChoice;
var answerList = [];
let remainingLetters;
var newGame;

var hint = document.querySelector(".hint");
var numbers = document.querySelector("#numbers");
var guesses = document.querySelector("#guesses");
var wordDisplay = document.querySelector("#words");
var letterCount = document.querySelector(".letters");
var newGame = document.querySelector("#play");
var letterBoxes = document.querySelector("#alphabet");
// let letterChoices = document.querySelector("#letterChoices");
// let letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "0", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function playGame() {
    
    guessesLeft = 6;
    guesses.innerHTML = `You have ${guessesLeft} guesses left`;
    // Pick a random word.
    wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];

    let hintObject = {JAVASCRIPT: "The language of the web", ARRAYS: "Similar to objects", FUNCTIONS: "Stores instructions", HOISTING: "Moving declarations to the top", RECURSION: "Calling functions inside of functions", EVENTS: "This happens to HTML elements", KEYUP: "Not 'onclick', but...", TERNARY: "Type of operator"};

    hint.innerHTML = `Clue: ${hintObject[wordChoice]}`;

    for (var i = 0; i < wordChoice.length; i++) {
        answerList[i] = "_";
    }

    // Display underscores on page representing each word in the random word
    wordDisplay.innerHTML = answerList.join('');

    // Display number of letters in the random word on the page
    remainingLetters = wordChoice.length;
    letterCount.innerHTML = `The word is ${remainingLetters} letters long`;
}

// Take the player’s guess.
function buttonPress(e) { 
    letterClicked = e.target.textContent;
    document.getElementById("your-guess").innerHTML = `You guessed the letter ${letterClicked}`;
    matchWord(letterClicked);
}

// Pass the letter event from buttonPress into the randomWord function
function matchWord(letter) {

    if (remainingLetters > 0) {
        var foundMatch = false;

        for (var i = 0; i < wordChoice.length; i++) {
            if (wordChoice[i] === letter) {
            foundMatch = true;
            answerList[i] = letter;
            wordDisplay.innerHTML = answerList.join(' ');
            remainingLetters--;
            }
        }

        if (!foundMatch) {
            guessesLeft--;
            guesses.innerHTML = (`You have ${guessesLeft} guesses left`);
        }
        
        if (guessesLeft === 0) {
            guesses.innerHTML = "Sorry, you're out of guesses!";
            setTimeout(function() {
                hint.innerHTML = "If you'd like to play again, click the spin button.";
                letterCount.innerHTML = "You lost. You did, you truly did."
            }, 3000);
        }  

        if (remainingLetters === 0) {
            letterCount.innerHTML = "Great job! You guessed it!";
            setTimeout(function() {
                playGame();
            }, 3000);
        }
    }
}
