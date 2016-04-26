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
	
	public class UserLoginSecurityCheck extends UserAuthenticationSecurityCheck {

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
 private String errorMsg;



/* override the createUser */ 
@Override
protected AuthenticatedUser createUser() {
    return new AuthenticatedUser(userId, displayName, this.getName());
} 


/*****  Complete Class ****/

/*
 * IBM Confidential OCO Source Materials
 *
 * 5725-I43 Copyright IBM Corp. 2006, 2015
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has
 * been deposited with the U.S. Copyright Office.
 */
package com.ibm;

import com.ibm.mfp.server.registration.external.model.AuthenticatedUser;
import com.ibm.mfp.security.checks.base.UserAuthenticationSecurityCheck;
import java.util.HashMap;
import java.util.Map;

/**
 * Sample implementation of username/password security check that succeeds if username and password are identical.
 */
public class UserLoginSecurityCheck extends UserAuthenticationSecurityCheck {
    private String userId, displayName;
    private String errorMsg;

    @Override
    protected AuthenticatedUser createUser() {
        return new AuthenticatedUser(userId, displayName, this.getName());
    }

    /**
     * This method is called by the base class UserAuthenticationSecurityCheck when an authorization
     * request is made that requests authorization for this security check or a scope which contains this security check
     * @param credentials
     * @return true if the credentials are valid, false otherwise
     */
    @Override
    protected boolean validateCredentials(Map<String, Object> credentials) {
        if(credentials!=null && credentials.containsKey("username") && credentials.containsKey("password")){
            String username = credentials.get("username").toString();
            String password = credentials.get("password").toString();
            if(username.equals(password)) {
                userId = username;
                displayName = username;
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

    /**
     *
     * This method is describes the challenge JSON that gets sent to the client during the authorization process
     * This is called by the base class UserAuthenticationSecurityCheck when validateCredentials returns false and
     * the number of remaining attempts is > 0
     * @return the challenge object
     */
    @Override
    protected Map<String, Object> createChallenge() {
        Map<String, Object> challenge = new HashMap();
        challenge.put("errorMsg",errorMsg);
        challenge.put("remainingAttempts",getRemainingAttempts());
        return challenge;
    }
}
