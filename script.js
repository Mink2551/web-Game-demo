// JavaScript file for game logic and event handling

// Variables for game state
let numberOfGuesses = 0;
let maxNumberPlay = 10;
let maxGuesses = 5;
let realAnswer;

// DOM elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const maxNumberPlayText = document.getElementById('maxNumberPlayText');
const maxGuessesText = document.getElementById('maxGuessesText');
const guessCount = document.getElementById('guessCount');
const feedback = document.getElementById('feedback');

// Additional DOM elements for game ending messages
const resultMessage = document.createElement('p');
const restartButton = document.createElement('button');
restartButton.textContent = 'Play Again';
restartButton.addEventListener('click', restartGame);

// Start game button event listener
document.getElementById('startGame').addEventListener('click', startGame);

// Submit guess button event listener
document.getElementById('submitGuess').addEventListener('click', submitGuess);

// Function to start the game
function startGame() {
    maxNumberPlay = parseInt(document.getElementById('maxNumberPlay').value);
    maxGuesses = parseInt(document.getElementById('maxGuesses').value);
    
    maxNumberPlayText.textContent = maxNumberPlay;
    maxGuessesText.textContent = maxGuesses;
    
    realAnswer = Math.floor(Math.random() * maxNumberPlay) + 1;
    
    numberOfGuesses = 0; // Reset the number of guesses
    feedback.textContent = ''; // Clear previous feedback
    
    // Show game screen and hide the start screen
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

// Function to submit a guess
function submitGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumberPlay) {
        feedback.textContent = 'Invalid guess. Please enter a number between 1 and ' + maxNumberPlay + '.';
        return;
    }
    
    numberOfGuesses++;
    guessCount.textContent = numberOfGuesses;
    
    if (userGuess === realAnswer) {
        // The user won the game
        feedback.textContent = '';
        displayEndMessage(`You won! The correct number was ${realAnswer}.`, true);
        return;
    }
    
    // Provide feedback if the guess is too low or too high
    if (userGuess < realAnswer) {
        feedback.textContent = 'Too low!';
    } else {
        feedback.textContent = 'Too high!';
    }
    
    // Check if the user has reached the maximum number of guesses
    if (numberOfGuesses >= maxGuesses) {
        feedback.textContent = '';
        displayEndMessage(`You lost! The correct number was ${realAnswer}.`, false);
    }
}

// Function to display the end game message and restart button
function displayEndMessage(message, userWon) {
    // Clear feedback text
    feedback.textContent = '';

    // Create the result message and restart button
    resultMessage.textContent = message;
    gameScreen.appendChild(resultMessage);
    gameScreen.appendChild(restartButton);

    // Hide guess input and submit button
    document.getElementById('userGuess').disabled = true;
    document.getElementById('submitGuess').disabled = true;
}

// Function to restart the game
function restartGame() {
    // Reset game state
    numberOfGuesses = 0;
    
    // Remove the result message and restart button
    gameScreen.removeChild(resultMessage);
    gameScreen.removeChild(restartButton);
    
    // Re-enable guess input and submit button
    document.getElementById('userGuess').disabled = false;
    document.getElementById('submitGuess').disabled = false;
    
    // Show the start screen and hide the game screen
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}
