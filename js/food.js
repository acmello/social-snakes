function Food(game){
	this.x = 0;
	this.y = 0;
	
	var food = this;
	
	this.generateRandomPosition = function(){
		var x = Math.floor(Math.random()*(game.canvas.width/game.gridSize))*game.gridSize;
		var y = Math.floor(Math.random()*(game.canvas.width/game.gridSize))*game.gridSize;
		
		console.log("food -> x|y : "+ x +" "+y); 
		
		food.x = x;
		food.y = y;
		
		food.draw();
	};
	
	this.draw = function(){
		var ctx = game.ctx;
		ctx.fillStyle = 'rgb(200,0,0)';
		ctx.fillRect(food.x, food.y, game.gridSize, game.gridSize);
	};
	
	// clear element on the screen
	this.clear = function(){
		game.ctx.clearRect( food.x, food.y, game.gridsize, game.gridsize );
	};
}