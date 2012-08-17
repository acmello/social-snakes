function Game(){
  var _canvas, _ctx; 
  var _gridsize = 10;
  var _dir = 'right';
  var _currentPos = {'x': 10, 'y': 10};
  var _currentFoodPos = {'x': 30, 'y': 30};
  var _game = this;
  var _randomList = [10, 40, 80, 90, 70, 200, 300, 140, 220, 180, 200];
  var snakeBody = [];
  var loop;
  var allowKeys = true;
  var length = 3;

  this.init = function(){
    _canvas = document.getElementById("canvas");
    _ctx = _canvas.getContext ? _canvas.getContext("2d") : null;
  
    _game.start();
  };
  
  this.start = function(){
    _game.drawSnake();
    _game.generateRandomFood();
    _game.playGame();
  };
  
  this.drawSnake = function(){
    snakeBody.push([_currentPos['x'],_currentPos['y']]);
    _ctx.fillStyle = 'rgb(200,0,0)';    
    _ctx.fillRect(_currentPos['x'],_currentPos['y'], _gridsize, _gridsize);   
    if(snakeBody.length > length){
      var itemRemoved = snakeBody.shift();
      _ctx.clearRect(itemRemoved[0],itemRemoved[1], _gridsize, _gridsize);  
    }
  };
  
  this.playGame = function(){
    loop = setInterval(_game.move, 100); 
    _game.keyBoardHandler();
  };
  
  this.move = function(){ 
    switch(_dir){
      case 'right':
        _game.moveRight();
        break;
      case 'left':
        _game.moveLeft();
        break;
      case 'up':
        _game.moveUp();
        break;
      case 'down':
        _game.moveDown();
        break;  
    }
  };

  this.moveRight = function(){
    _game.detectCollision();

    if(_currentPos['x'] < (canvas.width - _gridsize)){
      _currentPos['x'] = _currentPos['x'] + _gridsize;
    }
    console.log("SNAKE (X|Y) " + _currentPos['x'] + "," + _currentPos['y']);
    console.log("FOOD  (X|Y) " + _currentFoodPos['x'] + "," + _currentFoodPos['y']);
    _game.drawSnake();   
  };

  this.moveLeft = function(){
    _game.detectCollision();

    if(_currentPos['x'] > 0){
      _currentPos['x'] = _currentPos['x'] - _gridsize;
    }
    console.log("SNAKE (X|Y) " + _currentPos['x'] + "," + _currentPos['y']);
    console.log("FOOD  (X|Y) " + _currentFoodPos['x'] + "," + _currentFoodPos['y']);
    _game.drawSnake();   
  };

  this.moveUp = function(){
    _game.detectCollision();
    
    if(_currentPos['y'] > 0){
      _currentPos['y'] = _currentPos['y'] - _gridsize;
    }
    console.log("SNAKE (X|Y) " + _currentPos['x'] + "," + _currentPos['y']);
    console.log("FOOD  (X|Y) " + _currentFoodPos['x'] + "," + _currentFoodPos['y']);
    _game.drawSnake();   
  };

  this.moveDown = function(){
    _game.detectCollision();

    if(_currentPos['y'] < (canvas.height - _gridsize)){
      _currentPos['y'] = _currentPos['y'] + _gridsize;
    }
    console.log("SNAKE (X|Y) " + _currentPos['x'] + "," + _currentPos['y']);
    console.log("FOOD  (X|Y) " + _currentFoodPos['x'] + "," + _currentFoodPos['y']);
    _game.drawSnake();   
  };

  this.keyBoardHandler = function(){
    $(document).bind('keypress', function(ev){
      var keyCode = (ev.keyCode ? ev.keyCode : ev.which);
      switch(keyCode){
        case 119:
          _dir = 'up';
          _game.moveUp();
          break;
        case 97:
          _dir = 'left';
          _game.moveLeft();
          break;
        case 115: 
          _dir = 'down';
          _game.moveDown();
          break;
        case 100:
          _dir = 'right';
          _game.moveRight();
          break;
      }
    });
  };

  this.generateRandomFood = function(){
    var x = _randomList[Math.floor(Math.random()*_randomList.length)];
    var y = _randomList[Math.floor(Math.random()*_randomList.length)];
    _currentFoodPos['x'] = x;
    _currentFoodPos['y'] = y;
    
    _game.drawFood();
  };

  this.drawFood = function(){
    _ctx.clearRect(_currentFoodPos['x'],_currentFoodPos['y'], _gridsize, _gridsize);
    _ctx.fillStyle = 'rgb(200,0,0)';
    _ctx.fillRect(_currentFoodPos['x'],_currentFoodPos['y'], _gridsize, _gridsize);
  };

  this.detectCollision = function(){
    if(_currentPos['x'] === _currentFoodPos['x'] && _currentPos['y'] === _currentFoodPos['y']){
      _game.generateRandomFood();
      length++; 
    }else if(_currentPos['x'] === 0 || _currentPos['y'] === 0){
      _game.gameOver();
    }else if(_currentPos['x'] === 390 || _currentPos['y'] === 390){  
      game.gameOver();
    }  
  };

  this.gameOver = function(){
    clearInterval(loop); 
    allowKeys = false;
    alert("FUCKING ASSHOLE! The game IS OVER!");
  };
}

var game = new Game();
window.onload = game.init;