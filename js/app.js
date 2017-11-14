var app = angular.module('admin_dashboard', ['datatables', 'ngRoute']);
app.run(['$rootScope', '$route', function ($rootScope, $route) {
   

    // $rootScope.$watch(function () {
    //     return sessionStorage.getItem('chIns_ngSession');
    // }, function (newVal) {

    //     if (newVal === null) {
    //         $rootScope.userAuth = false;
    //     } else {
    //         $rootScope.userAuth = true;
    //     }
    // });

    $rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState.originalPath);
        if(toState.originalPath!='/'){
            $rootScope.isLoggedin= true;
        }
        else{
            $rootScope.isLoggedin= false;
        }
        // if (toState.originalPath != "quotesListing") {
        //     angular.element(document.body.querySelectorAll(".chIns_bottomSelectedCompaniesWrapperQL")).remove();
        // }

    });

    

    $rootScope.domainNameUrl = window.serverIP;

}]);

app.config(function ($routeProvider) {
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
    });
});
app.controller('loginController', function($scope, $location) {
console.log($location.$$path);
if($location.$$path=='/'){
    $scope.hideHeader = true;
}
    // function to submit the form after all validation has occurred            
    $scope.submitLoginForm = function() {

        // check to make sure the form is completely valid
        if ($scope.loginForm.$valid) {
            if($scope.user.password=='admin@123' && $scope.user.email=='user@digitalrupay.com'){
                $location.path('/dashboard');
            }
            else{
                $scope.authStatus =true;
                console.log('auth failed',$scope.user);
            }
            
            
        }

    };

});
app.controller('AddCategoryController', function($scope, $location) {
    $scope.hideHeader = 'falsesss';
    console.log($location.$$path);
    // function to submit the form after all validation has occurred            
    $scope.submitCategoryForm = function() {
        var categoryInfo = $("#addCategoryForm").serialize();
        console.log(categoryInfo);

    };

});
app.controller('dashboardController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {
        $scope.userData = data;
        console.log(data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});