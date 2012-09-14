function Food(game) {
  this.x = 0;
  this.y = 0;

  var food = this;

  this.generateRandomPosition = function() {
    var x = Math.floor(Math.random() * (game.canvas.width / game.gridSize)) * game.gridSize;
    var y = Math.floor(Math.random() * (game.canvas.width / game.gridSize)) * game.gridSize;

    var positionArray = [x, y];

    // console.log("x" + x + " y" + y);

    food.x = x;
    food.y = y;

    // trying to create the element but the snake is already there
    //if( game.snakeBody != undefined && game.snakeBody.some( food.isSnakeHere ) )
    //    food.generateRandomPosition();
    food.draw();
  };

  this.isSnakeHere = function(element, index, array) {
    return (element[0] == food.x && element[0] == food.y);
  };

  this.draw = function() {
    var ctx = game.ctx;
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(food.x, food.y, game.gridSize, game.gridSize);
  };

  // clear element on the screen
  this.clear = function() {
    var ctx = game.ctx;
    ctx.clearRect(food.x, food.y, game.gridSize, game.gridSize);
  };
}