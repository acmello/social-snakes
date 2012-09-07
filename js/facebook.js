$(document).ready(
  function() {
    facebookInit();
  }
);

function FBCurrentUser() {
}
FBCurrentUser.name = null;
FBCurrentUser.fbId = -1;

function facebookInit() {
  if(typeof(FB) != 'undefined') {
    FB.init({
      appId: '476027365749233',
      cookie: true,
    });

    FB.getLoginStatus(
      function(response) {
        if (response.status === 'connected') {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token 
          // and signed request each expire
          var uid = response.authResponse.userID;
          // var accessToken = response.authResponse.accessToken;
          showUser(uid);
        } else if (response.status === 'not_authorized') {
          // the user is logged in to Facebook, 
          // but has not authenticated your app
            authUser();
        } else {
          // the user isn't logged in to Facebook.
            authUser();
        }
      }
     );
  }
}

function authUser() {
  FB.login(
    function(response) {
      var uid;
      if (response.authResponse == null) {
        uid = 'auth pending';
      } else {
        uid = response.authResponse.userID ? response.authResponse.userID : null;
      }
      showUser(uid);
    }, {
      scope: 'read_friendlists'
    }
  );
}

function showUser(uid) {
  var user = $('#current_user');
  user.html('Id: '+uid);
  //
  FB.api('/me', function(response) {
    FBCurrentUser.name = response.name+" "+response.first_name;
    FBCurrentUser.fbId = response.id;
    var imgLink = "http://graph.facebook.com/"+response.id+"/picture"
  });
}