let scoreX = 0;
let scoreO = 0;
const winningScore = 5;

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = scoreX;
        if (scoreX === winningScore) {
            showFinalResult('OYUN BİTTİ. KAZANAN X');
        }
    } else if (winner === 'O') {
        scoreO++;
        document.getElementById('scoreO').textContent = scoreO;
        if (scoreO === winningScore) {
            showFinalResult('OYUN BİTTİ. KAZANAN O');
        }
    }
}

function showFinalResult(message) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'final-result';
    resultDiv.textContent = message;
    document.body.appendChild(resultDiv);

    const playAgainDiv = document.createElement('div');
    playAgainDiv.className = 'play-again';
    playAgainDiv.innerHTML = `
        <p>Yeniden oynamak ister misiniz?</p>
        <button id="yesButton">Evet</button>
        <button id="noButton">Hayır</button>
    `;
    document.body.appendChild(playAgainDiv);

    document.getElementById('yesButton').addEventListener('click', () => {
        resetGame(true);
        document.body.removeChild(resultDiv);
        document.body.removeChild(playAgainDiv);
    });

    document.getElementById('noButton').addEventListener('click', () => {
        disableGame();
        document.body.removeChild(playAgainDiv);
    });
}

function disableGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    resetButton.classList.remove('hidden');
}