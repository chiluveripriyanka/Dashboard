var app = angular.module('admin_dashboard', ['datatables', 'ngRoute', 'ngFileUpload', 'angularjs-dropdown-multiselect', 'ui.bootstrap.modal']);
app.run(['$rootScope', '$route', function ($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState.originalPath);
        documentBody.append(spinnerDiv);
        if(toState.originalPath!='/'){
            $rootScope.isLoggedin= true;
        }
        else{
            $rootScope.isLoggedin= false;
        }
    });
    console.log(window.location.host,':change in root');
    if(window.location.host=='localhost'){
        //window.base_url='http://localhost:8000/';
         window.base_url='http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/';
    }
    else{
        window.base_url='http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/';
    }
    
    console.log(window.location);
    $rootScope.domainNameUrl = window.serverIP;
}]);
var spinnerDiv = angular.element('<div id="chIns_overlay"><i class="fa fa-spinner fa-spin chIns_loader chIns_fsVVLarge col_white"></i></div>');
var documentBody = angular.element(document).find('body').eq(0);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/" , {
        templateUrl : "partials/login.html",
        controller: "loginController"
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
    .when("/show_promotions",{
        templateUrl : "partials/show_promotions.html",
        controller: "show_promotions"
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
    .when("/show_products",{
        templateUrl : "partials/show_products.html",
        controller: "show_products" 
    })
    .when("/show_branches",{
        templateUrl : "partials/show_branches.html",
        controller: "show_branches"
    })
    .when("/show_memberships",{
        templateUrl : "partials/show_memberships.html",
        controller: "show_memberships"
    })
    .when("/show_employees",{
        templateUrl : "partials/show_employees.html",
        controller: "show_employees"
    })
    .when("/show_sample_testimonials",{
        templateUrl : "partials/show_sample_testimonials.html",
        controller: "show_sample_testimonials"
    })
    .when("/show_coupons",{
        templateUrl : "partials/show_coupons.html",
        controller: "show_coupons"
    })
    .when("/add_categories",{
        templateUrl : "partials/add_categories.html",
        controller: "AddCategoryController"
    })
    .when("/add_services",{
        templateUrl : "partials/add_services.html",
        controller: "AddServicesController"
    })
    .when("/add_sub_categories",{
        templateUrl : "partials/add_sub_categories.html",
        controller: "AddSubCategoryController"
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
    .when("/add_promotions",{
        templateUrl : "partials/add_promotions.html",
        controller: "AddPromotionsController"
    })
    .when("/add_branch",{
        templateUrl : "partials/add_branch.html" ,
        controller: "AddBranchController"
    })
    .when("/add_membership",{
        templateUrl : "partials/add_membership.html" ,
        controller: "AddMembershipController"
    })
    .when("/add_employee",{
        templateUrl: "partials/add_employee.html",
        controller: "AddEmployeeController"
    })
    .when("/add_sample_testimonial", {
        templateUrl: "partials/add_sample_testimonial.html",
        controller: "AddSampleTestimonialController"
    })
    .when("/add_coupons", {
        templateUrl: "partials/add_coupon.html",
        controller: "AddCouponController"
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
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
});

app.controller('dashboardController', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.post(base_url+'get_testimonials').success(function(data) {
        $scope.userData = data.data;
        console.log(data.data);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
             
              
    });
    $http.post(base_url+'get_my_orders').success(function(data) {
        $scope.ordersData = data.data;
        console.log(data.data);
        $scope.vm = {};
     
            $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 3000);
});


app.controller('usersController', function($scope,$http, $route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    
    
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this user.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {user_id:n};
                    $http.post(base_url+'delete_user', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "User has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                    });
                } else {
                    swal("Cancelled", "Your user is safe :)", "error");
                  }
            }
        );
    }
    
    $http.get(base_url+'get_users_list').success(function(data) {
        $scope.userData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc'],'processing', true)
              .withLanguage( {
                  loadingRecords: "Please wait - loading..."
                } )

                angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editUser = function(id) {
        $scope.showModal = true;
        for (i in $scope.userData) {
            //console.log($scope.userData[i].user_id);
            //Getting the person details from scope based on id
            if ($scope.userData[i].user_id == id) {
                $scope.usersByIdData = {
                    user_id: $scope.userData[i].user_id,
                    email_id: $scope.userData[i].email_id,
                    fullname: $scope.userData[i].fullname,
                    gender: $scope.userData[i].gender,
                    mobile: $scope.userData[i].mobile
                };
                console.log($scope.usersByIdData);
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
app.controller('EditUserController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    $scope.updateUser = function() {
        documentBody.append(spinnerDiv);
        if($scope.usersByIdData.gender == 'M'){
            var gender = 'Male';
        }else if($scope.usersByIdData.gender == 'F'){
            var gender = 'Female';
        }
        var data = {user_id:$scope.usersByIdData.user_id, email_id: $scope.usersByIdData.email_id, fullname:$scope.usersByIdData.fullname, gender:gender,mobile:$scope.usersByIdData.mobile};
        $http.post(base_url+'profile_update', data)
        .success(function (response) {
            $scope.isLoading = false;
            if(response.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $route.reload();
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        })
    }
}]);
/* services start */
app.controller('show_services', function($scope,$http, $route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this service.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {service_id:n};
                    $http.post(base_url+'delete_service', data)
                    .success(function (response) {
                        angular.element(document).find('#chIns_overlay').remove();
                        if(response.status = true){
                            swal({
                                title: "Service has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your service is safe :)", "error");
                  }
            }
        );
     }
    $http.get(base_url+'get_services').success(function(data) {
        $scope.servicesData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editService = function(id) {
        $scope.showModal = true;
        for (i in $scope.servicesData) {
            //Getting the person details from scope based on id
            if ($scope.servicesData[i].service_id == id) {
                $scope.servicesByIdData = {
                    service_id: $scope.servicesData[i].service_id,
                    sub_cat_id: $scope.servicesData[i].sub_cat_id,
                    service_name: $scope.servicesData[i].service_name,
                    service_description: $scope.servicesData[i].service_description,
                    service_price: $scope.servicesData[i].service_price,
                    service_duration: $scope.servicesData[i].service_duration,
                    service_img: $scope.servicesData[i].service_img
                }
                console.log($scope.servicesByIdData);
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
app.controller('AddServicesController', ['$scope', 'Upload', '$timeout', '$location','$http', function ($scope, Upload, $timeout, $location, $http) {
    documentBody.append(spinnerDiv);
    $scope.uploadServicePic = function(file) {
        documentBody.append(spinnerDiv);
        //console.log($scope.service_name + $scope.service_duration + $scope.service_description + $scope.service_price + $scope.sub_cat_id);
        file.upload = Upload.upload({
          url: base_url+'add_services',
           data: {service_name: $scope.service_name, sub_cat_id: $scope.sub_cat_id, service_img: file, service_description: $scope.service_description, service_price: $scope.service_price,service_duration:$scope.service_duration},
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_services');
                    });
                });
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            } 
            angular.element(document).find('#chIns_overlay').remove();
        });
    }

    $http.get(base_url+'show_sub_categories').success(function(data) {
        $scope.subcategoriesgetData = data.data;
      
        angular.element(document).find('#chIns_overlay').remove();
    });
}]);
app.controller('EditServiceController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    $http.get(base_url+'show_sub_categories').success(function(data) {
        $scope.subcategoriesgetData = data.data;
      
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.updateServiceForm = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.servicesByIdData.service_img;
        file.upload = Upload.upload({
          url: base_url+'add_services',
          data: {service_name: $scope.servicesByIdData.service_name, service_img: file, service_description: $scope.servicesByIdData.service_description, sub_cat_id : $scope.servicesByIdData.sub_cat_id, service_price : $scope.servicesByIdData.service_price, service_duration : $scope.servicesByIdData.service_duration}
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('service_img', $scope.servicesByIdData.service_img);
            formData.append('sub_cat_id', $scope.servicesByIdData.sub_cat_id);
            formData.append('service_name', $scope.servicesByIdData.service_name);
            formData.append('service_description', $scope.servicesByIdData.service_description);
            formData.append('service_price', $scope.servicesByIdData.service_price);
            formData.append('service_duration', $scope.servicesByIdData.service_duration);
            $http.post(base_url+'add_services', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
        }
    }
}]);
/* services end */

/* Categories start */
app.controller('show_categories', function($scope,$http, $route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this category.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {cat_id:n};
                    $http.post(base_url+'delete_category', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Category has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your category is safe :)", "error");
                  }
            }
        );
     }
     
    $scope.hideHeader = false;
    $http.get(base_url+'show_categories').success(function(data) {
        $scope.categoriesData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('order', [0, 'asc']);
            angular.element(document).find('#chIns_overlay').remove();
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
app.controller('AddCategoryController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    documentBody.append(spinnerDiv);
    $scope.uploadPic = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_category',
          data: {category_name: $scope.category_name, cat_img: file},
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_categories');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);
app.controller('EditCategoryController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    documentBody.append(spinnerDiv);
    $scope.updateCategoryForm = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.categoriesByIdData.cat_img;
        file.upload = Upload.upload({
          url: base_url+'add_category',
          data: {category_name: $scope.categoriesByIdData.category_name, cat_img: file, cat_id : $scope.categoriesByIdData.cat_id},
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('cat_img', $scope.categoriesByIdData.cat_img);
            formData.append('cat_id', $scope.categoriesByIdData.cat_id);
            formData.append('category_name', $scope.categoriesByIdData.category_name);
            $http.post(base_url+'add_category', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                console.log(response);
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
            
        }
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);
/* Categories end */

/* Sub Categories start */
app.controller('show_sub_categories', function($scope,$http,$route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this sub category.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {sub_cat_id:n};
                    $http.post(base_url+'delete_sub_category', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Sub category has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your sub category is safe :)", "error");
                  }
            }
        );
     }
    
    $http.get(base_url+'show_sub_categories').success(function(data) {
        $scope.subcategoriesgetData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editSubCategory = function(id) {
        $scope.showModal = true;
        for (i in $scope.subcategoriesgetData) {
            //Getting the person details from scope based on id
            if ($scope.subcategoriesgetData[i].sub_cat_id == id) {
                $scope.subCategoriesByIdData = {
                    sub_cat_id: $scope.subcategoriesgetData[i].sub_cat_id,
                    category_name: $scope.subcategoriesgetData[i].category_name,
                    sub_cat_img: $scope.subcategoriesgetData[i].sub_cat_img,
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
app.controller('AddSubCategoryController', ['$scope', 'Upload', '$timeout', '$location','$http', function ($scope, Upload, $timeout, $location, $http) {
    documentBody.append(spinnerDiv);
    $scope.uploadPic = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_sub_category',
          data: {sub_category_name: $scope.sub_category_name, cat_id: $scope.cat_id, sub_cat_img: file},
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status == true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_sub_categories');
                    });
                });
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
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
    $http.get(base_url+'show_categories').success(function(data) {
        $scope.categoriesData = data.data;
       
            angular.element(document).find('#chIns_overlay').remove();
    });
}]);
app.controller('EditSubCategoryController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    $scope.updateSubCategoryForm = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.subCategoriesByIdData.sub_cat_img;
        file.upload = Upload.upload({
          url: base_url+'add_sub_category',
          data: {category_name: $scope.subCategoriesByIdData.category_name, sub_cat_img: file, sub_category_name: $scope.subCategoriesByIdData.sub_category_name, sub_cat_id : $scope.subCategoriesByIdData.sub_cat_id},
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('sub_cat_img', $scope.subCategoriesByIdData.sub_cat_img);
            formData.append('sub_cat_id', $scope.subCategoriesByIdData.sub_cat_id);
            formData.append('category_name', $scope.subCategoriesByIdData.category_name);
            formData.append('sub_category_name', $scope.subCategoriesByIdData.sub_category_name);
            $http.post(base_url+'add_sub_category', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
            })
            angular.element(document).find('#chIns_overlay').remove();
        }
    }
}]);
/* Sub Categories end */

/* Beauty tips start */
app.controller('show_beauty_tips', function($scope,$http, $route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this beauty tip.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {tip_id:n};
                    $http.post(base_url+'delete_beauty_tips', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Beauty tip has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your Beauty tip is safe :)", "error");
                }
            }
        );
        
    }
    
    $scope.hideHeader = false;
    $http.get(base_url+'get_beauty_tips').success(function(data) {
        $scope.tips = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editTip = function(id) {
        $scope.showModal = true;
        for (i in $scope.tips) {
            //Getting the person details from scope based on id
            if ($scope.tips[i].tip_id == id) {
                $scope.tipsByIdData = {
                    tip_id: $scope.tips[i].tip_id,
                    tip_title: $scope.tips[i].tip_title,
                    tip_description: $scope.tips[i].tip_description,
                    tip_img: $scope.tips[i].tip_img
                };
                console.log($scope.tipsByIdData);
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
app.controller('AddBeautyTipController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    documentBody.append(spinnerDiv);
    $scope.uploadTip = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_beauty_tips',
          data: {tip_title: $scope.tip_title, tip_description: $scope.tip_description, tip_img: file, tip_category: $scope.tip_category, tip_id: $scope.tip_id, tip_video: $scope.tip_video},
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_beauty_tips');
                    });
                });
            }else{
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);
app.controller('EditTipController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    documentBody.append(spinnerDiv);
    $scope.updateTip = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.tipsByIdData.tip_img;
        file.upload = Upload.upload({
          url: base_url+'add_beauty_tips',
          data: {tip_title: $scope.tipsByIdData.tip_title, tip_img: file, tip_id : $scope.tipsByIdData.tip_id, tip_description: $scope.tipsByIdData.tip_description},
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('tip_id', $scope.tipsByIdData.tip_id);
            formData.append('tip_title', $scope.tipsByIdData.tip_title);
            formData.append('tip_description', $scope.tipsByIdData.tip_description);
            formData.append('tip_img', $scope.tipsByIdData.tip_img);
            $http.post(base_url+'add_beauty_tips', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                console.log(response);
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
        }
    }
}]);
/* Beauty tips end */

/* Packages start */
app.controller('show_packages', function($scope,$http, $route, DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this package.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {package_id:n};
                    $http.post(base_url+'delete_package', data)
                    .success(function (response) {
                        console.log(response);
                        if(response.status = true){
                            swal({
                                title: "Package has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your package is safe :)", "error");
                  }
            }
        );
     }
     $scope.hideHeader = false;
    $http.get(base_url+'get_packages').success(function(data) {
        $scope.packages = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $http.get(base_url+'get_services')
      .success(function(data){
        var data_final = data.data;
        $scope.servicesInfo = data_final.map(function(item){
            return {
                service_id: item.service_id,
                service_name:item.service_name
              };
        });
    })
    $scope.selected_services = [];
    $scope.selected_services_settings = {
        template: '<b>{{option.service_name}}</b>',
        searchField: 'service_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.editPackage = function(id) {
        var services = $scope.selected_services;
        var package_services = [];
        package_services.push($scope.selected_services);
        $scope.showModal = true;
        for (i in $scope.packages) {
            if ($scope.packages[i].package_id == id) {
                $scope.packagesByIdData = {
                    package_id: $scope.packages[i].package_id,
                    package_name: $scope.packages[i].package_name,
                    package_price: $scope.packages[i].package_price,
                    package_description: $scope.packages[i].package_description,
                    package_validity_days: $scope.packages[i].package_validity_days,
                    package_services: package_services,
                    package_on_other_services: $scope.packages[i].package_on_other_services,
                    package_start_date: $scope.packages[i].package_start_date,
                    package_end_date: $scope.packages[i].package_end_date
                };
                console.log($scope.packagesByIdData);
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
app.controller('AddPackagesController', function($scope, $http, $location) {  
    documentBody.append(spinnerDiv);
    $http.get(base_url+'get_services')
      .success(function(data){
        var data_final = data.data;
        $scope.servicesInfo = data_final.map(function(item){
            return {
                service_id: item.service_id,
                service_name:item.service_name
              };
        });
    })
    $scope.selected_services = [];
    $scope.selected_services_settings = {
        template: '<b>{{option.service_name}}</b>',
        searchField: 'service_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.submitPackageForm = function() {
        documentBody.append(spinnerDiv);
        if ($scope.addPackageForm.$valid) {
            //var services = $scope.selected_services;
            // var package_services = [];
            // package_services.push($scope.selected_services);
            var package_services = JSON.parse(angular.toJson($scope.selected_services));
            var data = {
                package_name: $scope.package_name,
                package_price: $scope.package_price,
                package_description: $scope.package_description,
                package_validity_days: $scope.package_validity_days,
                package_start_date: $scope.package_start_date,
                package_end_date: $scope.package_end_date,
                package_services: JSON.stringify(package_services),
                package_on_other_services: $scope.package_on_other_services
            };
            console.log(data);
            $http.post(base_url+'add_package', data)
            .success(function (response) {
                $scope.isLoading = false;
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $scope.$apply(function() {
                            $location.path('/show_packages');
                        });
                    });
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
        }
    };
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
});
app.controller('EditPackageController', ['$scope', '$timeout', '$http', '$route', function ($scope, $timeout, $http, $route) {
    $scope.updatePackageForm = function() {
        documentBody.append(spinnerDiv);
        var data= {
                package_id: $scope.packagesByIdData.package_id,
                package_name: $scope.packagesByIdData.package_name,
                package_price: $scope.packagesByIdData.package_price,
                package_description: $scope.packagesByIdData.package_description,
                package_validity_days: $scope.packagesByIdData.package_validity_days,
                package_services: $scope.packagesByIdData.package_services,
                package_on_other_services: $scope.packagesByIdData.package_on_other_services,
                package_start_date: $scope.packagesByIdData.package_start_date,
                package_end_date: $scope.packagesByIdData.package_end_date
        };
        $http.post(base_url+'add_package', data)
        .success(function (response) {
            if(response.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $route.reload();
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        })
    }
}]);
/* Packages end */

/* Products Start */
app.controller('show_products', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_products').success(function(data) {
        $scope.products = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editProduct = function(id) {
        $scope.showModal = true;
        for (i in $scope.products) {
            //Getting the person details from scope based on id
            if ($scope.products[i].product_id == id) {
                $scope.productsByIdData = {
                    product_id: $scope.products[i].product_id,
                    product_name: $scope.products[i].product_name,
                    product_price: $scope.products[i].product_price,
                    product_offer_price: $scope.products[i].product_offer_price,
                    product_description: $scope.products[i].product_description,
                    product_img: $scope.products[i].product_img
                }
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
app.controller('AddProductsController', ['$scope', 'Upload', '$timeout','$http', '$location', function ($scope, Upload, $timeout,$http, $location) {
    // $scope.addProductForm={"product_description":"","product_name":"","product_price":"","product_offer_price":""};
    documentBody.append(spinnerDiv);
    $scope.submitProductForm = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_product',
          data: {product_name: $scope.product_name, product_price: $scope.product_price, product_offer_price: $scope.product_offer_price, product_description: $scope.product_description, product_img: $scope.product_img,}
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_products');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);
app.controller('EditProductController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    documentBody.append(spinnerDiv);
    $scope.updateProductForm = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.productsByIdData.product_img;
        file.upload = Upload.upload({
          url: base_url+'add_product',
          data: {product_id: $scope.productsByIdData.product_id, product_img: file, product_name: $scope.productsByIdData.product_name, product_price: $scope.productsByIdData.product_price, product_offer_price: $scope.productsByIdData.product_offer_price, product_description: $scope.productsByIdData.product_description}
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('product_id', $scope.productsByIdData.product_id);
            formData.append('product_name', $scope.productsByIdData.product_name);
            formData.append('product_price', $scope.productsByIdData.product_price);
            formData.append('product_offer_price', $scope.productsByIdData.product_offer_price);
            formData.append('product_description', $scope.productsByIdData.product_description);
            formData.append('product_img', $scope.productsByIdData.product_img);
            $http.post(base_url+'add_product', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
            
        }
    }
}]);
/* Prdcusts end */

/* Promotions start */
app.controller('show_promotions', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_promotions').success(function(data) {
        $scope.promotions = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editPromotion = function(id) {
        $scope.showModal = true;
        for (i in $scope.promotions) {
            //Getting the person details from scope based on id
            if ($scope.promotions[i].promotion_id == id) {
                $scope.promotionsByIdData = {
                    promotion_id: $scope.promotions[i].promotion_id,
                    promotion_name: $scope.promotions[i].promotion_name,
                    promotion_img: $scope.promotions[i].promotion_img,
                    promotion_description: $scope.promotions[i].promotion_description,
                    promotion_type: $scope.promotions[i].promotion_type
                };
                console.log($scope.promotionsByIdData);
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
app.controller('AddPromotionsController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    documentBody.append(spinnerDiv);
    $scope.addPromotion = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_promotions',
          data: {promotion_name: $scope.promotion_name, promotion_img: file, promotion_description :$scope.promotion_description, promotion_type: $scope.promotion_type, from_date: $scope.from_date, end_date: $scope.end_date,promotion_for:$scope.promotion_for },
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                
                angular.element(document).find('#chIns_overlay').remove();    
                
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_promotions');
                    });
                });
            }else{
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);

app.controller('EditPromotionController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    $scope.updatePromotionForm = function() {
        documentBody.append(spinnerDiv);
        var file = $scope.promotionsByIdData.promotion_img;
        file.upload = Upload.upload({
            url: base_url+'add_promotions',
            data: {promotion_id: $scope.promotionsByIdData.promotion_id, promotion_name: $scope.promotionsByIdData.promotion_name, promotion_img: file, promotion_description :$scope.promotionsByIdData.promotion_description, promotion_type: $scope.promotionsByIdData.promotion_type, from_date: $scope.promotionsByIdData.from_date, end_date: $scope.promotionsByIdData.end_date,promotion_for:$scope.promotionsByIdData.promotion_for },
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('promotion_id', $scope.promotionsByIdData.promotion_id);
            formData.append('promotion_name', $scope.promotionsByIdData.promotion_name);
            formData.append('promotion_description', $scope.promotionsByIdData.promotion_description);
            formData.append('promotion_type', $scope.promotionsByIdData.promotion_type);
            formData.append('from_date', $scope.promotionsByIdData.from_date);
            formData.append('end_date', $scope.promotionsByIdData.end_date);
            formData.append('promotion_img', $scope.promotionsByIdData.promotion_img);
            $http.post(base_url+'add_promotions', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                console.log(response);
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
        }
    }
}]);
/* Promotions end */

/* Branches start */
app.controller('show_branches', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_branches').success(function(data) {
        $scope.branches = data.data;
        console.log($scope.branches);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.editBranch = function(id) {
        $scope.showModal = true;
        for (i in $scope.branches) {
            //Getting the person details from scope based on id
            if ($scope.branches[i].branch_id == id) {
                $scope.branchesByIdData = {
                    branch_id: $scope.branches[i].branch_id,
                    branch_name: $scope.branches[i].branch_name,
                    branch_address: $scope.branches[i].branch_address,
                    branch_area: $scope.branches[i].branch_area,
                    branch_location: $scope.branches[i].branch_location,
                    branch_contact_number: $scope.branches[i].branch_contact_number,
                    branch_parent_id: $scope.branches[i].branch_parent_id
                };
                console.log($scope.branchesByIdData);
            }
        }
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
});
app.controller('AddBranchController', ['$scope', 'Upload', '$route', '$timeout', '$http', '$location', function ($scope, Upload, $timeout, $route, $http, $location) {
    documentBody.append(spinnerDiv);
    $scope.submitBranchForm = function() {
        documentBody.append(spinnerDiv);
        var data = {branch_name:$scope.branch_name, branch_address:$scope.branch_address, branch_area:$scope.branch_area, branch_location:$scope.branch_location, branch_contact_number:$scope.branch_contact_number, branch_parent_id:$scope.branch_parent_id }
        $http.post(base_url+'add_branch', data)
        .success(function (response) {
            if(response.status = true){
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_branches');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
    }, 1000);
}]);
app.controller('EditBranchController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    documentBody.append(spinnerDiv);
    $scope.updateBranchForm = function() {
        documentBody.append(spinnerDiv);
        var data = {branch_id:$scope.branchesByIdData.branch_id, branch_address: $scope.branchesByIdData.branch_address, branch_name:$scope.branchesByIdData.branch_name, branch_location:$scope.branchesByIdData.branch_location,branch_area:$scope.branchesByIdData.branch_area, branch_contact_number:$scope.branchesByIdData.branch_contact_number, branch_parent_id:$scope.branchesByIdData.branch_parent_id}
        $http.post(base_url+'add_branch', data)
        .success(function (response) {
            if(response.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data,
                    confirmButtonText : "Close this window"
                },function(){
                    $route.reload();
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        })
    }
}]);
/* Branches end */

/* Memberships start */
app.controller('show_memberships', function($scope,$http,$route,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_memberships').success(function(data) {
        $scope.membershipsData = data.data;
        console.log($scope.membershipsData);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $http.get(base_url+'get_services')
       .success(function(data){
            var data_final = data.data;
            $scope.servicesInfo = data_final.map(function(item){
                return {
                    service_id: item.service_id,
                    service_name:item.service_name,
                    quantity: '2'
                };
            });
        })
    $http.get(base_url+'get_branches')
      .success(function(data){
        var data_final = data.data;
        $scope.branchesInfo = data_final.map(function(item){
            return {
                branch_id: item.branch_id,
                branch_name:item.branch_name
              };
        });
    })
    $scope.membership_services = [];
    $scope.membership_services_settings = {
        template: '<b>{{option.service_name}}</b>',
        searchField: 'service_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.membership_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.branch_ids = [];
    $scope.branch_ids_settings = {
        template: '<b>{{option.branch_name}}</b>',
        searchField: 'branch_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.branch_ids_customTexts = {buttonDefaultText: 'Select Branches'};
    $scope.editMembership = function(id) {
        var membership_services = JSON.parse(angular.toJson($scope.membership_services));
        var branch_ids = JSON.parse(angular.toJson($scope.branch_ids));
        $scope.showModal = true;
        for (i in $scope.membershipsData) {
            if ($scope.membershipsData[i].membership_id == id) {
                $scope.membershipsByIdData = {
                    membership_id: $scope.membershipsData[i].membership_id,
                    membership_name: $scope.membershipsData[i].membership_name,
                    membership_discount: $scope.membershipsData[i].membership_discount,
                    membership_img: $scope.membershipsData[i].membership_img,
                    membership_description: $scope.membershipsData[i].membership_description,
                    membership_price: $scope.membershipsData[i].membership_price,
                    membership_services: membership_services,
                    branch_ids: branch_ids,
                    is_global: $scope.membershipsData[i].is_global
                };
                console.log($scope.membershipsByIdData);
            }
        }
    };
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this membership.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {membership_id:n};
                    $http.post(base_url+'delete_membership', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Membership has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your Membership is safe :)", "error");
                }
            }
        );
        
    }
});
app.controller('AddMembershipController', ['$scope', 'Upload', '$http', '$route', '$timeout','$location', function ($scope, Upload, $http, $route, $timeout,$location) {
    documentBody.append(spinnerDiv);
    $http.get(base_url+'get_services')
   .success(function(data){
        var data_final = data.data;
        $scope.servicesInfo = data_final.map(function(item){
            return {
                service_id: item.service_id,
                service_name:item.service_name,
                quantity: '2'
            };
        });
    })
    $http.get(base_url+'get_branches')
      .success(function(data){
        var data_final = data.data;
        $scope.branchesInfo = data_final.map(function(item){
            return {
                branch_id: item.branch_id,
                branch_name:item.branch_name
              };
        });
    })
    $scope.membership_services = [];
    $scope.membership_services_settings = {
        template: '<b>{{option.service_name}}</b>',
        searchField: 'service_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.membership_services_customTexts = {buttonDefaultText: 'Select Services'};
    $scope.branch_ids = [];
    $scope.branch_ids_settings = {
        template: '<b>{{option.branch_name}}</b>',
        searchField: 'branch_name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.branch_ids_customTexts = {buttonDefaultText: 'Select Branches'};
    $scope.addMembership = function(file) {
        documentBody.append(spinnerDiv);
        // var services = $scope.membership_services;
        var membership_services = JSON.parse(angular.toJson($scope.membership_services));
        // membership_services.push($scope.membership_services);
        
        // var branches = $scope.branch_ids;
        var branch_ids = JSON.parse(angular.toJson($scope.branch_ids));
        // branch_ids.push($scope.branch_ids);

        var data = {
                    membership_name: $scope.membership_name, 
                    membership_description :$scope.membership_description, 
                    membership_discount: $scope.membership_discount, 
                    membership_price: $scope.membership_price, 
                    membership_validity_in_days: $scope.membership_validity_in_days,
                    membership_services: JSON.stringify(membership_services),
                    branch_ids: JSON.stringify(branch_ids),
                    is_global: $scope.is_global,
                    membership_img:file
                };
                file.upload = Upload.upload({
                    url: base_url+'add_membership',
                    data: data,
                });

                file.upload.then(function (response) {
                    $scope.isLoading = false;
                    $timeout(function () {
                        file.result = response.data;
                    });
                    if(response.data.status = true){
                        swal({
                            title: "Here's a message!",
                            type: "success",
                            text: response.data.message,
                            confirmButtonText : "Close this window"
                        },function(){
                            $scope.$apply(function() {
                                $location.path('/show_memberships');
                            });
                        });
                    }else{
                        swal({
                            title: "Here's a message!",
                            type: "warning",
                            text: response.data.message,
                            confirmButtonText : "Close this window"
                        });
                    } 
                    angular.element(document).find('#chIns_overlay').remove();
                });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
    }, 1000);
}]);
app.controller('EditMembershipController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    documentBody.append(spinnerDiv);
    $scope.updateMembershipForm = function() {
        documentBody.append(spinnerDiv);
        var membership_services = JSON.parse(angular.toJson($scope.membership_services));
        var branch_ids = JSON.parse(angular.toJson($scope.branch_ids));
        var file = $scope.membershipsByIdData.membership_img;
        var data = {
                    membership_id: $scope.membershipsData.membership_id,
                    membership_name: $scope.membershipsData.membership_name,
                    membership_discount: $scope.membershipsData.membership_discount,
                    membership_img: $scope.membershipsData.membership_img,
                    membership_description: $scope.membershipsData.membership_description,
                    membership_price: $scope.membershipsData.membership_price,
                    membership_services: JSON.stringify(membership_services),
                    branch_ids: JSON.stringify(branch_ids),
                    is_global: $scope.membershipsData.is_global
                }
        file.upload = Upload.upload({
            url: base_url+'add_membership',
            data: data
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();

            formData.append('membership_id', $scope.membershipsData.membership_id);
            formData.append('membership_name', $scope.membershipsData.membership_name);
            formData.append('membership_discount', $scope.membershipsData.membership_discount);
            formData.append('membership_img', $scope.membershipsData.membership_img);
            formData.append('membership_description', $scope.membershipsData.membership_description);
            formData.append('membership_price', $scope.membershipsData.membership_price);
            formData.append('membership_services', JSON.stringify(membership_services));
            formData.append('branch_ids', JSON.stringify(branch_ids));
            formData.append('is_global', $scope.membershipsData.is_global);

            $http.post(base_url+'add_membership', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                console.log(response);
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
        }
    }
}]);
/* Branches end */

/* Employess start*/
app.controller('show_employees', function($scope,$http,$route,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_employees').success(function(data) {
        $scope.employeesData = data.data;
        console.log($scope.employeesData);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this employee.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {employee_id:n};
                    $http.post(base_url+'delete_employee', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Employee has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your Employee is safe :)", "error");
                }
            }
        );
        
    }
    $scope.isLoading = false;
    $scope.role = [
        { "id": 1, "name": "Manager" },
        { "id": 2, "name": "Stylist" },
        { "id": 3, "name": "Cashier" }
    ];
    $scope.selected_roles = [];
    $scope.selected_roles_settings = {
        template: '<b>{{option.name}}</b>',
        searchField: 'name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_roles_customTexts = {buttonDefaultText: 'Select Roles'};
    $scope.editEmployee = function(id) {
        var selected_roles = JSON.parse(angular.toJson($scope.selected_roles));
        $scope.roles = [];
        $scope.selected_roles = selected_roles.map(function(item){
            $scope.roles.push(item.id)
        });
        $scope.showModal = true;
        for (i in $scope.employeesData) {
            if ($scope.employeesData[i].employee_id == id) {
                $scope.employeesByIdData = {
                    employee_id:$scope.employeesData[i].employee_id,
                    employee_name:$scope.employeesData[i].employee_name, 
                    employee_branch:$scope.employeesData[i].employee_branch, 
                    employee_address:$scope.employeesData[i].employee_address, 
                    employee_pincode:$scope.employeesData[i].employee_pincode, 
                    email_id:$scope.employeesData[i].email_id, 
                    phone:$scope.employeesData[i].phone, 
                    role: JSON.stringify($scope.roles)
                };
                console.log($scope.employeesByIdData);
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

app.controller('AddEmployeeController', ['$scope', 'Upload', '$route', '$timeout', '$http', '$location', function ($scope, Upload, $timeout, $route, $http, $location) {
    documentBody.append(spinnerDiv);$
    scope.role = [
        { "id": 1, "name": "Manager" },
        { "id": 2, "name": "Stylist" },
        { "id": 3, "name": "Cashier" }
    ];
    $scope.selected_roles = [];
    $scope.selected_roles_settings = {
        template: '<b>{{option.name}}</b>',
        searchField: 'name',
        enableSearch: true,
        //selectionLimit: 4,
    };
    $scope.selected_roles_customTexts = {buttonDefaultText: 'Select Roles'};
    $scope.submitEmployeeForm = function() {
        documentBody.append(spinnerDiv);
        var selected_roles = JSON.parse(angular.toJson($scope.selected_roles));
        $scope.roles = [];
        $scope.selected_roles = selected_roles.map(function(item){
            $scope.roles.push(item.id)
        });
        var data = {employee_name:$scope.employee_name, employee_branch:$scope.employee_branch, employee_address:$scope.employee_address, employee_pincode:$scope.employee_pincode, email_id:$scope.email_id, phone:$scope.phone, role: JSON.stringify($scope.roles) }
        $http.post(base_url+'add_employee', data)
        .success(function (response) {
            if(response.status = true){
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_employees');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);

app.controller('EditEmployeeController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    $scope.updateEmployeeForm = function() {
        documentBody.append(spinnerDiv);
        var selected_roles = JSON.parse(angular.toJson($scope.selected_roles));
        $scope.roles = [];
        $scope.selected_roles = selected_roles.map(function(item){
            $scope.roles.push(item.id)
        });
        var data = {employee_id:$scope.employeesByIdData.employee_id, employee_name: $scope.employeesByIdData.employee_name, employee_branch:$scope.employeesByIdData.employee_branch, employee_address:$scope.employeesByIdData.employee_address,employee_pincode:$scope.employeesByIdData.employee_pincode, email_id:$scope.employeesByIdData.email_id, phone:$scope.employeesByIdData.phone, role: JSON.stringify($scope.roles)}
        $http.post(base_url+'add_employee', data)
        .success(function (response) {
            $scope.isLoading = false;
            if(response.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data,
                    confirmButtonText : "Close this window"
                },function(){
                    $route.reload();
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        })
    }
}]);
/* Employee end */

/* Sample Testimonials start */
app.controller('show_sample_testimonials', function($scope,$http,$route,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'getSampleTestimonial').success(function(data) {
        $scope.sampleTestimonialsData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this sample testimonial.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {sample_testimonial_id:n};
                    $http.post(base_url+'delete_sample_testimonials', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Sample Testimonial has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your Sample Testimonial is safe :)", "error");
                }
            }
        );
        
    }
    $scope.editSampleTestimonial = function(id) {
        $scope.showModal = true;
        for (i in $scope.sampleTestimonialsData) {
            if ($scope.sampleTestimonialsData[i].sample_testimonial_id == id) {
                $scope.sampleTestimonialsByIdData = {
                    sample_testimonial_id:$scope.sampleTestimonialsData[i].sample_testimonial_id,
                    title:$scope.sampleTestimonialsData[i].title,
                    description:$scope.sampleTestimonialsData[i].description, 
                };
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
app.controller('AddSampleTestimonialController', ['$scope', 'Upload', '$route', '$timeout', '$http', '$location', function ($scope, Upload, $timeout, $route, $http, $location) {
    documentBody.append(spinnerDiv);
    $scope.submitSampleTestimonialForm = function() {
        documentBody.append(spinnerDiv);
        var data = {testimonial_id: 0, title:$scope.title, description:$scope.description}
        $http.post(base_url+'addSampleTestimonial', data)
        .success(function (response) {
            if(response.status = true){
                angular.element(document).find('#chIns_overlay').remove();    
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_sample_testimonials');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
    }, 1000);
}]);
app.controller('EditSampleTestimonialController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    $scope.updateSampleTestimonial = function() {
        documentBody.append(spinnerDiv);
        var data = {testimonial_id: $scope.sampleTestimonialsByIdData.sample_testimonial_id, title:$scope.sampleTestimonialsByIdData.title, description:$scope.sampleTestimonialsByIdData.description}
        $http.post(base_url+'addSampleTestimonial', data)
        .success(function (response) {
            if(response.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $route.reload();
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        })
    }
}]);
/* Sample Testimonials end */

/* Coupons start*/
app.controller('show_coupons', function($scope,$http,$route,DTOptionsBuilder, DTColumnBuilder) {
    documentBody.append(spinnerDiv);
    $scope.hideHeader = false;
    $http.get(base_url+'get_coupons').success(function(data) {
        $scope.coupansData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
        angular.element(document).find('#chIns_overlay').remove();
    });
    $scope.f2=function(n,index){
        swal({
                title: "Are you sure?",
                text: "Do you want to delete this coupon.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    var data = {coupon_id:n};
                    $http.post(base_url+'delete_coupon', data)
                    .success(function (response) {
                        if(response.status = true){
                            swal({
                                title: "Coupon has been Deleted",
                                type: "success",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            },function(){
                                $route.reload();
                            });
                        }else{
                            swal({
                                title: "Here's a message!",
                                type: "warning",
                                text: response.message,
                                confirmButtonText : "Close this window"
                            });
                        }
                        angular.element(document).find('#chIns_overlay').remove();
                    });
                } else {
                    angular.element(document).find('#chIns_overlay').remove();
                    swal("Cancelled", "Your Coupon is safe :)", "error");
                }
            }
        );
        
    }
    $scope.editCoupon = function(id) {
        $scope.showModal = true;
        for (i in $scope.coupansData) {
            if ($scope.coupansData[i].coupon_id == id) {
                $scope.coupansByIdData = {
                    coupon_id:$scope.coupansData[i].coupon_id,
                    coupon_name:$scope.coupansData[i].coupon_name,
                    coupon_description:$scope.coupansData[i].coupon_description,
                    coupon_code:$scope.coupansData[i].coupon_code, 
                    expiry_date: $scope.coupansData[i].expiry_date,
                    coupon_img: $scope.coupansData[i].coupon_img,
                };
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
app.controller('AddCouponController', ['$scope', 'Upload', '$timeout','$http', '$location', function ($scope, Upload, $timeout,$http, $location) {
    var data = {coupon_name: $scope.coupon_name, coupon_img: $scope.coupon_img, coupon_code: $scope.coupon_code, coupon_description: $scope.coupon_description, coupon_discount: $scope.coupon_discount, expiry_date:$scope.expiry_date}
    documentBody.append(spinnerDiv);
    $scope.submitCouponsForm = function(file) {
        documentBody.append(spinnerDiv);
        file.upload = Upload.upload({
          url: base_url+'add_coupons',
          data: {coupon_id: 0, coupon_name: $scope.coupon_name, coupon_img: $scope.coupon_img, coupon_code: $scope.coupon_code, coupon_description: $scope.coupon_description, coupon_discount: $scope.coupon_discount, expiry_date:$scope.expiry_date}
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
            if(response.data.status = true){
                swal({
                    title: "Here's a message!",
                    type: "success",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                },function(){
                    $scope.$apply(function() {
                        $location.path('/show_coupons');
                    });
                })
            }else{
                swal({
                    title: "Here's a message!",
                    type: "warning",
                    text: response.data.message,
                    confirmButtonText : "Close this window"
                });
            }
            angular.element(document).find('#chIns_overlay').remove();
        });
    }
    setTimeout(function() {
        angular.element(document).find('#chIns_overlay').remove();    
      }, 1000);
}]);
app.controller('EditCouponController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    documentBody.append(spinnerDiv);
    $scope.updateCouponForm = function() {
        var file = $scope.coupansByIdData.coupon_img;
        documentBody.append(spinnerDiv);
        var data = {
            coupon_id:$scope.coupansByIdData.coupon_id,
            coupon_name:$scope.coupansByIdData.coupon_name, 
            coupon_description:$scope.coupansByIdData.coupon_description,
            coupon_code:$scope.coupansByIdData.coupon_code,
            coupon_discount:$scope.coupansByIdData.coupon_discount,  
            expiry_date: $scope.coupansByIdData.expiry_date,
            coupon_img: file
        }
        file.upload = Upload.upload({
          url: base_url+'add_coupons',
          data: data
        });
        if(file.upload){
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                if(response.data.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }else{
                    swal({
                        title: "Here's a message!",
                        type: "warning",
                        text: response.data.message,
                        confirmButtonText : "Close this window"
                    });
                }
                angular.element(document).find('#chIns_overlay').remove();
            });
        }
        else{
            var formData = new FormData();
            formData.append('coupon_id', $scope.coupansByIdData.coupon_id);
            formData.append('coupon_name', $scope.coupansByIdData.coupon_name);
            formData.append('coupon_description', $scope.coupansByIdData.coupon_description);
            formData.append('coupon_code', $scope.coupansByIdData.coupon_code);
            formData.append('coupon_discount', $scope.coupansByIdData.coupon_discount);
            formData.append('expiry_date', $scope.coupansByIdData.expiry_date);
            formData.append('coupon_img', $scope.coupansByIdData.coupon_img);
            $http.post(base_url+'add_coupons', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function (response) {
                if(response.status = true){
                    swal({
                        title: "Here's a message!",
                        type: "success",
                        text: response.message,
                        confirmButtonText : "Close this window"
                    },function(){
                        $route.reload();
                    })
                }
                angular.element(document).find('#chIns_overlay').remove();
            })
            
        }
    }
}]);
/* Coupons end */