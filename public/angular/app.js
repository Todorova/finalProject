var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/news', {
            templateUrl: 'angular/news/news.htm',
            controller: 'NewsController'
        })
        .when('/video', {
            templateUrl: 'angular/video/video.htm',
            // controller: 'ChehliController'
        })
        .when('/user' , {
            templateUrl: 'angular/user/user.htm',
            controller: 'userController'
        })
        .otherwise({
            templateUrl: 'angular/main/main.htm',
            controller: 'MainController'
        });
});
