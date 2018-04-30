app.controller('PhotosController', function ($scope, $http) {

    $http.get(window.location.origin + '/news/photos').then(function (response) {
        $scope.allPhotos = response.data;
    });
});
