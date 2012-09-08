<!DOCTYPE html>
<html>
	<head>
		<title>Social Snakes</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="css/style.css"></style>
		<script src="js/jquery-1.8.0.min.js"></script>
		<script src="js/facebook.js"></script>
<!-- scoreboard api -->
		<script src="http://www.acasadojava.com.br/gsb/GSB.js"></script>
<!-- /scoreboard api -->
<!-- custom scoreboard -->
		<link rel="stylesheet" type="text/css" href="css/scoreboard.css"></style>
		<script src="js/scoreboard.js"></script>
<!-- /custom scoreboard -->
	</head>
	<body>
		<div id="fb-root"></div>
 		<script src="//connect.facebook.net/en_US/all.js"></script>
		<div class="center main_screen_style main_menu">
			<img class="main_title" alt="Social Snakes" src="img/start-screen-main-title.png" title="Social Snakes" /><br />
			<a class="btn btn_new_game" href="game.html" title="start a new game"></a><br />
			<a class="btn btn_how_to_play" href="how-to-play.html" title="learn how to play"></a>
		</div>
<!-- scoreboard api -->
		<div class="main_score_style">
			<div class="block_header">Scoreboard:</div>
			<ul id="players_and_scores">
				<li class="name"><b class="color">{p}.</b> {name}:</li><li class="score">{score}</li>
			<ul>
		</div>
<!-- /scoreboard api -->
		<div class="current_user_style">
			<div class="block_header">User:</div>
			<div id="current_user" class="block_content">loading...</div>
		</div>
	</body>
</html>
