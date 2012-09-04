$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var game = new Game(canvas, ctx);
  game.init();
});

function Game(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.gridSize = 10;

  var game = this;
  var snake;
  var food;
  var score;
  var speed = 100;
  var gameLoop;
  var paused = true;
  var allowPressKeys = true;

  var scoreElement = document.getElementById("score");
  var scoreTagText = scoreElement.innerText;

  this.init = function() {
    snake = new Snake(game);
    food = new Food(game);
    game.startGame();
  };

  this.startGame = function() {
    // initialize the score with 0
    game.scoreHandler();

    // draw the snake for the very first time
    snake.draw();

    // draw the food for the very first time
    food.generateRandomPosition();

    // game loop, responsible to move stuff in a 60 FPS
    game.updateAndRender();
  };


  document.onkeypress = function(ev) {
    if (!allowPressKeys) return

    var keyCode = (ev.keyCode ? ev.keyCode : ev.which);

    switch (keyCode) {
    case 119:
      if (snake.direction === 'down') {
        return false;
      }
      snake.direction = 'up';
      snake.moveUp();
      break;

    case 97:
      if (snake.direction === 'right') {
        return false;
      }
      snake.direction = 'left';
      snake.moveLeft();
      break;

    case 115:
      if (snake.direction === 'up') {
        return false;
      }
      snake.direction = 'down';
      snake.moveDown();
      break;

    case 100:
      if (snake.direction === 'left') {
        return false;
      }
      snake.direction = 'right';
      snake.moveRight();
      break;
    }
  };

  document.onkeydown = function(ev) {
    var keyCode = (ev.keyCode ? ev.keyCode : ev.which);

    switch (keyCode) {
    case 32:
      game.paused = !game.paused;
      game.pause();
      break;
    }
  };

  this.gameOver = function() {
    clearInterval(gameLoop);
    speed = 100;
    food.clear();
    snake.clear();
    game.showMessage();
  };

  this.scoreHandler = function() {
    // if there's no value at first, set it to 0
    if (isNaN(score)) {
      score = 0;
    } else {
      // otherwise increment it 
      score += 1;
      // check to see if the remainer is 2
      // then increase the speed
      if (score % 2) {
        speed -= 1;
      }
    }
    // rerenders the score on the screen
    scoreElement.innerText = scoreTagText + ' ' + score;
  };

  this.pause = function() {
    allowPressKeys = !allowPressKeys;
    // TODO add image related to the pause function
    if (game.paused) {
      clearInterval(gameLoop);
    } else {
      game.updateAndRender();
    }
  }

  this.updateAndRender = function() {
    gameLoop = setInterval(function() {
      if (snake.collidesWith(food)) {
        food.generateRandomPosition();
        game.scoreHandler();
      }
      snake.move();
    }, speed);
  };

  this.showMessage = function() {
    score = 0;
    if (confirm("You're dead dude! Wanna start it over?")) {
      game.init();
    } // restart }
    else {
      score = undefined
      window.location = "index.html";
    }
  };
}