var app = angular.module('admin_dashboard', ['datatables', 'ngRoute', 'ngFileUpload', 'angularjs-dropdown-multiselect', 'ui.bootstrap.modal']);
app.run(['$rootScope', '$route', function ($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState.originalPath);
        if(toState.originalPath!='/'){
            $rootScope.isLoggedin= true;
        }
        else{
            $rootScope.isLoggedin= false;
        }
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
    .when("/add_promotions",{
        templateUrl : "partials/add_promotions.html",
        controller: "AddPromotionsController"
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
	
	
 $scope.f2=function(n,index){
		         var data = {user_id:n};
        console.log(data);
        $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_user', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
        
	 }
	
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

/* services start */
app.controller('show_services', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $scope.loading = true;
	
	
	 
$scope.f2=function(n,index){
		         var data = {service_id:n};
				 
		$http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_service', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
	 }
	
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_services').success(function(data) {
        $scope.loading = false;
        $scope.servicesData = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('order', [0, 'asc']);
    });
});
app.controller('AddServicesController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    $scope.isLoading = false;
    $scope.uploadServicePic = function(file) {
        $scope.isLoading = true;
        //console.log($scope.service_name + $scope.service_duration + $scope.service_description + $scope.service_price + $scope.sub_cat_id);
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_services',
           data: {service_name: $scope.service_name, sub_cat_id: $scope.sub_cat_id, service_img: file, service_description: $scope.service_description, service_price: $scope.service_price,service_duration:$scope.service_duration},
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
        });
    }
}]);
/* services end */

/* Categories start */
app.controller('show_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
	
	$scope.f2=function(n,index){
		         var data = {cat_id:n};
				 
		$http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_category', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
	 }
	 
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
app.controller('AddCategoryController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    $scope.isLoading = false;
    $scope.uploadPic = function(file) {
        $scope.isLoading = true;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category',
          data: {category_name: $scope.category_name, cat_img: file},
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
        });
    }
}]);
app.controller('EditCategoryController', ['$scope', 'Upload', '$http', '$route', '$timeout', function ($scope, Upload, $http, $route, $timeout) {
    $scope.updateCategoryForm = function() {
        var file = $scope.categoriesByIdData.cat_img;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category',
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
            });
        }
        else{
            var formData = new FormData();
            formData.append('cat_img', $scope.categoriesByIdData.cat_img);
            formData.append('cat_id', $scope.categoriesByIdData.cat_id);
            formData.append('category_name', $scope.categoriesByIdData.category_name);
            $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_category', formData, {
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
            })
        }
    }
}]);
/* Categories end */

/* Sub Categories start */
app.controller('show_sub_categories', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
	
		 
$scope.f2=function(n,index){
		         var data = {sub_cat_id:n};
				 
		$http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_sub_category', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
	 }
	
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
app.controller('AddSubCategoryController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    $scope.isLoading = false;
    $scope.uploadPic = function(file) {
        $scope.isLoading = true;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
          data: {sub_category_name: $scope.sub_category_name, cat_id: $scope.cat_id, sub_cat_img: file},
        });
        file.upload.then(function (response) {
            $scope.isLoading = false;
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
app.controller('EditSubCategoryController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    $scope.updateSubCategoryForm = function() {
        var file = $scope.subCategoriesByIdData.sub_cat_img;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category',
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
            });
        }
        else{
            var formData = new FormData();
            formData.append('sub_cat_img', $scope.subCategoriesByIdData.sub_cat_img);
            formData.append('sub_cat_id', $scope.subCategoriesByIdData.sub_cat_id);
            formData.append('category_name', $scope.subCategoriesByIdData.category_name);
            formData.append('sub_category_name', $scope.subCategoriesByIdData.sub_category_name);
            $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_sub_category', formData, {
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
        }
    }
}]);
/* Sub Categories end */

