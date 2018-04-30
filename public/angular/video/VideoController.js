app.controller('VideoController', function ($scope, $http) {

    $http.get(window.location.origin + '/news/videos').then(function (response) {
        $scope.allVideos = response.data;
    });
});
