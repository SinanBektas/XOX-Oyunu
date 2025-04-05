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

function resetGame(isFinal = false) {
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

    if (isFinal) {
        scoreX = 0;
        scoreO = 0;
        document.getElementById('scoreX').textContent = scoreX;
        document.getElementById('scoreO').textContent = scoreO;
        const finalResultDiv = document.querySelector('.final-result');
        if (finalResultDiv) {
            document.body.removeChild(finalResultDiv);
        }
    }
}