/* app.js */
function wlCommonInit() {
  console.log(">> wlCommonInit() ..." );      
  var serverUrl = WL.App.getServerUrl(function(success){
      console.log(success);
  }, function(fail){
      console.log(fail);
  });
  WL.Analytics.send();    
};



/* controller.js */
/* appCtrl */

$scope.logout = function() {
        console.log(">> in appCtrl - logout");
        $timeout(function(){        
                    $scope.user = { username: "", password: ""};
        }, 200);                
        WLAuthorizationManager.logout("UserLogin").then(
            function () {
                console.log(">> logout onSuccess");
                $state.transitionTo("splash");  
            },
            function (response) {
                console.log(">> logout onFailure: " + JSON.stringify(response));
                $state.transitionTo("splash");  
            });
        }    

/* splashCtrl */

/* splashCtrl - updted method  */
ibmApp.controller('splashCtrl', ['$scope', '$stateParams', '$timeout', '$state', 'AuthenticateUserService', '$ionicPopup', '$location', function ($scope, $stateParams, $timeout, $state, AuthenticateUserService, $ionicPopup, $location) {
    

/* $scope.doLogin - updted method  */
/* using mfp challenge handler */    
    $scope.doLogin = function () {
            console.log(">> loginCtrl - doLogin - $scope.user:" + $scope.user);            
            if ($scope.isChallenged){
                console.log(">> loginCtrl - doLogin -  $scope.isChallenged == true");            
                $scope.userLoginChallengeHandler.submitChallengeAnswer({
                    'username': $scope.user.username, 
                    'password': $scope.user.password
                });
            } else {
                console.log(">> loginCtrl - doLogin -  $scope.isChallenged == false");            
                WLAuthorizationManager.login("UserLogin",{
                    'username':$scope.user.username, 
                    'password':$scope.user.password
                }).then( function () {
                    console.log(">> WLAuthorizationManager.login - onSuccess");
                    $state.transitionTo("main");                        
                },
                function (response) {
                    console.log(">> WLAuthorizationManager.login - onFailure: " + JSON.stringify(response));
                    $scope.showLoginError();
                });
            }               
    }    
        

/* register the challengeHandler - updted method  */
    
    $scope.isChallenged = false;
    $scope.securityCheckName = 'UserLogin';    
    $scope.userLoginChallengeHandler = null;
    
    $scope.registerChallengeHandler = function(){        
        console.log(">> in $scope.registerChllangeHandler ... ");
        $scope.userLoginChallengeHandler = WL.Client.createWLChallengeHandler($scope.securityCheckName);    
        $scope.userLoginChallengeHandler.securityCheckName = $scope.securityCheckName;    
        
        $scope.userLoginChallengeHandler.handleChallenge = function(challenge) {
            console.log(">> in UserLoginChallengeHandler - userLoginChallengeHandler.handleChallenge ...");
            //show the login ...                     
            $scope.user = { username: "", password: ""};            
            $scope.currentPath = $location.path();
            console.log(">> $location.path(): " + $location.path());
            $state.transitionTo("splash");            
            $scope.isChallenged = true;
            var statusMsg = "Remaining Attempts: " + challenge.remainingAttempts;
            if (challenge.errorMsg !== null){
                statusMsg = statusMsg + "<br/>" + challenge.errorMsg;                
                $timeout(function(){   
                    //want to show only when submit user/pass not when token expired ...
                    if($scope.currentPath == "/"){
                        $scope.showLoginError(statusMsg);    
                    }                    
                 }, 300);        
            }
            console.log(">>> statusMsg : " + statusMsg);
        };

        $scope.userLoginChallengeHandler.processSuccess = function(data) {                
            console.log(">> in UserLoginChallengeHandler - userLoginChallengeHandler.processSuccess ...");        
            $scope.isChallenged = false;     
            $timeout(function(){        
                    $scope.user = { username: "", password: ""};
            }, 200);                    
            $state.transitionTo("main");                
        };
               
        $scope.userLoginChallengeHandler.handleFailure = function(error) {
            console.log(">> in UserLoginChallengeHandler - userLoginChallengeHandler.handleFailure ...");
            console.log(">> handleFailure: " + error.failure);
            $scope.isChallenged = false;
            if (error.failure !== null){
                alert(error.failure);
            } else {
                alert("Failed to login.");
            }
        };
    }
    
    
    /* updted method showLoginError */
    //show alert login error ... 
    $scope.showLoginError = function(msg) {
        if(msg == null || msg == undefined) msg = 'Please check your username and password and try again';
        var alertPopup = $ionicPopup.alert({
            title: 'Login Error!',
            template: msg
        });
        alertPopup.then(function(res) {
            console.log('>> Thank you for trying ...');
        });
    };
    

    
    /* timeout - add challengeHandler */
    
    $timeout(function(){        
        $scope.moveSplashBox();
        var event = {viewLoad: 'Splash View'};
        if(WL!=null && WL!=undefined) WL.Analytics.log(event, 'Splash View - loaded');                
        $scope.registerChallengeHandler();
    }, 3000);        
    
