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
  var paused = false;
  var lastPressedKey = undefined;
  
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

    // calling the event handler to control keyboard
    game.addEventHandler();
  };


  this.addEventHandler = function() {
    $(document).bind("keydown", function(ev) {

      var validKeys = [ 32, 37, 38, 39, 40 ];

      var keyCode = (ev.keyCode ? ev.keyCode : ev.which);

      game.lastPressedKey = keyCode;

      if ( validKeys.indexOf(game.lastPressedKey) > -1 ) {
        ev.preventDefault();
      }
    
    });
  };

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
    var img = $("#img_pause");
    if (game.paused) {
      game.playPauseSound();
      img.fadeIn(100);
    } else {
      game.playUnpauseSound();
      img.fadeOut(100);
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
      var keyCode = game.lastPressedKey;
      if ( ! game.paused ) {
        switch (keyCode) {
          case 37:
            if (snake.direction != 'right') {
              snake.direction = 'left';
            }
            break;
          case 38:
            if (snake.direction != 'down') {
              snake.direction = 'up';
            }
            break;
          case 39:
            if (snake.direction != 'left') {
              snake.direction = 'right';
            }
            break;
          case 40:
            if (snake.direction != 'up') {
              snake.direction = 'down';
            }
            break;
        }
        if (snake.collidesWith(food)) {
          food.generateRandomPosition();
          game.scoreHandler();
        }
        food.draw();
        snake.move();
      }
      if ( keyCode == 32 ) {
        game.paused = !game.paused;
        game.pause();
      }
      game.lastPressedKey = undefined;
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