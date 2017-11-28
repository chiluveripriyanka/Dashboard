var app = angular.module('admin_dashboard', ['datatables', 'ngRoute', 'ngFileUpload', 'angularjs-dropdown-multiselect', 'ui.bootstrap.modal']);
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
    .when("/show_services",{
        templateUrl : "partials/show_services.html",
        controller: "show_services"
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
    .when("/add_categories",{
        templateUrl : "partials/add_categories.html"
    })
    .when("/add_services",{
        templateUrl : "partials/add_services.html",
        controller: "AddServicesController"
    })
    .when("/add_sub_categories",{
        templateUrl : "partials/add_sub_categories.html"  
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
    .when("/show_products",{
        templateUrl : "partials/show_products.html",
        controller: "show_products" 
    })
    .otherwise({
        redirectTo : "/"
    });
});
app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<p><img src="assets/img/loading.gif"/></p>', // Define a template where the image will be initially loaded while waiting for the ajax request to complete
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                val = val ? $(element).show() : $(element).hide();  // Show or Hide the loading image   
            }); 
        }
    }
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
    $scope.loading = true; // Show loading image
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_users_list').success(function(data) {
        $scope.loading = false; // hide loading image on ajax success
        $scope.userData = data.data;
        console.log(data.data);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc'],'processing', true)
              .withLanguage( {
                  loadingRecords: "Please wait - loading..."
                } )
    });
});

app.controller('show_services', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $scope.loading = true;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_services').success(function(data) {
        $scope.loading = false;
        $scope.servicesData = data.data;
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    $scope.editCategory = function(id) {
        //alert(id);
        $scope.categoriesgetData = [{
            cat_id:1,
            cat_img:'nm.jpg',
            category_name:'sdsdd'
        }]
        $scope.showModal = true;
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
});
app.controller('show_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/show_categories').success(function(data) {
        $scope.categoriesData = data.data;
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    $scope.editCategory = function(id) {
        $scope.showModal = true;
        for (i in $scope.categoriesData) {
            //Getting the person details from scope based on id
            if ($scope.categoriesData[i].cat_id == id) {
                $scope.categoriesByIdData = {
                    cat_id: $scope.categoriesData[i].cat_id,
                    category_name: $scope.categoriesData[i].category_name,
                    cat_img: $scope.categoriesData[i].cat_img
                };
                console.log($scope.categoriesByIdData);
            }
        }
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
});
app.controller('show_sub_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/show_sub_categories').success(function(data) {
        $scope.subcategoriesgetData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    $scope.editSubCategory = function(id) {
        $scope.showModal = true;
        for (i in $scope.subcategoriesgetData) {
            //Getting the person details from scope based on id
            if ($scope.subcategoriesgetData[i].sub_cat_id == id) {
                $scope.subCategoriesByIdData = {
                    cat_id: $scope.subcategoriesgetData[i].cat_id,
                    category_name: $scope.subcategoriesgetData[i].category_name,
                    cat_img: $scope.subcategoriesgetData[i].cat_img,
                    sub_category_name:$scope.subcategoriesgetData[i].sub_category_name
                };
                console.log($scope.subCategoriesByIdData);
            }
        }
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
});

app.controller('show_beauty_tips', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_beauty_tips').success(function(data) {
        $scope.tips = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    $scope.editTip = function(id) {
        alert(id);
        $scope.tipData = [{
            tip_title:'tip title',
            tip_description:'tip desc',
            tip_id:1,
            tip_category:3,
            tip_img:'tip.img',
            tip_video: 'tip.mp4'
        }]
        $scope.showModal = true;
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
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
app.controller('show_products', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_products').success(function(data) {
        $scope.products = data.data;
        console.log($scope.products);
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
        });
    }
}]);
app.controller('EditCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.updateCategoryForm = function() {
        console.log($scope.categoriesByIdData);
        var file = $scope.categoriesByIdData.cat_img;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category',
          data: {category_name: $scope.categoriesByIdData.category_name, cat_img: file},
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
        });
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
app.controller('EditSubCategoryController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.updateSubCategoryForm = function() {
        console.log($scope.subCategoriesByIdData);
        var file = $scope.subCategoriesByIdData.cat_img;
        console.log($scope.subCategoriesByIdData.cat_img);
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
          data: {category_name: $scope.subCategoriesByIdData.category_name, cat_img: file, sub_category_name: $scope.subCategoriesByIdData.sub_category_name, cat_id : $scope.subCategoriesByIdData.cat_id},
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
        });
    }
}]);
app.controller('AddServicesController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadServicePic = function(file) {
        //console.log($scope.service_name + $scope.service_duration + $scope.service_description + $scope.service_price + $scope.sub_cat_id);
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_services',
           data: {service_name: $scope.service_name, sub_cat_id: $scope.sub_cat_id, service_img: file, service_description: $scope.service_description, service_price: $scope.service_price,service_duration:$scope.service_duration},
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
        });
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
            return {
                package_services: item.package_services,
                package_name:item.package_name
              };
        });
        $scope.servicesOtherInfo = data_final.map(function(item){
            return {
                package_on_other_services: item.package_on_other_services,
                package_name:item.package_name
            };
        });
    })

    $scope.selected_services = [];
    $scope.selected_services_settings = {
        template: '<b>{{option.package_name}}</b>',
        searchField: 'package_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_other_services = [];
    $scope.selected_other_services_settings = {
        template: '<b>{{option.package_name}}</b>',
        searchField: 'package_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.selected_other_services_customTexts = {buttonDefaultText: 'Select Other Services'}; 
    $scope.submitPackageForm = function() {
        
        if ($scope.addPackageForm.$valid) {
            var services = $scope.selected_services;
            var package_services = [];
            for(var i=0;i<services.length;i++){
                $scope.selected_services = services[i].package_services;
                package_services.push($scope.selected_services);
            }
            var other_services = $scope.selected_other_services;
            var package_on_other_services = [];
            for(var i=0;i<other_services.length;i++){
                $scope.selected_other_services = other_services[i].package_on_other_services;
                package_on_other_services.push($scope.selected_other_services);
            }
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
            //console.log(data);
            $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_package', data)
                .success(function (response) {
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
                })

        }
    };

});

app.controller('AddBeautyTipController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

    $scope.uploadTip = function(file) {
        console.log('tip_video:' + $scope.tip_video);
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_beauty_tips',
          data: {tip_title: $scope.tip_title, tip_description: $scope.tip_description, tip_img: file, tip_category: $scope.tip_category, tip_id: $scope.tip_id, tip_video: $scope.tip_video},
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
app.controller('EditTipController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.updateTip = function(info) {
        console.log('tip_title:' + info.tip_title + 'tip_category:' + info.tip_category + 'tip_desc' + info.tip_description + 'tip_id:' + info.tip_id, 'tip_img:' + info.tip_img + 'tip_video:' + info.tip_video);
        var file = info.tip_img;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
          data: {tip_title:info.tip_title,tip_category:info.tip_category,tip_desc:info.tip_description,ip_id:info.tip_id,tip_img:info.tip_img,tip_video:info.tip_video},
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
      })
    }
}]);