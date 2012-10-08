function FacebookStuff() {
}

FacebookStuff.refreshScores = true; // must be TRUE in production!!!
FacebookStuff.dummyScores = false; // used only to take printscreens // must be FALSE in production!!!

FacebookStuff.appId = '476027365749233';
FacebookStuff.scope = 'publish_actions';
FacebookStuff.userID = 0;
FacebookStuff.accessToken = null;
FacebookStuff.score = 0;

FacebookStuff.MAX_SCORES = 14; // players
FacebookStuff.MAX_PLAYER_NAME = 18; // chars

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function Utils() {
}

Utils.trunc = function(str, lim) {
	if ( str.length < lim ) {
		return str;
	} else {
		return str.substr(0, lim) + '...';
	}
}

Utils.calculateLevel = function(score) {
	var level;
	if ( score < 500 ) {
		level = 0;
	} else if ( score < 750 ) {
		level = 1;
	} else if ( score < 1500 ) {
		level = 2;
	} else {
		level = 3;
	}
	return level;
}

Utils.dummyScore = function() {
	return Math.round( (Math.random()*10000) % 2000 );
}

Utils.LOG = false; // must be FALSE in production!!!

Utils.console = {
	log: function(msg) {
		if ( Utils.LOG ) {
			console.log(msg);
		}
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function scoreboardInit() {
	if ( typeof(FB) != 'undefined' ) {
		FB.init({
			appId: FacebookStuff.appId,
			cookie: true,
		});
		//
		FB.getLoginStatus(
			function(response) {
				var responseStatus = response.status;
				//
				Utils.console.log('response.status: ' + responseStatus);
				//
				if ( responseStatus === 'connected' ) {
					FacebookStuff.userID = response.authResponse.userID;
					FacebookStuff.accessToken = response.authResponse.accessToken;
					//
					scoreboardShow();
				} else if ( response.status === 'not_authorized' ) {
					authUser();
				} else {
					authUser();
				}
			}
		);
	}
}

/*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

function authUserWithPopUp() {
	FB.login(
		function(response) {
			if ( response.authResponse == null ) {
				if ( FacebookStuff.userID == 0 ) {
					FacebookStuff.userID = -1;
					scoreboardInit();
				}
			} else {
				FacebookStuff.userID = response.authResponse.userID;
			}
		},
		{ scope: FacebookStuff.scope }
	);
}

function authUser() {
	var url = ''+
		'http://www.facebook.com/dialog/oauth/?'+
		'client_id='+FacebookStuff.appId+
		'&redirect_uri=https://apps.facebook.com/social-snakes/'+
		'&scope='+FacebookStuff.scope
	;
	window.location.href = url;
}

/*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
					
function scoreboardShow() {
	if ( typeof(FB) != 'undefined' ) {
		FB.api(
			'/'+FacebookStuff.appId+'/scores',
			'get',
			{ access_token: FacebookStuff.accessToken },
			function(response) {
				if ( ! response ) {
					//
					Utils.console.log('[error] scoreboardShow response: ' + response);
					//
				} else if ( response.error ) {
					//
					Utils.console.log('[error] scoreboardShow response.error: ' + response.error);
					//
				} else if ( ! response.data ) {
					//
					Utils.console.log('[error] scoreboardShow response.data: ' + response.data);
					//
				} else {
					//
					Utils.console.log('[success] scoreboardShow response.data.length: ' + response.data.length);
					//
					var list = $('#players_and_scores');
					list.fadeIn(750);
					list.html('');
					//
					var data = response.data;
					//
					var length = data.length - 1;
					var maxScores = FacebookStuff.MAX_SCORES - 1;
					for ( var i = 0 ; i < length && i < maxScores ; i++ ) {
						var user = data[i];
						scoreboardShowSinglePlayer(user);
					}
					//
					scoreboardShowLast(i, data);
					//
					if ( FacebookStuff.dummyScores ) {
						list.html('');
						for ( var i = 0 ; i < FacebookStuff.MAX_SCORES ; i++ ) {
							var dummyScore = Utils.dummyScore();
							scoreboardShowSinglePlayer({
								user: { name: 'Test', id: 1 }, 
								score: dummyScore
							});
						}
					}
					//
				}
				//
				if ( FacebookStuff.refreshScores ) {
					setTimeout(
						function() {
							scoreboardShow();
						}, 1000
					);
				}
			}
		);
	}
}

function scoreboardShowLast(i, data) {
	var userIndex = scoreboardFindMe(data);
	var user;
	if ( userIndex >= 0 ) {
		if ( userIndex < FacebookStuff.MAX_SCORES ) {
			user = null;
		} else {
			user = data[userIndex];
		}
	} else {
		user = null;
	}
	if ( user == null ) {
		user = data[i];
	}
	scoreboardShowSinglePlayer(user);
}

function scoreboardFindMe(data) {
	var length = data.length;
	for ( var i = 0 ; i < length ; i++ ) {
		var user = data[i];
		if ( user.user.id == FacebookStuff.userID ) {
			return i;
		}
	}
	return -1;
}

function scoreboardShowSinglePlayer(user) {
	var playerTemplate = ''+
		'<div class="score_image">'+
			'<img src="http://graph.facebook.com/{id}/picture" width="28" height="28" />'+
		'</div>'+
		'<div class="score_name{class}">'+
			'{name}'+
		'</div>'+
		'<div class="score_score">'+
			'{score}'+
		'</div>'+
		'<div class="score_star_{level}"></div>'+
		'<br clear="all" />'
	;
	//
	var list = $('#players_and_scores');
	//
	var playerLine = playerTemplate;
	playerLine = playerLine.replace('{id}', user.user.id);
	playerLine = playerLine.replace('{name}', Utils.trunc(user.user.name, FacebookStuff.MAX_PLAYER_NAME));
	playerLine = playerLine.replace('{score}', user.score);
	if ( user.user.id == FacebookStuff.userID ) {
		playerLine = playerLine.replace('{class}', ' bold');
	} else {
		playerLine = playerLine.replace('{class}', '');
	}
	playerLine = playerLine.replace('{level}', Utils.calculateLevel(user.score));
	//
	list.append(playerLine);
}

/*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

function scoreboardWrite(_score) {
	if ( _score > 0 && _score > FacebookStuff.score ) {
		FB.api(
			'/'+FacebookStuff.userID+'/scores',
			'post',
			{ access_token: FacebookStuff.accessToken, score: _score },
			function(response) {
				if ( response === true ) {
					//
					Utils.console.log('[success] scoreboardWrite response: ' + response);
					//				
				} else if ( ! response ) {
					//
					Utils.console.log('[error] scoreboardWrite response: ' + response);
					//
				} else if ( response.error ) {
					//
					Utils.console.log('[error] scoreboardWrite response.error: ' + response.error);
					//
				} else {
					//
					Utils.console.log('[error] scoreboardWrite response: ' + response);
					//				
				}
			}
		);
	}
}

function scoreboardDelete() {
	FB.api(
		'/'+FacebookStuff.userID+'/scores',
		'delete',
		{ access_token: FacebookStuff.accessToken },
		function(response) {
			if ( response === true ) {
				//
				Utils.console.log('[success] scoreboardDelete response: ' + response);
				//				
			} else if ( ! response ) {
				//
				Utils.console.log('[error] scoreboardDelete response: ' + response);
				//
			} else if ( response.error ) {
				//
				Utils.console.log('[error] scoreboardDelete response.error: ' + response.error);
				//
			} else {
				//
				Utils.console.log('[error] scoreboardDelete response: ' + response);
				//				
			}
		}
	);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$(document).ready(
	function() {
		scoreboardInit();
	}
);