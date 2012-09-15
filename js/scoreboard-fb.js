function FacebookStuff() {
}

FacebookStuff.refreshScores = true;

FacebookStuff.appId = '476027365749233';
FacebookStuff.userID = 0;
FacebookStuff.accessToken = null;
FacebookStuff.score = 0;

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

function authUser() {
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
		{ scope: 'read_friendlists, publish_actions, publish_stream' }
	);
}

					
/*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */
					
function scoreboardShow() {
	FB.api(
		// '/me/scores',
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
				var length = data.length;
				for ( var i = 0 ; i < length ; i++ ) {
					var user = data[i];
					//
					var playerLine = playerTemplate;
					playerLine = playerLine.replace('{p}', i + 1);
					playerLine = playerLine.replace('{id}', user.user.id);
					playerLine = playerLine.replace('{name}', user.user.name);
					playerLine = playerLine.replace('{score}', user.score);
					if ( user.user.id == FacebookStuff.userID ) {
						playerLine = playerLine.replace('{class}', ' bold');
					} else {
						playerLine = playerLine.replace('{class}', '');
					}
					//
					list.append(playerLine);
					//
					if ( user.user.id == FacebookStuff.userID ) {
						FacebookStuff.score = user.score;
					}
				}
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

/*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

function scoreboardWrite(_score) {
	if ( _score > FacebookStuff.score ) {
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$(document).ready(
	function() {
		scoreboardInit();
	}
);