var app = angular.module('admin_dashboard', ['datatables', 'ngRoute', 'ngFileUpload', 'angularjs-dropdown-multiselect']);
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
    .when("/users",{
        templateUrl : "partials/users.html",
        controller: "usersController"
    })

    .when("/show_categories",{
        templateUrl : "partials/show_categories.html",
        controller: "show_categories"
    })

    .when("/show_sub_categories",{
        templateUrl : "partials/show_sub_categories.html",
        controller: "show_sub_categories"
    })
    .when("/show_beauty_tips",{
        templateUrl : "partials/show_beauty_tips.html",
        controller: "show_beauty_tips"
    })
    .when("/show_packages",{
        templateUrl : "partials/show_packages.html",
        controller: "show_packages"
    })
    .when("/add_edit_categories",{
        templateUrl : "partials/add_edit_categories.html"
    })
    .when("/add_services",{
        templateUrl : "partials/add_services.html",
        controller: "AddServicesController"
    })
    .when("/add_edit_sub_categories",{
        templateUrl : "partials/add_edit_sub_categories.html"  
    })
    .when("/add_beautytip",{
        templateUrl : "partials/add_beautytip.html" ,
        controller: "AddBeautyTipController"
    })
    .when("/add_packages",{
        templateUrl : "partials/add_packages.html",
        controller: "AddPackagesController"
    })
     .when("/add_product",{     
         templateUrl : "partials/add_product.html",      
         controller: "AddProductsController"     
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

app.controller('dashboardController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_testimonials').success(function(data) {
        $scope.userData = data.data;
        console.log(data.data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_my_orders').success(function(data) {
        $scope.ordersData = data.data;
        console.log(data.data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});


app.controller('usersController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_users_list').success(function(data) {
        $scope.userData = data.data;
        console.log(data.data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});


app.controller('show_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/show_categories').success(function(data) {
        $scope.userData = data.data;
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});


app.controller('show_sub_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/show_sub_categories').success(function(data) {
        $scope.userData = data.data;
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});

app.controller('show_beauty_tips', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_beauty_tips').success(function(data) {
        $scope.tips = data.data;
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});

app.controller('show_packages', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_packages').success(function(data) {
        $scope.packages = data.data;
        console.log($scope.packages);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});

app.controller('AddCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category',
          data: {category_name: $scope.category_name, cat_img: file},
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
}]);
app.controller('AddSubCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
          data: {sub_category_name: $scope.sub_category_name, cat_id: $scope.cat_id, sub_cat_img: file},
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

app.controller('AddServicesController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    // $scope.addServiceForm={"service_description":"","service_name":"","service_price":"","service_duration":"","sub_cat_id":""};
    
    $scope.uploadServicePic = function(file) {
        // console.log($scope);return;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_services',
          data: {service_name: $scope.addServicesForm.service_name, sub_cat_id: $scope.addServicesForm.sub_cat_id, service_img: file, service_description: $scope.addServicesForm.service_description, service_price: $scope.addServicesForm.service_price,service_duration:$scope.addServicesForm.service_duration},
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

app.controller('AddProductsController', ['$scope', 'Upload', '$timeout','$http', function ($scope, Upload, $timeout,$http) {
    // $scope.addProductForm={"product_description":"","product_name":"","product_price":"","product_offer_price":""};
    
    $scope.submitProductForm = function() {
        // console.log($scope);return;
        var data = {product_name: $scope.product_name, product_price: $scope.product_price, product_offer_price: $scope.product_offer_price, product_description: $scope.product_description};
        console.log(data);
        $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_product', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.message,
                    confirmButtonText : "Close this window"
                });
              }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.message,
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
app.controller('AddPackagesController', function($scope, $http, $location) {  
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_packages')
      .success(function(data){
        // Prepare the fake data
        var data_final = data.data;
        $scope.servicesInfo = data_final.map(function(item){

            $scope.selected_services = [];
              $scope.selected_services_settings = {
                template: '<b>{{option.package_services}}</b>',
                //searchField: 'name',
                //enableSearch: true,
                //selectionLimit: 4,
                //selectedToTop: true // Doesn't work
              };

          return {
            package_services: item.package_services
          };
        });
        $scope.servicesOtherInfo = data_final.map(function(item){

            $scope.selected_other_services = [];
              $scope.selected_other_services_settings = {
                template: '<b>{{option.item.package_name}}</b>',
                //searchField: 'name',
                //enableSearch: true,
                //selectionLimit: 4,
                //selectedToTop: true // Doesn't work
              };

          return {
            package_on_other_services: item.package_on_other_services
          };
        });
        
        
      })
    
    $scope.selected_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.selected_other_services_customTexts = {buttonDefaultText: 'Select Other Services'}; 
    $scope.submitPackageForm = function() {
        if ($scope.addPackageForm.$valid) {
            var package_services = $scope.selected_services;
            console.log(package_services);
            var package_on_other_services = $scope.selected_other_services;

            var data = {
                package_name: $scope.package_name,
                package_price: $scope.package_price,
                package_description: $scope.package_description,
                package_validity_days: $scope.package_validity_days,
                package_start_date: $scope.package_start_date,
                package_end_date: $scope.package_end_date,
                package_services: package_services,
                package_on_other_services: package_on_other_services
            };
            console.log('package_on_other_services: ',typeof package_on_other_services);
            console.log('package_services: ',typeof package_services);
            $http.post('http://localhost:8000/add_package', data)
            .success(function (response) {
                console.log(response);
            })
        }
    };

});

app.controller('AddBeautyTipController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadTip = function(file) {
        console.log('tip_title:' + $scope.tip_title + 'tip_description:' + $scope.tip_description + 'tip_img:' + file)
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_tip',
          data: {tip_title: $scope.tip_title, tip_description: $scope.tip_description, tip_img: file},
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