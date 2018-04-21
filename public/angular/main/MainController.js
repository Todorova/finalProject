app.controller('MainController', function ($scope, $http, $timeout) {
    $http.get(window.location.origin+'/news').then(function (response) {
        $scope.latestNews = response.data;
    });
    $scope.selected = 0;

    function changeSelected() {
        $scope.selected++;
        if ($scope.selected == 5) {
            $scope.selected = 0;
        }
        $timeout(function() {
            changeSelected();
        }, 5000);
    }
    changeSelected();
});