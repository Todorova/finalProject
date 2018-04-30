app.controller('NewsController', function ($scope, $http, $timeout) {

    $http.get(window.location.origin + '/news/all').then(function (response) {
        $scope.allNews = response.data;
    });


    $scope.showAllNews = function (){
        $scope.allNews
        console.log( $scope.allNews)
    }
});