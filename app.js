const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    size: 20,
    color: "#FFD700",
    speed: 10
};

const obstacles = [];
let gameOver = false;

function createObstacle() {
    const size = 20;
    const x = Math.random() * (canvas.width - size);
    obstacles.push({ x, y: 0, size, speed: 2 });
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.y += obs.speed;
        ctx.fillStyle = "white";
        ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
        
        if (obs.y > canvas.height) {
            gameOver = true;
            showRestartButton();
        }

        const dx = player.x - (obs.x + obs.size / 2);
        const dy = player.y - (obs.y + obs.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < player.size + obs.size / 2) {
            obstacles.splice(i, 1);
        }
    }

    requestAnimationFrame(update);
}

function movePlayer(event) {
    if (event.clientX) {
        player.x = event.clientX;
    }
}

document.addEventListener("mousemove", movePlayer);
document.addEventListener("touchmove", (event) => {
    player.x = event.touches[0].clientX;
});

setInterval(createObstacle, 1000);
update();

function showRestartButton() {
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    restartBtn.style.position = "absolute";
    restartBtn.style.top = "50%";
    restartBtn.style.left = "50%";
    restartBtn.style.transform = "translate(-50%, -50%)";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "20px";
    restartBtn.addEventListener("click", () => location.reload());
    document.body.appendChild(restartBtn);
}
