$(document).ready(function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var game = new Game(canvas, ctx);
	game.init();
});

function Game(canvas, ctx){
	this.canvas = canvas;
  this.ctx = ctx;
  this.gridSize = 10;
  
  var game = this;
  var snake;
  var food;  
  var score;
  var gameLoop;
  
  var scoreElement = document.getElementById("score");	
  var scoreTagText = scoreElement.innerText;

  this.init = function(){
  	snake = new Snake(game);
  	food = new Food(game);
  	game.startGame();
  };
  
  this.startGame = function(){
	  // initialize the score with 0
		game.scoreHandler();
		
		// draw the snake for the very first time
		snake.draw();
	    
		// draw the food for the very first time
		food.generateRandomPosition();
	    
		// starts the keyboard handle, it means you can
		// you can start to use keyboard commands from now on
		game.keyBoardHandler();
		
		// game loop, responsible to move stuff in a 60 FPS
		gameLoop = setInterval(function(){
			if(snake.collidesWith(food)){
				food.generateRandomPosition();
				game.scoreHandler();
			}	
			snake.move();
		}, 100); 
  };

  this.keyBoardHandler = function(){
  	$(document).bind('keypress', function(ev){
			
			var keyCode = (ev.keyCode ? ev.keyCode : ev.which);
			
			switch(keyCode){
    	case 119:
				if(snake.direction === 'down') { return false; }
        	snake.direction = 'up';
          snake.moveUp();
          break;
      case 97:
				if(snake.direction === 'right') { return false; }
        	snake.direction = 'left';
          snake.moveLeft();
          break;
      case 115:
      	if(snake.direction === 'up') { return false; } 
        	snake.direction = 'down';
          snake.moveDown();
          break;
      case 100:
				if(snake.direction === 'left') { return false; }
        	snake.direction = 'right';
          snake.moveRight();
          break;
    	}
    }); 
  };  

	this.gameOver = function(){
		clearInterval(gameLoop);
  	$(document).unbind('keypress');
  	food.clear();
  	snake.clear();
  	game.showMessage();
	};

	this.scoreHandler = function() {
		if( isNaN( score ) ) { score = 0; }
	 	else { score += 10; }
		
		// rerenders the score on the screen
   	scoreElement.innerText = scoreTagText+score;
  };

  this.showMessage = function(){
    if( confirm("You're dead dude! Wanna start it over?") )
      game.init();
  };

  this.restart = function(){
  	food.clear();
  	snake.clear();
  	game.init();
  }
}