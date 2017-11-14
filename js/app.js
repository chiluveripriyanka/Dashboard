angular.module('admin_dashboard', ['datatables', 'ngRoute'])
    
.config(function ($routeProvider) {
    $routeProvider
    .when("/" , {
        templateUrl : "partials/login.html"
    })
    .when("/dashboard",{
        templateUrl : "partials/dashboard.html",
        controller: "dashboardController"
    })
    .when("/add_edit_categories",{
        templateUrl : "partials/add_edit_categories.html"
    })
    .otherwise({
        redirectTo : "/"
    })
})
.controller('loginController', function($scope, $location) {

    // function to submit the form after all validation has occurred            
    $scope.submitLoginForm = function() {

        // check to make sure the form is completely valid
        if ($scope.loginForm.$valid) {
            $location.path('/dashboard');
        }

    };

})
.controller('AddCategoryController', function($scope, $location) {

    // function to submit the form after all validation has occurred            
    $scope.submitCategoryForm = function() {
        var categoryInfo = $("#addCategoryForm").serialize();
        console.log(categoryInfo);

    };

})
.controller('dashboardController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {
        $scope.userData = data;
        console.log(data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
})