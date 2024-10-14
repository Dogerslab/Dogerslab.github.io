document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const gamesSection = document.getElementById('games');
    const aboutSection = document.getElementById('about');

    // Hide the game container initially
    gameContainer.style.display = 'none';

    // Navigation handling
    document.querySelector('nav').addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const target = event.target.getAttribute('href').substring(1); // Get the target section ID
            if (target === 'games') {
                gamesSection.style.display = 'block';
                aboutSection.style.display = 'none';
                gameContainer.style.display = 'none'; // Hide game container
            } else if (target === 'about') {
                gamesSection.style.display = 'none';
                aboutSection.style.display = 'block';
                gameContainer.style.display = 'none'; // Hide game container
            }
        }
    });

    // Add event listeners for game buttons
    document.getElementById('start-flappy-bird').addEventListener('click', function() {
        gameContainer.style.display = 'block';
        gamesSection.style.display = 'none';
        aboutSection.style.display = 'none';
        startFlappyBird(); // Call the function to start Flappy Bird
    });

    document.getElementById('start-catch-game').addEventListener('click', function() {
        gameContainer.style.display = 'block';
        gamesSection.style.display = 'none';
        aboutSection.style.display = 'none';
        startCatchGame(); // Call the function to start Catch Game
    });

    // Add similar event listeners for new games
    document.getElementById('start-game1').addEventListener('click', function() {
        gameContainer.style.display = 'block';
        gamesSection.style.display = 'none';
        aboutSection.style.display = 'none';
        startGame1(); // Call the function to start the Guess the Number game
    });

    document.getElementById('start-game2').addEventListener('click', function() {
        gameContainer.style.display = 'block';
        gamesSection.style.display = 'none';
        aboutSection.style.display = 'none';
        startGame2(); // Call the function to start Game 2
    });

    document.getElementById('start-tic-tac-toe').addEventListener('click', function() {
        const gameContainer = document.getElementById('game-container');
        const gamesSection = document.getElementById('games');
        const aboutSection = document.getElementById('about');

        gameContainer.style.display = 'block'; // Show the game container
        gamesSection.style.display = 'none'; // Hide the games section
        aboutSection.style.display = 'none'; // Hide the about section
        startTicTacToe(); // Call the function to start Tic-Tac-Toe
    });

    document.getElementById('start-platformer').addEventListener('click', function() {
        const gameContainer = document.getElementById('game-container');
        const gamesSection = document.getElementById('games');
        const aboutSection = document.getElementById('about');

        gameContainer.style.display = 'block'; // Show the game container
        gamesSection.style.display = 'none'; // Hide the games section
        aboutSection.style.display = 'none'; // Hide the about section
        startPlatformer(); // Call the function to start the platformer game
    });
});
