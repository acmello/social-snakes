$(document).ready(
	function() {
		scoreboardInit();
	}
);

var sb;

function scoreboardInit() {
	sb = new GSB("g6uYq6v3T9bVLoAT1bXKZ9Mn2TLWNs3Q5s7SpB0K5f555MH1ZGeey7i1Ldhw18vN");
	sb.read('scoreboardReadOnReady');
}

function scoreboardReadOnReady(response) {
	//
	var list = $('#players_and_scores');
	list.fadeIn(500);
	list.html('');
	var playerTemplate = '<li class="name"><b class="color">{p}.</b> &nbsp; {name}:</li><li class="score">{score}</li>';
	//
	var status = response['status'];
	if (status == GSB.STATUS_OK) {
		var players = response['data'];
		var length = players.length;
		for(var i = 0; i < length; i++ ) {
			var player = players[i];
			//
			var playerLine = playerTemplate;
			playerLine = playerLine.replace('{p}', i + 1);
			playerLine = playerLine.replace('{name}', player['name']);
			playerLine = playerLine.replace('{score}', player['score']);
			list.append(playerLine);
			//
		}
	} else if (status == GSB.STATUS_ERROR) {
		console.log('read error');
	} else {
		console.log('unexpected status: '+status);
	}
	//
	setTimeout(
		function() {
			sb.read('scoreboardReadOnReady');
		}, 1000
	);
}

function scoreboardWrite(name, fbId, score) {
	sb.write('scoreboardWriteOnReady', {name: name, fbId: fbId, score: score});
}

function scoreboardWriteOnReady(response) {
	var status = response['status'];
	if (status == GSB.STATUS_OK) {
		console.log('write ok');
	} else if (status == GSB.STATUS_ERROR) {
		console.log('write error');
	} else {
		console.log('unexpected status: '+status);
	}
}