app.controller('NewsPreviewController', function ($scope, $routeParams, $http) {

    $http.get(window.location.origin + '/news/' + $routeParams.id).then(function (response) {
        $scope.news = response.data;
    });

    $http.get(window.location.origin + '/news/' + $routeParams.id + '/comments').then(function (response) {
        $scope.comments = response.data;
    });

    
});

