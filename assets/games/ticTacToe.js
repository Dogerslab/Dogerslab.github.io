function startTicTacToe() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Tic-Tac-Toe</h2>
        <div id="board" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px;"></div>
        <p id="status"></p>
    `;

    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let currentPlayer = 'X'; // Player is 'X'
    const cells = Array(9).fill(null);

    function renderBoard() {
        board.innerHTML = '';
        cells.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.style.border = '1px solid black';
            cellDiv.style.height = '100px';
            cellDiv.style.display = 'flex';
            cellDiv.style.alignItems = 'center';
            cellDiv.style.justifyContent = 'center';
            cellDiv.style.fontSize = '24px';
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => handleClick(index));
            board.appendChild(cellDiv);
        });
    }

    function handleClick(index) {
        if (!cells[index] && currentPlayer === 'X') { // Player's turn
            cells[index] = currentPlayer;
            if (checkWinner()) {
                status.textContent = `${currentPlayer} wins!`;
            } else if (cells.every(cell => cell)) {
                status.textContent = 'It\'s a draw!';
            } else {
                currentPlayer = 'O'; // Switch to bot
                renderBoard();
                setTimeout(botMove, 500); // Delay for bot's move
            }
        }
    }

    function botMove() {
        const bestMove = findBestMove();
        cells[bestMove] = currentPlayer;
        if (checkWinner()) {
            status.textContent = `${currentPlayer} wins!`;
        } else if (cells.every(cell => cell)) {
            status.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = 'X'; // Switch back to player
        }
        renderBoard();
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === null) {
                cells[i] = 'O'; // Bot's move
                let score = minimax(cells, 0, false);
                cells[i] = null; // Undo move
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        const scores = {
            X: -1,
            O: 1,
            draw: 0
        };

        const winner = checkWinner();
        if (winner) {
            return scores[winner];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O'; // Bot's move
                    let score = minimax(board, depth + 1, false);
                    board[i] = null; // Undo move
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X'; // Player's move
                    let score = minimax(board, depth + 1, true);
                    board[i] = null; // Undo move
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a]; // Return the winner ('X' or 'O')
            }
        }
        return null; // No winner yet
    }

    renderBoard();
}
