let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 9 cells
let gameOver = false;
let aiPlayer = 'O';
let humanPlayer = 'X';

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');


function handleCellClick(index) {
    if (gameOver || gameBoard[index] !== '' || currentPlayer === aiPlayer) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        playSound('win');
    } else if (gameBoard.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a draw!";
        gameOver = true;
        playSound('draw');
    } else {
        currentPlayer = aiPlayer;
        statusDisplay.textContent = `AI (${aiPlayer})'s turn`;
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let availableCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            availableCells.push(i);
        }
    }

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameBoard[randomIndex] = aiPlayer;
    cells[randomIndex].textContent = aiPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `AI (${aiPlayer}) wins!`;
        gameOver = true;
        playSound('win');
    } else if (gameBoard.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a draw!";
        gameOver = true;
        playSound('draw');
    } else {
        currentPlayer = humanPlayer;
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(combination);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function restartGame() {
    location.reload();
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);
