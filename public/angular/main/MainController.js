app.controller('MainController', function ($scope, $http, $timeout) {

    $http.get(window.location.origin + '/news/all').then(function (response) {
        $scope.allNews = response.data;
    });

    $http.get(window.location.origin + '/news/latest').then(function (response) {
        $scope.latestNews = response.data;
    });

    $http.get(window.location.origin + '/news/top').then(function (res) {
        $scope.topNews = res.data;
    });
    $http.get(window.location.origin + '/news/visited').then(function (res) {
        $scope.visitedNews = res.data;
    });
    $http.get(window.location.origin + '/news/comment').then(function (res) {
        $scope.commentNews = res.data;
    });

    

    $scope.showAllNews = function (){
        
        console.log( $scope.allNews)
    }

    $scope.selected = 0;
    function changeSelected() {
        $scope.selected++;
        if ($scope.selected == 5) {
            $scope.selected = 0;
        }
        $timeout(function () {
            changeSelected();
        }, 5000);
    }
    changeSelected();

    $scope.selectVisited = 0;

    $scope.logout = function(){
        $http.post(window.location.origin + '/users/logout', user).then(function(res){
            
        })
    }

});