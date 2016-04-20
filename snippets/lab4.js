//Calling to the MobileFirst Server    
WLAuthorizationManager.obtainAccessToken().then(
        function (accessToken) {
          console.log(">> Success - Connected to MobileFirst Server");          
        },
        function (error) {
          console.log(">> Failed to connect to MobileFirst Server");          
        }
);
		 
			 
