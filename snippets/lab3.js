//Adding support for cordova.
     ibmApp.run(function($ionicPlatform) {
           console.log('>> ibmApp.run ...');
           $ionicPlatform.ready(function() {
             // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
             // for form inputs)
             console.log('>> ibmApp.ready ...');
             if (window.cordova && 
                 window.cordova.plugins && 
                 window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             }
             if(window.StatusBar) {
               StatusBar.styleDefault();
             }
           });
         });
		 
// Add MobileFirst configuration stuff.
	 var Messages = {
		   // Add here your messages for the default language.
		   // Generate a similar file with a language suffix containing the translated messages.
		   // key1 : message1,
	};

	var wlInitOptions = {
		   // Options to initialize with the WL.Client object.
		   // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
	};

	function wlCommonInit() {
		   console.log(">> wlCommonInit() ..." );  
		   var serverUrl = WL.App.getServerUrl(function(success){
		       console.log(success);
		   }, function(fail){
		       console.log(fail);
		   })
	}
		 
			 
