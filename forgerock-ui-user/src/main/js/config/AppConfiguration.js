/**
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2011-2012 ForgeRock AS. All rights reserved.
 *
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at
 * http://forgerock.org/license/CDDLv1.0.html
 * See the License for the specific language governing
 * permission and limitations under the License.
 *
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at http://forgerock.org/license/CDDLv1.0.html
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 */

/*global define*/

/**
 * @author yaromin
 */
define("config/AppConfiguration", [
    "org/forgerock/commons/ui/common/util/Constants", 
    "org/forgerock/commons/ui/common/main/EventManager"
], function(constants, eventManager) {
    var obj = {
            moduleDefinition: [
               {
                   moduleClass: "org/forgerock/commons/ui/common/main/SessionManager",
                   configuration: {
                       loginHelperClass: "org/forgerock/commons/ui/user/login/InternalLoginHelper"
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/main/ProcessConfiguration",
                   configuration: {
                       processConfigurationFiles: [
                           "config/process/UserConfig",
                           "config/process/CommonConfig"
                       ]
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/main/Router",
                   configuration: {
                       routes: {
                           
                           "": {
                               view: "org/forgerock/commons/ui/user/profile/UserProfileView",
                               role: "openidm-authorized",
                               excludedRole: "openidm-admin",
                               url: ""                                  
                           },
                           
                           //commons
                           "profile": {
                               view: "org/forgerock/commons/ui/user/profile/UserProfileView",
                               role: "openidm-authorized",
                               excludedRole: "openidm-admin",
                               url: "profile/" 
                           },
                           "siteIdentification": {
                               base: "profile",
                               dialog: "org/forgerock/commons/ui/user/profile/ChangeSiteIdentificationDialog",
                               url: "profile/site_identification/",
                               role: "openidm-authorized",
                               excludedRole: "openidm-admin"
                           },
                           "register": {
                               view: "org/forgerock/commons/ui/user/UserRegistrationView",
                               url: "register/"
                           },
                           "termsOfUse": {
                               base: "register",
                               dialog: "org/forgerock/commons/ui/user/TermsOfUseDialog",
                               url: "register/terms_of_use/"
                           },
                           "login" : {
                               view: "org/forgerock/commons/ui/user/LoginView",
                               url: "login/"
                           },                           
                           "forgottenPassword" : {
                               base: "login",
                               dialog: "org/forgerock/commons/ui/user/ForgottenPasswordDialog",
                               url: "profile/forgotten_password/"
                           },
                           "enterOldPassword": {
                               base: "profile",
                               dialog: "org/forgerock/commons/ui/user/profile/EnterOldPasswordDialog",
                               role: "openidm-authorized",
                               url: "profile/old_password/",
                               excludedRoles: "openidm-admin"
                           },
                           "changeSecurityData": {
                               base: "profile",
                               dialog: "org/forgerock/commons/ui/user/profile/ChangeSecurityDataDialog",
                               role: "openidm-authorized",
                               url: "profile/change_security_data/",
                               excludedRole: "openidm-admin"
                           },
                           "404":  { //this route must be the last route
                               view: "org/forgerock/commons/ui/user/NotFoundView",
                               url: /^([\w\W]*)$/,
                               pattern: "?"
                           }
                       }
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/main/ServiceInvoker",
                   configuration: {
                       defaultHeaders: {
                       }                                         
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/main/ErrorsHandler",
                   configuration: {
                       defaultHandlers: {
                           "unauthorized": {
                               status: "401",
                               event: constants.EVENT_UNAUTHORIZED
                           },
                           "serverError": {
                               status: "503",
                               event: constants.EVENT_SERVICE_UNAVAILABLE
                           }
                       }
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/components/Navigation",
                   configuration: {
                       links: {                          
                           "user" : {
                               "urls": {
                                   "openam": {
                                       "url": "http://forgerock.com/openam.html",
                                       "name": "OpenAM"
                                   },
                                   "opendj": {
                                       "url": "http://forgerock.com/opendj.html",
                                       "name": "OpenDJ"
                                   },
                                   "openidm": {
                                       "url": "http://forgerock.com/openidm.html",
                                       "name": "OpenIDM"
                                   }
                               }    
                           }
                       }                                       
                   } 
               },
               {
                   moduleClass: "org/forgerock/commons/ui/common/util/UIUtils",
                   configuration: {
                       templateUrls: [
                       ]
                   } 
               },               
               {
                   moduleClass: "org/forgerock/commons/ui/common/components/Messages",
                   configuration: {
                       messages: {
                           "invalidCredentials": {
                               msg: "Login/password combination is invalid.",
                               type: "error"
                           },
                           "serviceUnavailable": {
                               msg: "Service unavailable",
                               type: "error"
                           },
                           "changedPassword": {
                               msg: "Password has been changed",
                               type: "info"
                           },
                           "unknown": {
                               msg: "Unknown error. Please contact with administrator",
                               type: "error"
                           },
                           "profileUpdateFailed": {
                               msg: "Problem during profile update",
                               type: "error"
                           },
                           "profileUpdateSuccessful": {
                               msg: "Profile has been updated",
                               type: "info"
                           },
                           "userNameUpdated": {
                               msg: "Username has been modified succesfully.",
                               type: "info"
                           },
                           "afterRegistration": {
                               msg: "User has been registered successfully",
                               type: "info"
                           },
                           "loggedIn": {
                               msg: "You have been successfully logged in.",
                               type: "info"
                           },
                           "errorFetchingData": {
                               msg: "Error fetching user data",
                               type: "error"
                           },
                           "loggedOut": {
                               msg: "You have been logged out.",
                               type: "info"
                           },
                           "siteIdentificationChanged": {
                               msg: "Site identification image has been changed",
                               type: "info"
                           },
                           "securityDataChanged": {
                               msg: "Security data has been changed",
                               type: "info"
                           },
                           "unauthorized": {
                               msg: "Unauthorized access",
                               type: "error"
                           },
                           "userAlreadyExists": {
                               msg: "User already exists",
                               type: "error"
                           }
                       }
                   } 
               }
               ],
               loggerLevel: 'debug'
    };
    return obj;
});
