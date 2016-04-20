/* controllers.js */


// mainCtrl event
var event = {viewLoad: 'Employee List View'};
WL.Analytics.log(event, 'Employee List View - loaded');


// employeeDetailCtrl event
var event = {viewLoad: 'Details View'};
WL.Analytics.log(event, 'Details View - loaded');


// splashCtrl event
var event = {viewLoad: 'Splash View'};
if(WL!=null && WL!=undefined) WL.Analytics.log(event, 'Splash View - loaded');


/* app.js */
WL.Analytics.send();    