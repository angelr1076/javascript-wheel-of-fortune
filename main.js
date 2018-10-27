let guessesLeft,
    letterClicked,
    wordChoice,
    remainingLetters,
    wordArray = ["JAVASCRIPT", "ARRAYS", "FUNCTIONS", "HOISTING", "RECURSION", "EVENTS", "KEYUP", "TERNARY"],
    hint = document.querySelector(".hint"),
    letterGuessed = document.querySelector("#your-guess"),
    numbers = document.querySelector(".numbers"),
    guesses = document.querySelector("#guesses"),
    wordDisplay = document.querySelector("#words"),
    letterCount = document.querySelector(".letters"),
    newGame = document.querySelector("#play"),
    letterBoxes = document.querySelector("#alphabet"),
    titleHeader = document.querySelector(".welcome"),
    pointTotal = document.querySelector(".pointTotal");
    pointTotal = 0;


function playGame() {
    guessesLeft = 6;
    guesses.innerHTML = `You have ${guessesLeft} guesses left`;
    // Pick a random word.
    wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)];

    answerList = [];

    for (var i = 0; i < wordChoice.length; i++) {
        answerList[i] = "_";
    }
    // Display underscores on page representing each letter in the random word
    wordDisplay.innerHTML = answerList.join('');

    let hintObject = {
        JAVASCRIPT: "The language of the web",
        ARRAYS: "Similar to objects",
        FUNCTIONS: "Stores instructions",
        HOISTING: "Moving declarations to the top",
        RECURSION: "Calling functions inside of functions",
        EVENTS: "This happens to HTML elements; like a concert",
        KEYUP: "Not 'keydown', but...",
        TERNARY: "Type of operator"
    }

    hint.innerHTML = `Clue: ${hintObject[wordChoice]}`;

    // Display number of letters in the random word on the page
    remainingLetters = answerList.join('').length;
    letterCount.innerHTML = `The word is ${remainingLetters} letters long`;
}

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
            hint.innerHTML = "Sorry, you're out of guesses!";
            setTimeout(function () {
                hint.innerHTML = "If you'd like to play again, click the spin button.";
                letterCount.innerHTML = "You lost :(";
            }, 3000);
        }

        if (remainingLetters === 0) {
            hint.innerHTML = "Great job! You guessed it!";
            pointTotal++;
            pointTotal.innerHTML = pointTotal;
            setTimeout(function () {
                playGame();
            }, 3000);
        }
    }
}