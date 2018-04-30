var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/video', {
            templateUrl: 'angular/video/video.htm',
            // controller: 'ChehliController'
        })
        .when('/user' , {
            templateUrl: 'angular/user/user.htm',
            controller: 'userController'
        })
    //     .when('/user', {
    //       templateUrl: 'js/user/user.htm',
    //       controller: 'UserController'
    //    })
        .otherwise({
            templateUrl: 'angular/main/main.htm',
            controller: 'MainController'
        });
});