/* Beauty tips start */
app.controller('show_beauty_tips', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
	
	
 $scope.f2=function(n,index){
		         var data = {tip_id:n};
        console.log(data);
        $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_beauty_tips', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
        
	 }
	
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_beauty_tips').success(function(data) {
        $scope.tips = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
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
    $scope.deleteTip = function(id){
        alert(id);
        var tip_id = id;
        swal({
          title: 'Are you sure?',
          text: "You want to delete",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!'
        }, function (isConfirm) {
            if (isConfirm) {
                $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_tip', tip_id)
                .success(function(){
                    swal(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                })
            }
        })
    }
    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
});
app.controller('AddBeautyTipController', ['$scope', 'Upload', '$timeout', '$location', function ($scope, Upload, $timeout, $location) {
    $scope.isLoading = false;
    $scope.uploadTip = function(file) {
        $scope.isLoading = true;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_beauty_tips',
          data: {tip_title: $scope.tip_title, tip_description: $scope.tip_description, tip_img: file, tip_category: $scope.tip_category, tip_id: $scope.tip_id, tip_video: $scope.tip_video},
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
                        $location.path('/show_beauty_tips');
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
        });
    }
}]);
app.controller('EditTipController', ['$scope', 'Upload', '$timeout', '$http', '$route', function ($scope, Upload, $timeout, $http, $route) {
    $scope.updateTip = function() {
        var file = $scope.tipsByIdData.tip_img;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_beauty_tips',
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
            });
        }
        else{
            var formData = new FormData();
            formData.append('tip_id', $scope.tipsByIdData.tip_id);
            formData.append('tip_title', $scope.tipsByIdData.tip_title);
            formData.append('tip_description', $scope.tipsByIdData.tip_description);
            formData.append('tip_img', $scope.tipsByIdData.tip_img);
            $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_beauty_tips', formData, {
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
            })
        }
    }
}]);
/* Beauty tips end */

/* Packages start */
app.controller('show_packages', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
	
	
$scope.f2=function(n,index){
		         var data = {package_id:n};
        console.log(data);
        $http.post('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/delete_package', data)
        .success(function (response) {
            console.log(response);
            if(response.status == 'true'){
				$scope.packages.splice(index,1);
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
        });
        
	 }
	 
	 
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_packages').success(function(data) {
        $scope.packages = data.data;
        console.log($scope.packages);
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});
app.controller('AddPackagesController', function($scope, $http, $location) {  
    $scope.isLoading = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_services')
      .success(function(data){
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
        $scope.isLoading = true;
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
            })
        }
    };
});
/* Packages end */

/* Prdcusts Start */
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
app.controller('AddProductsController', ['$scope', 'Upload', '$timeout','$http', '$location', function ($scope, Upload, $timeout,$http, $location) {
    // $scope.addProductForm={"product_description":"","product_name":"","product_price":"","product_offer_price":""};
    $scope.isLoading = false;
    $scope.submitProductForm = function(file) {
        $scope.isLoading = true;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_product',
          data: {product_name: $scope.product_name, product_price: $scope.product_price, product_offer_price: $scope.product_offer_price, product_description: $scope.product_description, product_img: $scope.product_img,}
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
        });
    }
}]);
/* Prdcusts end */

/* Promotions start */
app.controller('show_promotions', function($scope,$http,DTOptionsBuilder, DTColumnBuilder) {
    $scope.hideHeader = false;
    $http.get('http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/get_promotions').success(function(data) {
        $scope.promotions = data.data;
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
              .withOption('order', [0, 'asc']);
    });
});
app.controller('AddPromotionsController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.isLoading = false;
    $scope.addPromotion = function(file) {
        $scope.isLoading = true;
        file.upload = Upload.upload({
          url: 'http://ec2-54-88-194-105.compute-1.amazonaws.com:3000/add_promotions',
          data: {promotion_name: $scope.promotion_name, promotion_img: file, promotion_description :$scope.promotion_description, promotion_type: $scope.promotion_type, from_date: $scope.from_date, end_date: $scope.end_date },
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
/* Promotions end */







