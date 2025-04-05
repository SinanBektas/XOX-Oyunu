const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let isPlayerTurn = true; // Oyunun kiminle başlayacağını belirler
const board = Array(9).fill(null);
const resetButton = document.getElementById('resetButton');
const winningLine = document.getElementById('winningLine');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer === 'X' ? 'x-symbol' : 'o-symbol');
    let result = checkWinner();
    if (result) {
        if (result === 'tie') {
            showResult('Berabere!');
        } else {
            showResult(`${result.player} kazandı!`);
            highlightWinningCells(result.combination, result.player);
        }
        resetButton.classList.remove('hidden');
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
        computerMove();
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('o-symbol');
    let result = checkWinner();
    if (result) {
        if (result === 'tie') {
            showResult('Berabere!');
        } else {
            showResult(`${result.player} kazandı!`);
            highlightWinningCells(result.combination, result.player);
        }
        resetButton.classList.remove('hidden');
        return;
    }
    currentPlayer = 'X';
}

function minimax(board, depth, isMaximizing) {
    let scores = {
        'X': -1,
        'O': 1,
        'tie': 0
    };

    let result = checkWinner();
    if (result !== null) {
        return scores[result.player] || scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    let winner = null;
    let winningCombination = null;
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            winningCombination = combination;
        }
    });

    if (winner === null && board.every(cell => cell !== null)) {
        return 'tie';
    } else if (winner) {
        return { player: winner, combination: winningCombination };
    } else {
        return null;
    }
}

function showResult(message) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.textContent = message;
    document.body.appendChild(resultDiv);
}

function highlightWinningCells(combination, player) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = player === 'X' ? '#FFD700' : '#FF073A';
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-symbol', 'o-symbol');
        cell.style.backgroundColor = ''; // Arka plan rengini sıfırla
    });
    isPlayerTurn = !isPlayerTurn; // Sırayı değiştir
    currentPlayer = isPlayerTurn ? 'X' : 'O';
    if (currentPlayer === 'O') {
        computerMove();
    }
    const resultDiv = document.querySelector('.result');
    if (resultDiv) {
        document.body.removeChild(resultDiv);
    }
    resetButton.classList.add('hidden');
}