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
