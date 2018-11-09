let guessesLeft;
let letterClicked;
let wordChoice;
let remainingLetters;
let wordArray = ["ASYNCHRONOUS", "BOOLEAN", "CLASS", "DOMAIN", "ELEMENT", "JAVASCRIPT", "INHERITANCE", "ARRAYS", "FUNCTIONS", "HOISTING", "SCOPE", "RECURSION", "EVENTS", "KEYUP", "TERNARY"];
let hint = document.querySelector(".hint");
let letterGuessed = document.querySelector("#your-guess");
let numbers = document.querySelector(".numbers");
let guesses = document.querySelector("#guesses");
let wordDisplay = document.querySelector("#words");
let letterCount = document.querySelector(".letters");
let newGame = document.querySelector("#play");
let letterBoxes = document.querySelector("#alphabet");
let titleHeader = document.querySelector(".welcome");
let pointTotal = document.querySelector(".pointTotal");
const correctSound = document.getElementById("correct");
const wrongSound = document.getElementById("wrong");
const gameWon = document.getElementById("gameWon");
const endGame = document.getElementById("endGame");
const roundWon = document.getElementById("applause");
const wordContainer = document.querySelector("#letterChoices");
const muteTitle = document.querySelector("#muteTitle");
let score = 0;

function playGame() {
    
    guessesLeft = 6;
    guesses.innerHTML = `You have ${guessesLeft} guesses left`;
    // Pick a random word.
    wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];

    answerList = [];

    for (let i = 0; i < wordChoice.length; i++) {
        answerList[i] = "_";
    }
    // Display underscores on page representing each letter in the random word
    wordDisplay.innerHTML = answerList.join('');

    let hintObject = {
        ASYNCHRONOUS: "An AJAX call...",
        BOOLEAN: "A logical data type that can have only the values true or false",
        CLASS: " Defines an object's characteristics",
        DOMAIN: "An authority within the internet that controls its own resources",
        ELEMENT: "May contain a data item or a chunk of text or an image",
        JAVASCRIPT: "The language of the web",
        INHERITANCE: "Classes can have superclasses and subclasses",
        ARRAYS: "Containers like objects",
        FUNCTIONS: "Stores instructions",
        HOISTING: "Moving declarations to the top",
        RECURSION: "Calling functions inside of functions",
        EVENTS: "When an HTML button is clicked",
        KEYUP: "Not 'click' event, but...",
        TERNARY: "Type of operator",
        SCOPE: "The set of variables that’s visible to a part of the program"
    }

    hint.innerHTML = `Clue: ${hintObject[wordChoice]}`;

    // Display number of letters in the random word on the page
    remainingLetters = answerList.join('').length;
    letterCount.innerHTML = `The word is ${remainingLetters} letters long`;
}

// Click function to restart the game
newGame.addEventListener("click", function startNewGame() {
    playGame();
});

// Register the player’s guess.
function buttonPress(event) {
    letterClicked = event.target.textContent;
    letterGuessed.innerHTML = `Letter guessed: ${letterClicked}`;
    matchWord(letterClicked);
}

// Pass the letter event from buttonPress into the randomWord function
function matchWord(letter) {
    if (remainingLetters > 0) {
        let foundMatch = false;
        for (let i = 0; i < wordChoice.length; i++) {
            if (wordChoice[i] === letter) {
                foundMatch = true;
                correctSound.play();
                answerList[i] = letter;
                wordDisplay.innerHTML = answerList.join(' ');
                remainingLetters--;
            }
        }

        if (!foundMatch) {
            wrongSound.play();
            guessesLeft--;
            guesses.innerHTML = (`You have ${guessesLeft} guesses left`);
        }

        if (guessesLeft === 0) {
            endGame.play();
            hint.innerHTML = "Sorry, you're out of guesses!";
            letterCount.innerHTML = "So embarrassing. You lost :(";
            guesses.innerHTML = `The word is ${wordChoice}`;
            setTimeout(() => {
                hint.innerHTML = "If you'd like to play again, click the spin button.";
                endGame.pause();
            }, 5000);
        }

        if (remainingLetters === 0) {
            roundWon.play();
            hint.innerHTML = "Great job! You guessed it!";
            score++;
            pointTotal.innerHTML = `${score}`;
            setTimeout(() => {
                playGame();
            }, 4000);
        }

        if (score === 10) {
            gameWon.play();
            hint.innerHTML = "Congratulations, you are the Word Spin master!!!";
            hint.style.color = "#ffa500";
            setTimeout(() => {
                window.location.replace("index.html");
            }, 3000);
        }
    }
}

