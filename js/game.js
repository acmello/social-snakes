function Game(){
  var _canvas, _ctx; 
  var _gridsize = 10;
  var _dir = 'right';
  var _currentPos = {'x': 10, 'y': 10};
  var _currentFoodPos = {'x': 30, 'y': 30};
  var _game = this;
<<<<<<< HEAD
  var _randomList = [10, ,20, 40, 80, 90, 70, 200, 300, 140, 220, 180, 260];
=======
>>>>>>> lots of changes
  var snakeBody = [];
  var loop;
  var allowKeys = true;
  var length = 3;
  var score = 0;

  this.init = function(){
    _canvas = document.getElementById("canvas");
    _ctx = _canvas.getContext ? _canvas.getContext("2d") : null;
    _game.start();
  };
  
  this.start = function(){
    $("#score").text("Score : " + score);
    _game.drawSnake();
    _game.generateRandomFood();
    _game.playGame();
  };
  
  this.drawSnake = function(){
    if (snakeBody.some(_game.hasEatenItself)) {
      _game.gameOver();
      return false;
    }
    
    snakeBody.push([_currentPos['x'],_currentPos['y']]);
    _ctx.fillStyle = 'rgb(59, 89, 152)';
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
    
    if(_currentPos['x'] < (canvas.width - _gridsize)) 
      _currentPos['x'] = _currentPos['x'] + _gridsize;
    
    _game.drawSnake();   
  };

  this.moveLeft = function(){
    _game.detectCollision();
    
    if(_currentPos['x'] > 0)
      _currentPos['x'] = _currentPos['x'] - _gridsize;
    
    _game.drawSnake();   
  };

  this.moveUp = function(){
    _game.detectCollision();
    
    if(_currentPos['y'] > 0)
      _currentPos['y'] = _currentPos['y'] - _gridsize;

    _game.drawSnake();   
  };

  this.moveDown = function(){
    _game.detectCollision();
   
    if(_currentPos['y'] < (canvas.height - _gridsize))
      _currentPos['y'] = _currentPos['y'] + _gridsize;
   
    _game.drawSnake();   
  };

  this.keyBoardHandler = function(){
      $(document).bind('keypress', function(ev){
        var keyCode = (ev.keyCode ? ev.keyCode : ev.which);
        switch(keyCode){
          case 119:
            if(_dir === 'down') { return false; }
            _dir = 'up';
            _game.moveUp();
            break;
          case 97:
            if(_dir === 'right') { return false; }
            _dir = 'left';
            _game.moveLeft();
            break;
          case 115:
            if(_dir === 'up') { return false; } 
            _dir = 'down';
            _game.moveDown();
            break;
          case 100:
            if(_dir === 'left') { return false; }
            _dir = 'right';
            _game.moveRight();
            break;
        }
     }); 
  };

  this.generateRandomFood = function(){
    var x = Math.floor(Math.random()*(_canvas.width/_gridsize))*_gridsize;
    var y = Math.floor(Math.random()*(_canvas.width/_gridsize))*_gridsize;
    
    _currentFoodPos['x'] = x;
    _currentFoodPos['y'] = y;
    
    _game.drawFood();
  };

  this.drawFood = function(){
    _ctx.fillStyle = 'rgb(200,0,0)';
    _ctx.fillRect(_currentFoodPos['x'],_currentFoodPos['y'], _gridsize, _gridsize);
  };

  this.detectCollision = function(){
    if(_currentPos['x'] === _currentFoodPos['x'] && _currentPos['y'] === _currentFoodPos['y']){
      _game.generateRandomFood();
      _game.increaseScore();
      length++; 
    }else if(_currentPos['x'] === 0 || _currentPos['y'] === 0){
      _game.gameOver();
    }else if(_currentPos['x'] === 390 || _currentPos['y'] === 390){  
      game.gameOver();
    }  
  };

  this.gameOver = function(){
    clearInterval(loop);
    $(document).unbind('keypress');
    
    _ctx.clearRect(_currentFoodPos['x'],_currentFoodPos['y'], _gridsize, _gridsize);
    
    for(var i = 0; i <= length; i++){
      var itemRemoved = snakeBody.shift();
      try {
        _ctx.clearRect(itemRemoved[0],itemRemoved[1], _gridsize, _gridsize);
      } catch(err){
        console.log(_currentPos['x'],_currentPos['y']);
        _ctx.clearRect(_currentPos['x'],_currentPos['y'], _gridsize, _gridsize);
      } 
    }
    
    _game.restoreDefault();
    _game.showMessage();
    
    
  };

  this.increaseScore = function(){
    score += 10;
    $("#score").text("Score : " + score);
  };

  this.showMessage = function(){
    allowKeys = false;
    $(function() {
      $("#dialog-message").dialog({
        title: "Social Snake say :",
        width: 290,
        height: 200,
        resizable: false,
        modal: true,
        buttons: {
          Yeah : function() {
            $(this).dialog("close");
            _game.init();
          },
          Nope : function() {
            $(this).dialog("close");
          }
        } 
      });
    }); 
  };

  this.restoreDefault = function(){
    _currentPos['x'] = 10;
    _currentPos['y'] = 10;
    length = 3;
    score = 0;
    _dir = 'right';
  };

  this.hasEatenItself = function(element, index, array) {
    return (element[0] == _currentPos['x'] && element[1] == _currentPos['y']);  
  };
}

var game = new Game();
window.onload = game.init;