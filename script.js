const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let isTwoPlayer = false;
let rightPlayerIsHuman = false;

function initCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.8, 800);
    canvas.height = Math.min(window.innerHeight * 0.6, 500);
    
    net.x = canvas.width / 2 - net.width / 2;
    net.height = canvas.height;
    
    user.x = 10;
    user.y = canvas.height / 2 - user.height / 2;
    
    ai.x = canvas.width - 20;
    ai.y = canvas.height / 2 - ai.height / 2;
    
    resetBall();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = ball.velocityX > 0 ? -5 : 5;
    ball.velocityY = Math.random() * 10 - 5;
    ball.inPlay = false;
}

function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        ctx.fillStyle = '#ff0099';
        ctx.fillRect(net.x, i, net.width, 10);
    }
}

function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall() {
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function render() {
    ctx.fillStyle = '#120458';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawNet();
    drawPaddle(user.x, user.y, user.width, user.height, '#ff0099');
    drawPaddle(ai.x, ai.y, ai.width, ai.height, '#ff0099');
    drawBall();
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

const net = {
    x: 0,
    y: 0,
    width: 4,
    height: 0
};

const user = {
    x: 0,
    y: 0,
    width: 10,
    height: 100,
    score: 0,
    speed: 8
};

const ai = {
    x: 0,
    y: 0,
    width: 10,
    height: 100,
    score: 0,
    speed: 8
};

const ball = {
    x: 0,
    y: 0,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    inPlay: false
};

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
render();