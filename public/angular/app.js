var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/news', {
            templateUrl: 'angular/news/news.htm',
            controller: 'NewsController'
        })
        .when('/news/:id', {
            templateUrl: 'angular/newsPreview/newsPreview.htm',
            controller: 'NewsPreviewController'
        })
        .when('/video', {
            templateUrl: 'angular/video/video.htm',
            controller: 'VideoController'
        })
        .when('/photos', {
            templateUrl: 'angular/photos/photos.htm',
            controller: 'PhotosController'
        })
        .when('/categories/:name', {
            templateUrl: 'angular/categories/category.htm',
            controller: 'CategoryController'
        })
        .when('/user' , {
            templateUrl: 'angular/user/user.htm',
            controller: 'userController'
        })
        .when('/userInfo' , {
            templateUrl: 'angular/userInfo/userInfo.htm',
            controller: 'infoController'
        })
        .otherwise({
            templateUrl: 'angular/main/main.htm',
            controller: 'MainController'
        });
});
