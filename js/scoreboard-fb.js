function FacebookStuff() {
}

FacebookStuff.refreshScores = true; // must be TRUE in production!!!
FacebookStuff.dummyScores = false; // used only to take printscreens // must be FALSE in production!!!

FacebookStuff.appId = '476027365749233';
FacebookStuff.scope = 'publish_actions';
FacebookStuff.userID = 0;
FacebookStuff.accessToken = null;
FacebookStuff.score = 0;

FacebookStuff.MAX_SCORES = 14;
FacebookStuff.MAX_PLAYER_NAME = 24;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function Utils() {
}

Utils.trunk = function(str, lim) {
	if ( str.length < lim ) {
		return str;
	} else {
		return str.substr(0, lim) + '...';
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
				console.log('response.status: ' + responseStatus);
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
					console.log('[error] scoreboardShow response: ' + response);
					//
				} else if ( response.error ) {
					//
					console.log('[error] scoreboardShow response.error: ' + response.error);
					//
				} else if ( ! response.data ) {
					//
					console.log('[error] scoreboardShow response.data: ' + response.data);
					//
				} else {
					//
					console.log('[success] scoreboardShow response.data.length: ' + response.data.length);
					//
					var list = $('#players_and_scores');
					list.fadeIn(500);
					list.html('');
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
						'<br clear="all" />'
					;
					//
					var data = response.data;
					//
					var length = data.length;
					for ( var i = 0 ; i < length ; i++ ) {
						var user = data[i];
						//
						if ( i < FacebookStuff.MAX_SCORES - ( FacebookStuff.userID == 0 ? 0 : 1 ) ) {
							var playerLine = playerTemplate;
							playerLine = playerLine.replace('{id}', user.user.id);
							playerLine = playerLine.replace('{name}', Utils.trunk(user.user.name, FacebookStuff.MAX_PLAYER_NAME));
							playerLine = playerLine.replace('{score}', user.score);
							if ( user.user.id == FacebookStuff.userID ) {
								playerLine = playerLine.replace('{class}', ' bold');
							} else {
								playerLine = playerLine.replace('{class}', '');
							}
							//
							list.append(playerLine);
						}
						//
						if ( user.user.id == FacebookStuff.userID ) {
							FacebookStuff.score = user.score;
							//
							if ( i < FacebookStuff.MAX_SCORES ) {
								// do nothing!
							} else {
								var playerLine = playerTemplate;
								playerLine = playerLine.replace('{id}', user.user.id);
								playerLine = playerLine.replace('{name}', Utils.trunk(user.user.name, FacebookStuff.MAX_PLAYER_NAME));
								playerLine = playerLine.replace('{score}', user.score);
								playerLine = playerLine.replace('{class}', ' bold');
								//
								list.append(playerLine);
								break;
							}
						}
					}
					//
					if ( FacebookStuff.dummyScores ) {
						list.html('');
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 659928016);
						playerLine = playerLine.replace('{name}', "John Doe");
						playerLine = playerLine.replace('{score}', 900);
						playerLine = playerLine.replace('{class}', ' bold');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 1283469000);
						playerLine = playerLine.replace('{name}', "Mary Smith");
						playerLine = playerLine.replace('{score}', 760);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 1368281217);
						playerLine = playerLine.replace('{name}', "Lorem Ipsum");
						playerLine = playerLine.replace('{score}', 505);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 1368281218);
						playerLine = playerLine.replace('{name}', "Joe Foo Bar");
						playerLine = playerLine.replace('{score}', 335);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 4569875215);
						playerLine = playerLine.replace('{name}', "F0r3v3r Al0n3");
						playerLine = playerLine.replace('{score}', 150);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
						playerLine = playerTemplate;
						playerLine = playerLine.replace('{p}', i + 1);
						playerLine = playerLine.replace('{id}', 35895622);
						playerLine = playerLine.replace('{name}', "nonononononoonononn");
						playerLine = playerLine.replace('{score}', 5);
						playerLine = playerLine.replace('{class}', '');
						playerLine = playerLine.replace('{class}', '');
						list.append(playerLine);
						//
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
					console.log('[success] scoreboardWrite response: ' + response);
					//				
				} else if ( ! response ) {
					//
					console.log('[error] scoreboardWrite response: ' + response);
					//
				} else if ( response.error ) {
					//
					console.log('[error] scoreboardWrite response.error: ' + response.error);
					//
				} else {
					//
					console.log('[error] scoreboardWrite response: ' + response);
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
				console.log('[success] scoreboardDelete response: ' + response);
				//				
			} else if ( ! response ) {
				//
				console.log('[error] scoreboardDelete response: ' + response);
				//
			} else if ( response.error ) {
				//
				console.log('[error] scoreboardDelete response.error: ' + response.error);
				//
			} else {
				//
				console.log('[error] scoreboardDelete response: ' + response);
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