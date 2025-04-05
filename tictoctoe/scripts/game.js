const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let isPlayerTurn = true; // Oyunun kiminle başlayacağını belirler
const board = Array(9).fill(null);
const resetButton = document.getElementById('resetButton');
const difficultySelect = document.getElementById('difficulty');
let difficulty = difficultySelect.value;

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

let clickSoundX, clickSoundO;

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
});

function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', () => resetGame(false));
}

function handleClick(e) {
    if (!clickSoundX || !clickSoundO) {
        clickSoundX = new Audio('assets/sounds/click_x.wav');
        clickSoundO = new Audio('assets/sounds/click_o.wav');
    }

    const index = e.target.dataset.index;
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer === 'X' ? 'x-symbol' : 'o-symbol');
    playClickSound(currentPlayer);
    let result = checkWinner();
    if (result) {
        if (result === 'tie') {
            showResult('Berabere!');
        } else {
            showResult(`${result.player} kazandı!`);
            highlightWinningCells(result.combination, result.player);
            updateScore(result.player); // Skoru güncelle
        }
        resetButton.classList.remove('hidden');
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
        setTimeout(computerMove, 1000); // 1 saniye gecikme
    }
}

function playClickSound(player) {
    if (player === 'X') {
        clickSoundX.play();
    } else {
        clickSoundO.play();
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
    playClickSound('O');
    let result = checkWinner();
    if (result) {
        if (result === 'tie') {
            showResult('Berabere!');
        } else {
            showResult(`${result.player} kazandı!`);
            highlightWinningCells(result.combination, result.player);
            updateScore(result.player); // Skoru güncelle
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

    if (difficulty === 'easy' && depth >= 1) {
        return 0;
    } else if (difficulty === 'medium' && depth >= 3) {
        return 0;
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
