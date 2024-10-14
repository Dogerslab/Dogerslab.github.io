// platformer.js

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('game-container').appendChild(canvas);
canvas.width = 800;
canvas.height = 400;

let player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    grounded: false
};

let platforms = [
    { x: 0, y: 350, width: 800, height: 10 },
    { x: 200, y: 250, width: 100, height: 10 },
    { x: 400, y: 200, width: 100, height: 10 },
    { x: 600, y: 300, width: 100, height: 10 }
];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    // Check for ground collision
    player.grounded = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height < platform.y + platform.height &&
            player.y + player.height + player.dy >= platform.y) {
            player.dy = 0;
            player.y = platform.y - player.height;
            player.grounded = true;
        }
    });

    // Jump
    if (player.grounded && keys['ArrowUp']) {
        player.dy = player.jumpPower;
    }

    // Move left and right
    if (keys['ArrowRight']) {
        player.x += player.speed;
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
    }

    // Prevent player from going out of bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
}

// Key controls
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
