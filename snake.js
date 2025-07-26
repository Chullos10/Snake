//board
var boxSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head`
var snakeX = 10 * boxSize;
var snakeY = 10 * boxSize;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
  board = document.getElementById('board');
  board.height = rows * boxSize;
  board.width = cols * boxSize;
  context = board.getContext('2d'); //Drawing on the board

  placeFood();
  document.addEventListener('keyup', changeDirection);
  //   update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = 'black';
  context.fillRect(0, 0, board.width, board.height); //Clear the board

  context.fillStyle = 'red';
  context.fillRect(foodX, foodY, boxSize, boxSize); //Draw the food
  context.fillStyle = 'lime';

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  snakeX += speedX * boxSize;
  snakeY += speedY * boxSize;
  context.fillRect(snakeX, snakeY, boxSize, boxSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }

  //Game over conditions
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= cols * boxSize ||
    snakeY >= rows * boxSize
  ) {
    gameOver = true;
    context.fillStyle = 'white';
    context.font = '50px Arial';
    context.fillText('Game Over', board.width / 4, board.height / 2);
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      context.fillStyle = 'white';
      context.font = '50px Arial';
      context.fillText('Game Over', board.width / 4, board.height / 2);
      break;
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * boxSize;
  foodY = Math.floor(Math.random() * rows) * boxSize;
}

function changeDirection(e) {
  if (e.code == 'ArrowUp' && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == 'ArrowDown' && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == 'ArrowLeft' && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == 'ArrowRight' && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}
