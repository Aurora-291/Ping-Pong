const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let isTwoPlayer = false;
let rightPlayerIsHuman = false;
let gameStarted = false;
let gamePaused = false;
let difficultyLevel = 0.09;
let lastScoreTime = 0;
let scoreDelay = 1000;

const hitSound = new Audio('https://raw.githubusercontent.com/the-coding-pie/Ping-Pong-Javascript/master/sounds/hitSound.wav');
const scoreSound = new Audio('https://raw.githubusercontent.com/the-coding-pie/Ping-Pong-Javascript/master/sounds/scoreSound.wav');
const wallHitSound = new Audio('https://raw.githubusercontent.com/the-coding-pie/Ping-Pong-Javascript/master/sounds/wallHitSound.wav');

const themes = {
    arcade: {
        background: '#120458',
        paddle: '#ff0099',
        ball: '#00ff00',
        net: '#ff0099'
    },
    synthwave: {
        background: '#1a0f33',
        paddle: '#ff00ff',
        ball: '#00ffff',
        net: '#ff00ff'
    },
    matrix: {
        background: '#000000',
        paddle: '#00ff00',
        ball: '#00ff00',
        net: '#003300'
    },
    light: {
        background: '#f5f5f5',
        paddle: '#2196f3',
        ball: '#03a9f4',
        net: '#2196f3'
    },
    dark: {
        background: '#121212',
        paddle: '#bb86fc',
        ball: '#03dac6',
        net: '#bb86fc'
    }
};

let currentTheme = themes.arcade;

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

let upArrowPressed = false;
let downArrowPressed = false;
let wPressed = false;
let sPressed = false;

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
        ctx.fillStyle = currentTheme.net;
        ctx.fillRect(net.x, i, net.width, 10);
    }
}

function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall() {
    ctx.fillStyle = currentTheme.ball;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function movePaddle(paddle, upPressed, downPressed) {
    if(upPressed && paddle.y > 0) {
        paddle.y -= paddle.speed;
    }
    if(downPressed && paddle.y < canvas.height - paddle.height) {
        paddle.y += paddle.speed;
    }
}

function moveAI() {
    const aiCenter = ai.y + ai.height / 2;
    const ballCenter = ball.y;
    const difference = ballCenter - aiCenter;
    
    if(Math.abs(difference) > ai.speed) {
        if(difference > 0) {
            ai.y += ai.speed * difficultyLevel;
        } else {
            ai.y -= ai.speed * difficultyLevel;
        }
    }
}

function collisionDetect(player, ball) {
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;
    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    
    return ballRight > playerLeft && ballLeft < playerRight && ballBottom > playerTop && ballTop < playerBottom;
}

function updateBall() {
    if(!ball.inPlay) return;
    
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    if(ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        wallHitSound.play().catch(() => {});
        ball.velocityY = -ball.velocityY;
    }
    
    const currentTime = Date.now();
    if(currentTime - lastScoreTime >= scoreDelay) {
        if(ball.x + ball.radius >= canvas.width) {
            scoreSound.play().catch(() => {});
            user.score += 1;
            updateScores();
            lastScoreTime = currentTime;
            resetBall();
        }
        if(ball.x - ball.radius <= 0) {
            scoreSound.play().catch(() => {});
            ai.score += 1;
            updateScores();
            lastScoreTime = currentTime;
            resetBall();
        }
    }
    
    const player = (ball.x < canvas.width / 2) ? user : ai;
    if(collisionDetect(player, ball)) {
        hitSound.play().catch(() => {});
        let angle = 0;
        
        if(ball.y < (player.y + player.height / 2)) {
            angle = -1 * Math.PI / 4;
        } else if(ball.y > (player.y + player.height / 2)) {
            angle = Math.PI / 4;
        }
        
        ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);
        ball.speed += 0.2;
    }
}

function update() {
    if(!gameStarted || gamePaused) return;
    
    movePaddle(user, wPressed, sPressed);
    
    if(isTwoPlayer && rightPlayerIsHuman) {
        movePaddle(ai, upArrowPressed, downArrowPressed);
    } else {
        moveAI();
    }
    
    updateBall();
}

function render() {
    ctx.fillStyle = currentTheme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawNet();
    drawPaddle(user.x, user.y, user.width, user.height, currentTheme.paddle);
    drawPaddle(ai.x, ai.y, ai.width, ai.height, currentTheme.paddle);
    drawBall();
}

function startGame() {
    if(!gameStarted) {
        gameStarted = true;
        gamePaused = false;
        ball.inPlay = true;
        gameLoop();
    }
}

function togglePause() {
    gamePaused = !gamePaused;
    if(!gamePaused) {
        gameLoop();
    }
}

function resetGame() {
    user.score = 0;
    ai.score = 0;
    updateScores();
    resetBall();
    gameStarted = false;
    gamePaused = false;
}

function updateScores() {
    document.getElementById('player-score').textContent = user.score;
    document.getElementById('ai-score').textContent = ai.score;
}

function gameLoop() {
    if(!gamePaused) {
        update();
        render();
        requestAnimationFrame(gameLoop);
    }
}

function setTheme(themeName) {
    currentTheme = themes[themeName];
    document.body.className = `theme-${themeName}`;
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-theme') === themeName) {
            btn.classList.add('active');
        }
    });
}

function setupControls() {
    window.addEventListener('keydown', e => {
        switch(e.key.toLowerCase()) {
            case 'w': wPressed = true; break;
            case 's': sPressed = true; break;
            case 'arrowup': upArrowPressed = true; break;
            case 'arrowdown': downArrowPressed = true; break;
            case ' ':
                if(!gameStarted) startGame();
                else if(!ball.inPlay) ball.inPlay = true;
                break;
            case 'p': togglePause(); break;
        }
    });

    window.addEventListener('keyup', e => {
        switch(e.key.toLowerCase()) {
            case 'w': wPressed = false; break;
            case 's': sPressed = false; break;
            case 'arrowup': upArrowPressed = false; break;
            case 'arrowdown': downArrowPressed = false; break;
        }
    });

    const touchControls = {
        'left-up': () => wPressed = true,
        'left-down': () => sPressed = true,
        'right-up': () => upArrowPressed = true,
        'right-down': () => downArrowPressed = true
    };

    const touchReset = {
        'left-up': () => wPressed = false,
        'left-down': () => sPressed = false,
        'right-up': () => upArrowPressed = false,
        'right-down': () => downArrowPressed = false
    };

    Object.keys(touchControls).forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('touchstart', e => {
            e.preventDefault();
            touchControls[id]();
        });
        
        element.addEventListener('touchend', e => {
            e.preventDefault();
            touchReset[id]();
        });
    });
}

document.getElementById('one-player').addEventListener('click', () => {
    isTwoPlayer = false;
    rightPlayerIsHuman = false;
    document.getElementById('right-player').textContent = 'CPU';
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

document.getElementById('start-btn').addEventListener('click', () => {
    if(!gameStarted) startGame();
    else if(!ball.inPlay) ball.inPlay = true;
});

document.getElementById('pause-btn').addEventListener('click', togglePause);
document.getElementById('reset-btn').addEventListener('click', resetGame);

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme')));
});

window.addEventListener('resize', initCanvas);

setupControls();
initCanvas();
render();