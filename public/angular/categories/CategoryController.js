app.controller('CategoryController', function ($scope, $routeParams, $http) {

    $http.get(window.location.origin + '/categories/' + $routeParams.name).then(function (response) {
        $scope.categories = response.data;
    });
});

