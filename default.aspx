<!DOCTYPE html>
<html>
	<head>
		<title>Social Snakes</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="css/style.css"></style>
		<script src="js/jquery-1.8.0.min.js"></script>
<!-- scoreboard api - ->
		<script src="https://ssl731.websiteseguro.com/acasadossims1/zzz/acasadojava/gsb/GSB.js"></script>
<!- - /scoreboard api -->
<!-- custom scoreboard -->
		<link rel="stylesheet" type="text/css" href="css/scoreboard.css"></style>
		<!-- <script src="js/scoreboard.js"></script> -->
		<script src="js/scoreboard-fb.js"></script>
<!-- /custom scoreboard -->
	</head>
	<body>
<!-- facebook -->
		<div id="fb-root"></div>
 		<script src="//connect.facebook.net/en_US/all.js"></script>
<!-- /facebook -->
		<div class="center main_screen_style main_menu">
			<img class="main_title" alt="Social Snakes" src="img/start-screen-main-title.png" title="Social Snakes" /><br />
			<a class="btn btn_new_game" href="game.html" title="start a new game"></a><br />
			<a class="btn btn_how_to_play" href="how-to-play.html" title="learn how to play"></a>
		</div>
<!-- scoreboard api -->
		<div class="main_score_style">
			<div class="block_header">Max Scores:</div>
			<div id="players_and_scores">
				<div id="loading_message">loading...</div>
			</div>
		</div>
<!-- /scoreboard api -->	
	</body>
</html>
