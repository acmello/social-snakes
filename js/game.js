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
  this.scoreIncrement = 5;
  this.speedDecrement = 2;

  var game = this;
  var snake;
  var food;
  var score;
  var speed = 100;
  var gameLoop;
  var paused = true;
  var allowPressKeys = true;
  
  var scoreElement = document.getElementById("score");

  this.init = function() {
    snake = new Snake(game);
    food = new Food(game);
    game.startGame();
    var img = $("#img_gameover");
    img.hide();
  };

  this.startGame = function() {
    // initialize the score with 0
    game.scoreInit();

    // draw the snake for the very first time
    snake.draw();

    // draw the food for the very first time
    food.generateRandomPosition();

    // game loop, responsible to move stuff in a 60 FPS
    game.updateAndRender();
  };

  $(document).bind("keydown", function(ev) {
    
    var keyCode = (ev.keyCode ? ev.keyCode : ev.which);
    // if its paused and key code is not space 
    // should prevent the movement.
    if (game.paused && keyCode !== 32) return

    switch (keyCode) {
      case 37:
        if (snake.direction === 'right') {
          return false;
        }
        snake.direction = 'left';
        break;

      case 38:
        if (snake.direction === 'down') {
          return false;
        }
        snake.direction = 'up';
        break;

      case 39:
        if (snake.direction === 'left') {
          return false;
        }
        snake.direction = 'right';
        break;
      
      case 40:
        if (snake.direction === 'up') {
          return false;
        }
        snake.direction = 'down';
        break;

      case 32:
        game.paused = !game.paused;
        game.pause();
        break;
    }

    ev.preventDefault();
  });

  this.gameOver = function() {
    clearInterval(gameLoop);
    speed = 100;
    food.clear();
    snake.clear();
    game.sendScore();
    game.showMessage();
  };

  this.scoreInit = function() {
    scoreElement.innerHTML = 0;
  }

  this.scoreHandler = function() {
    var score = scoreElement.innerHTML;
    // if there's no value at first, set it to 0
    if (isNaN(score)) {
      score = 0;
    } else {
      score = new Number(score);
      // otherwise increment it 
      score += game.scoreIncrement;
      // check to see if the remainer is 2
      // then increase the speed
      if (score % 2) {
        speed -= game.speedDecrement;
      }
    }
    // rerenders the score on the screen
    scoreElement.innerHTML = score;
    // send to facebook
    game.sendScore();
  };

  this.pause = function() {
    allowPressKeys = !allowPressKeys;
    var img = $("#img_pause");
    if (game.paused) {
      game.playPauseSound();
      img.fadeIn(100);
      clearInterval(gameLoop);
    } else {
      game.playUnpauseSound();
      img.fadeOut(100);
      game.updateAndRender();
    }
  };

  this.playPauseSound = function() {
    var sound = $("#sound_pause")[0];
    sound.play();    
  }
  this.playUnpauseSound = function() {
    var sound = $("#sound_unpause")[0];
    sound.play();        
  }

  this.updateAndRender = function() {
    gameLoop = setInterval(function() {
      if (snake.collidesWith(food)) {
        food.generateRandomPosition();
        game.scoreHandler();
      }
      food.draw();
      snake.move();
    }, speed);
  };

  this.showMessage = function() {
    //
    var img = $("#img_gameover");
    img.show();
    //
    if (confirm("You're dead dude! Wanna start it over?")) {
      game.init();
    } else {
      window.location.href = ".";
    }
  };

  this.sendScore = function() {
    var score = scoreElement.innerHTML;
    scoreboardWrite(score);
  }
}