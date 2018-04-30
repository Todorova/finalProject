app.controller('MenuController', function ($scope, $http) {

    $http.get(window.location.origin + '/menu').then(function (response) {
        $scope.menu = response.data;
    });

    $scope.selectMenu = function(index) {
        $scope.selectedMenu = index;
    }

});