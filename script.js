const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let isTwoPlayer = false;
let rightPlayerIsHuman = false;

function initCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.8, 800);
    canvas.height = Math.min(window.innerHeight * 0.6, 500);
}

document.getElementById('one-player').addEventListener('click', () => {
    isTwoPlayer = false;
    rightPlayerIsHuman = false;
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('game-container').style.display = 'flex';
    initCanvas();
});

document.getElementById('two-player').addEventListener('click', () => {
    isTwoPlayer = true;
    rightPlayerIsHuman = true;
    document.getElementById('right-player').textContent = 'PLAYER 2';
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('game-container').style.display = 'flex';
    initCanvas();
});

window.addEventListener('resize', initCanvas);
initCanvas();

let gameStarted = false;
let gamePaused = false;

function startGame() {
    if(!gameStarted) {
        gameStarted = true;
        gamePaused = false;
        console.log('Game started');
    }
}

function togglePause() {
    gamePaused = !gamePaused;
    console.log('Game paused:', gamePaused);
}

function resetGame() {
    gameStarted = false;
    gamePaused = false;
    console.log('Game reset');
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('pause-btn').addEventListener('click', togglePause);
document.getElementById('reset-btn').addEventListener('click', resetGame);