document.addEventListener('DOMContentLoaded', () => {
    // Oyun başlatma ve diğer başlangıç işlemleri
    initGame();

    // Dokunma olaylarını ekleyelim
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('touchstart', handleTouchStart);
        cell.addEventListener('touchend', handleTouchEnd);
    });
});

function handleTouchStart(event) {
    event.preventDefault();
    // Burada dokunma başlangıcında ne yapılacağını belirleyin
}

function handleTouchEnd(event) {
    event.preventDefault();
    // Burada dokunma sonlandığında ne yapılacağını belirleyin
}
