


/* services.js */
//application services for employee, employee details, and authetication service.
ibmApp.factory("EmployeeService", function($http){
    console.log( ">> in EmployeeService ...");
    var employees = [];
    var resourceRequest = new WLResourceRequest(
        "/adapters/EmployeeAdapter/services/list", WLResourceRequest.GET
    );
    return {
        getEmployeeList: function(){
            return resourceRequest.send().then(function(response){
                employees = response.responseJSON;
                return employees;
            }, function(response){
                console.log("error:" + response);
                return null;
            });
        },
        getEmployee: function(index){
            return employees[index];
        },
        getEmployeeById: function(id){
            var _emp;
            angular.forEach(employees, function(emp) {
                console.log(">> getEmployeeById :" + id + " ==  " + emp._id );
                if(emp._id == id){ _emp = emp; }
            });
            return _emp;
        }
    };
})


ibmApp.factory("EmployeeDetailsService", function($http){
    console.log( ">> in EmployeeDetailsService ...");
    return {
        getEmployeeDetails: function(empId){
            //using path param.
            var resourceRequest = new WLResourceRequest(
                "/adapters/EmployeeAdapter/services/details/" + empId, WLResourceRequest.GET
            );
            return resourceRequest.send().then(function(response){
                return response.responseJSON;
            }, function(response){
                console.log("error:" + response);
                return null;
            });
        }};
 })



/* controller.js */
ibmApp.controller('employeeDetailCtrl', function($scope, EmployeeService,
                             employeeDetailList , empId ,$ionicHistory) {
  $scope.employee = {
        "first_name" : "",
        "last_name" : "",
        "_id" : ""
  }
  $scope.employeeDetails = {}
  console.log(">> in - employeeDetailCtrl:" + employeeDetailList);
  //Employee service cached the list of employee
  $scope.employee = EmployeeService.getEmployeeById(empId);
  $scope.employeeDetails = employeeDetailList;
  $scope.employeeDetails.email =  angular.lowercase($scope.employeeDetails.email);

})


