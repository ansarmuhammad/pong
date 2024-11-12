// Canvas setup
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Game elements
const paddleWidth = 10, paddleHeight = 80;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 5;

const ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;

// Player scores
let player1Score = 0, player2Score = 0;

// Control keys
let upPressed = false, downPressed = false, wPressed = false, sPressed = false;

// Event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
  if (e.key === "w") wPressed = true;
  if (e.key === "s") sPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
  if (e.key === "w") wPressed = false;
  if (e.key === "s") sPressed = false;
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw paddles
  ctx.fillStyle = "#fff";
  ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20, paddle2Y, paddleWidth, paddleHeight);
  
  // Draw ball
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Paddle movement
  if (wPressed && paddle1Y > 0) paddle1Y -= paddleSpeed;
  if (sPressed && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
  if (upPressed && paddle2Y > 0) paddle2Y -= paddleSpeed;
  if (downPressed && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;

  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY;

  // Ball collision with paddles
  if (ballX <= 20 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX >= canvas.width - 30 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Scoring
  if (ballX < 0) {
    player2Score++;
    resetBall();
  } else if (ballX > canvas.width) {
    player1Score++;
    resetBall();
  }

  // Display scores
  ctx.font = "20px Arial";
  ctx.fillText(`Player 1: ${player1Score}`, 20, 20);
  ctx.fillText(`Player 2: ${player2Score}`, canvas.width - 120, 20);

  requestAnimationFrame(gameLoop);
}

// Reset ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Start the game loop
gameLoop();
