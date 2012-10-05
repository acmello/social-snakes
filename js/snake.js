function Snake(game) {
  this.x = 10;
  this.y = 10;
  this.direction = 'right';
  this.snakeBody = [];

  var snake = this;

  var length = 3;

  this.draw = function() {
    if (this.snakeBody.some(snake.hasEatenItself)) {
      game.gameOver();
    }

    this.snakeBody.push([snake.x, snake.y]);
    game.ctx.fillStyle = 'rgb(59, 89, 152)';
    game.ctx.fillRect(snake.x, snake.y, game.gridSize, game.gridSize);

    if (this.snakeBody.length > length) {
      var itemRemoved = this.snakeBody.shift();
      game.ctx.clearRect(itemRemoved[0], itemRemoved[1], game.gridSize, game.gridSize);
    }
  };

  this.move = function() {
    switch (snake.direction) {
    case 'right':
      snake.moveRight();
      break;
    case 'left':
      snake.moveLeft();
      break;
    case 'up':
      snake.moveUp();
      break;
    case 'down':
      snake.moveDown();
      break;
    }
  };

  this.moveRight = function() {
    if (snake.x < (game.canvas.width - game.gridSize)) snake.x = snake.x + game.gridSize;

    snake.draw();
  };

  this.moveLeft = function() {
    if (snake.x > 0) snake.x = snake.x - game.gridSize;

    snake.draw();
  };

  this.moveUp = function() {
    if (snake.y > 0) snake.y = snake.y - game.gridSize;

    snake.draw();
  };

  this.moveDown = function() {
    if (snake.y < (game.canvas.height - game.gridSize)) snake.y = snake.y + game.gridSize;

    this.draw();
  };

  this.collidesWith = function(element) {
   //console.log(snake.x + " => " + (element.x - game.gridSize) + " && " + snake.x + " < " + (element.x - game.gridSize))
    if (!(((snake.y + game.gridSize) <= element.y) ||
        (snake.y >= (element.y + game.gridSize)) ||
        ((snake.x + game.gridSize) <= element.x ) ||
        (snake.x >= (element.x + game.gridSize)))) {

      length++;
      return true;
    }
    return false;
  };

  this.clear = function() {
    for (var i = 1; i <= length; i++) {
      // if there's nothing in the body, returns the current position to be cleaned
      var itemRemoved = this.snakeBody.length == 0 ? [
        [0, 0]
      ] : this.snakeBody.shift();
      game.ctx.clearRect(itemRemoved[0], itemRemoved[1], game.gridSize, game.gridSize);
    }
    // workaround, ugly i know...
    snake.x = undefined, snake.y = undefined;
  };

  this.hasEatenItself = function(element, index, array) {
    return (element[0] == snake.x && element[1] == snake.y);
  };

}