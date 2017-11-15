angular.module('admin_dashboard', ['datatables', 'ngRoute', 'ngFileUpload'])
    
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
    .when("/add_edit_sub_categories",{
        templateUrl : "partials/add_edit_sub_categories.html"  
    })
    .otherwise({
        redirectTo : "/"
    });
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

.controller('dashboardController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {
        $scope.userData = data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('order', [0, 'asc']);
    });
})
.controller('AddCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category',
          data: {category_name: $scope.category_name, file: file},
        });
        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
          });
          if(response.data.status == 'true'){
            swal({
                title: "Here's a message!",
                type: "success",
                text: response.data.message,
                confirmButtonText : "Close this window"
            });
          }else{
            swal({
                title: "Here's a message!",
                type: "warning",
                text: response.data.message,
                confirmButtonText : "Close this window"
            });
          }
        }
        // , function (response) {
        //   if (response.status > 0)
        //     $scope.errorMsg = response.status + ': ' + response.data;
        // }, function (evt) {
        //   // Math.min is to fix IE which reports 200% sometimes
        //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        // }
        );
    }
}])
.controller('AddSubCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
          data: {sub_category_name: $scope.sub_category_name, cat_id: $scope.cat_id, file: file},
        });
        file.upload.then(function (response) {
            console.log(response);
          $timeout(function () {
            file.result = response.data;
          });
          if(response.data.status == 'true'){
            swal({
                title: "Here's a message!",
                type: "success",
                text: response.data.message,
                confirmButtonText : "Close this window"
            });
          }else{
            swal({
                title: "Here's a message!",
                type: "warning",
                text: response.data.message,
                confirmButtonText : "Close this window"
            });
          }
        }
        // , function (response) {
        //   if (response.status > 0)
        //     $scope.errorMsg = response.status + ': ' + response.data;
        // }, function (evt) {
        //   // Math.min is to fix IE which reports 200% sometimes
        //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        // }
        );
    }
}]);