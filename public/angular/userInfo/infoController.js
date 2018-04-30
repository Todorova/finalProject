app.controller('infoController', function ($http, $scope, $rootScope, $location, UserService) {

    $http.get(window.location.origin + '/categories').then(function (res) {
        $scope.categories = res.data;
    })

    $scope.addNewNews = function () {
        var arr = [];
            arr.push( $scope.news.category1);
            arr.push( $scope.news.category2);
            arr.push( $scope.news.category3);
        
        var newNews = {};
        newNews.title = $scope.news.title;
        newNews.text = $scope.news.text;
        newNews.categories = arr;

        $http.post(window.location.origin + '/waitingNews', newNews)
        .then(function(res){
            console.log(res);
        })

    }

});