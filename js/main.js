let guessesLeft;
let letterClicked;
let wordChoice;
let remainingLetters;
let listOfGuesses;
const wordArray = ["ASYNCHRONOUS", "BOOLEAN", "CLASS", "DOMAIN", "ELEMENT", "JAVASCRIPT", "INHERITANCE", "ARRAYS", "FUNCTIONS", "HOISTING", "SCOPE", "RECURSION", "EVENTS", "KEYUP", "TERNARY"];
let displayChoices = document.querySelector('#displayChoices');
const hint = document.querySelector(".hint");
const numbers = document.querySelector(".numbers");
const guesses = document.querySelector("#guesses");
const wordDisplay = document.querySelector("#words");
const letterCount = document.querySelector(".letters");
const newGame = document.querySelector("#play");
const letterBoxes = document.querySelector("#alphabet");
const titleHeader = document.querySelector(".welcome");
const pointTotal = document.querySelector(".pointTotal");
const correctSound = document.getElementById("correct");
const wrongSound = document.getElementById("wrong");
const gameWon = document.getElementById("gameWon");
const endGame = document.getElementById("endGame");
const roundWon = document.getElementById("applause");
const muteTitle = document.querySelector("#muteTitle");
let score = 0;

const playGame = () => {
    //total letters guessed array
    displayChoices.innerHTML = '';
    listOfGuesses = [];

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
        ASYNCHRONOUS: "An AJAX call is...",
        BOOLEAN: "True or false values",
        CLASS: " Defines an object's characteristics",
        DOMAIN: "Defined by the IP address",
        ELEMENT: "Defines a fragment of computer code",
        JAVASCRIPT: "The language of the web",
        INHERITANCE: "New objects to take on the properties of existing objects",
        ARRAYS: "Containers, like objects",
        FUNCTIONS: "Stores instructions",
        HOISTING: "Moving declarations to the top",
        RECURSION: "Calling functions inside of functions",
        EVENTS: "Several HTML buttons are clicked. These are called...",
        KEYUP: "Not a 'click' event, but...",
        TERNARY: "A boolean operator",
        SCOPE: "The set of variables that’s visible to a part of the program"
    }

    hint.innerHTML = `Clue: ${hintObject[wordChoice]}`;

    // Display number of letters in the random word on the page
    remainingLetters = answerList.join('').length;
    letterCount.innerHTML = `The word is ${remainingLetters} letters long`;
}

// Click function to restart the game
newGame.addEventListener("click", () => {
    playGame();
});

// Register the player’s guess.
const buttonPress = e => {
    letterClicked = e.target.textContent;
    matchWord(letterClicked);
}

// Pass the letter event from buttonPress into the randomWord function
const matchWord = letter => {
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
            guesses.innerHTML = `You have ${guessesLeft} guesses left`;
            listOfGuesses.push(letter);
            convertToString = listOfGuesses.join(',  ');
            displayChoices.innerHTML = `Letters you guessed: ${convertToString}`;
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

