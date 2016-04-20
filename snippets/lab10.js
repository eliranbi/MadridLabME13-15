/* adapter.xml */

<?xml version="1.0" encoding="UTF-8"?>
<!--
	Licensed Materials - Property of IBM
	5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
	US Government Users Restricted Rights - Use, duplication or
	disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
-->
<mfp:adapter name="UserLogin"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:mfp="http://www.ibm.com/mfp/integration"
	xmlns:http="http://www.ibm.com/mfp/integration/http">

	<displayName>UserLogin</displayName>
	<description>UserLogin</description>

	<securityCheckDefinition name="UserLogin" class="com.ibm.UserLoginSecurityCheck">
		<property name="maxAttempts" defaultValue="3" displayName="How many attempts are allowed"/>
		<property name="blockedStateExpirationSec" defaultValue="10" displayName="How long before the client can try again (seconds)"/>
		<property name="successStateExpirationSec" defaultValue="60" displayName="How long is a successful state valid for (seconds)"/>
	</securityCheckDefinition>

</mfp:adapter>

        
        
/* UserLoginSecurityCheck.java */

/* Basic implmentation */        
package com.ibm;

import com.ibm.mfp.server.registration.external.model.AuthenticatedUser;
import com.ibm.mfp.security.checks.base.UserAuthenticationSecurityCheck;

import java.util.HashMap;
import java.util.Map;

public class UserLogin extends UserAuthenticationSecurityCheck {

    @Override
    protected AuthenticatedUser createUser() {
        return null;
    }

    @Override
    protected boolean validateCredentials(Map<String, Object> credentials) {
        return false;
    }

    @Override
    protected Map<String, Object> createChallenge() {
        return null;
    }
}


/* create the challange */
@Override
protected Map<String, Object> createChallenge() {
    Map challenge = new HashMap();
    challenge.put("errorMsg",errorMsg);
    challenge.put("remainingAttempts",getRemainingAttempts());
    return challenge;
}
 
/* Validating the user credentials */ 
@Override
    protected boolean validateCredentials(Map<String, Object> credentials) {
        if(credentials!=null && credentials.containsKey("username") && credentials.containsKey("password")){
            String username = credentials.get("username").toString();
            String password = credentials.get("password").toString();
            if(!username.isEmpty() && !password.isEmpty() && username.equals(password)) {
                return true;
            }
            else {
                errorMsg = "Wrong Credentials";
            }
        }
        else{
            errorMsg = "Credentials not set properly";
        }
        return false;
    }        
 
/* Creating the AuthenticatedUser object */
private String userId, displayName;


/* override the createUser */ 
@Override
protected AuthenticatedUser createUser() {
    return new AuthenticatedUser(userId, displayName, this.getName());
} 