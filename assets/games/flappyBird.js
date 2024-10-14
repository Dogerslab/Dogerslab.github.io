function startFlappyBird() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<canvas id="flappyCanvas" width="300" height="300"></canvas>';
    
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    
    let birdY = 150;
    let gravity = 0.5;  // Balanced gravity
    let lift = -6;      // Softer lift for a less pronounced jump
    let velocity = 0;
    let maxVelocity = 10; // Cap the maximum velocity
    let obstacles = [];
    let frameCount = 0;
    let gameOver = false;
    
    function drawBird() {
        ctx.fillStyle = 'red';
        ctx.fillRect(50, birdY, 20, 20);
    }
    
    function createObstacle() {
        const height = Math.floor(Math.random() * (canvas.height - 150)) + 50;
        const gap = 100;
        obstacles.push({
            x: canvas.width,
            top: height,
            bottom: height + gap
        });
    }
    
    function drawObstacles() {
        ctx.fillStyle = 'green';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, 0, 20, obstacle.top);
            ctx.fillRect(obstacle.x, obstacle.bottom, 20, canvas.height - obstacle.bottom);
        });
    }
    
    function updateObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.x -= 2;
        });
        
        if (obstacles.length > 0 && obstacles[0].x < -20) {
            obstacles.shift();
        }
        
        if (frameCount % 120 === 0) {
            createObstacle();
        }
    }
    
    function checkCollision() {
        obstacles.forEach(obstacle => {
            if (50 < obstacle.x + 20 && 50 + 20 > obstacle.x) {
                if (birdY < obstacle.top || birdY + 20 > obstacle.bottom) {
                    gameOver = true;
                }
            }
        });
    }
    
    function update() {
        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText('Game Over', 100, 150);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        velocity += gravity;
        velocity = Math.min(velocity, maxVelocity); // Cap the velocity
        birdY += velocity;
        
        if (birdY > canvas.height - 20) {
            birdY = canvas.height - 20;
            velocity = 0;
        }
        
        if (birdY < 0) {
            birdY = 0;
            velocity = 0;
        }
        
        drawBird();
        updateObstacles();
        drawObstacles();
        checkCollision();
        
        frameCount++;
        requestAnimationFrame(update);
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'ArrowUp') {
            velocity = lift; // Reset velocity to lift for consistent jumps
        }
    });
    
    update();
}

// Export the function if using modules
if (typeof module !== 'undefined') {
    module.exports = startFlappyBird;
}
