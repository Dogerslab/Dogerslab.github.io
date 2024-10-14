function startCatchGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<canvas id="catchCanvas" width="300" height="300"></canvas>';
    
    const canvas = document.getElementById('catchCanvas');
    const ctx = canvas.getContext('2d');
    
    let basketX = 130;
    const basketWidth = 40;
    const basketHeight = 20;
    const basketSpeed = 3; // Slower basket speed
    let objects = [];
    let score = 0;
    let gameOver = false;
    const keys = {}; // Track key states
    let spawnCounter = 0; // Counter to control spawning
    
    function drawBasket() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
    }
    
    function createObject() {
        const x = Math.floor(Math.random() * (canvas.width - 10)); // Random position for the object
        objects.push({ x: x, y: 0 });
    }
    
    function drawObjects() {
        ctx.fillStyle = 'red';
        objects.forEach(object => {
            ctx.fillRect(object.x, object.y, 10, 10);
        });
    }
    
    function updateObjects() {
        objects.forEach(object => {
            object.y += 2;
        });
        
        objects = objects.filter(object => {
            if (object.y > canvas.height) {
                gameOver = true;
                return false;
            }
            return true;
        });
    }
    
    function checkCatch() {
        objects.forEach((object, index) => {
            if (object.y + 10 >= canvas.height - basketHeight && object.x >= basketX && object.x <= basketX + basketWidth) {
                score++;
                objects.splice(index, 1);
            }
        });
    }
    
    function update() {
        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText('Game Over', 100, 150);
            ctx.fillText(`Score: ${score}`, 100, 180);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update basket position based on key states
        if (keys['ArrowLeft'] && basketX > 0) {
            basketX -= basketSpeed;
        }
        if (keys['ArrowRight'] && basketX < canvas.width - basketWidth) {
            basketX += basketSpeed;
        }
        
        drawBasket();
        updateObjects();
        drawObjects();
        checkCatch();
        
        // Control the spawning rate
        if (spawnCounter % 60 === 0) { // Adjust the number for desired interval
            createObject();
        }
        spawnCounter++;
        
        requestAnimationFrame(update);
    }
    
    document.addEventListener('keydown', function(event) {
        keys[event.code] = true;
    });
    
    document.addEventListener('keyup', function(event) {
        keys[event.code] = false;
    });
    
    update();
}

// Export the function if using modules
if (typeof module !== 'undefined') {
    module.exports = startCatchGame;
}
