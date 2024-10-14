function startGame1() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Guess the Number Game</h2>
        <p>Guess a number between 1 and 100.</p>
        <input type="number" id="guessInput" placeholder="Enter your guess" />
        <button id="submitGuess">Submit Guess</button>
        <p id="feedback"></p>
        <p id="attempts"></p>
    `;

    const feedbackElement = document.getElementById('feedback');
    const attemptsElement = document.getElementById('attempts');
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');

    const randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    let attempts = 0;
    const maxAttempts = 10;

    submitGuess.addEventListener('click', function() {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (attempts <= maxAttempts) {
            if (userGuess === randomNumber) {
                feedbackElement.textContent = 'Congratulations! You guessed the number!';
                attemptsElement.textContent = '';
            } else if (userGuess < randomNumber) {
                feedbackElement.textContent = 'Too low! Try again.';
                attemptsElement.textContent = `Attempts: ${attempts}/${maxAttempts}`;
            } else {
                feedbackElement.textContent = 'Too high! Try again.';
                attemptsElement.textContent = `Attempts: ${attempts}/${maxAttempts}`;
            }
        } else {
            feedbackElement.textContent = `Game over! The number was ${randomNumber}.`;
            attemptsElement.textContent = '';
        }

        guessInput.value = ''; // Clear the input field
    });
}

