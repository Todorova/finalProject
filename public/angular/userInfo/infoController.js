app.controller('infoController', function ($http, $scope, $rootScope, $location, UserService) {


    $scope.news = {};
    $scope.showNews = false;

    $scope.theEmpty = "";


    var empty = false;

    function check(element) {
        empty = true;
        $scope.theEmpty = element;
        $scope.isEmpty();
    }

    $scope.isEmpty = function () {
        return empty;
    }

    // if(!$rootScope.loggedUser){
    //     console.log($rootScope.loggedUser)
    //     $location.path('/user');
    // }

    $scope.openNewsDiv = function () {
        $scope.showNews = true;
    }

    $http.get(window.location.origin + '/categories').then(function (res) {
        $scope.categories = res.data;
    });

    $scope.addNewNews = function () {

        var newNews = {};

        if (!$scope.news.title) {
            check("Заглавие");
            return;
        }
        if (!$scope.news.text) {
            check("Текст");
            return;
        }

        newNews.title = $scope.news.title;
        newNews.text = $scope.news.text;


        var arr = [];
        if ($scope.news.category1)
            arr.push($scope.news.category1);
        if ($scope.news.category2)
            arr.push($scope.news.category2);
        if ($scope.news.category3)
            arr.push($scope.news.category3);

        if (!$scope.news.img) {
            newNews.img = "";
        } else {
            newNews.img = $scope.news.img;

        }
        newNews.categories = arr;
        newNews.video = "";
        newNews.dateCreated = new Date();

        $scope.news = {};
        $http.post(window.location.origin + '/waitingNews', newNews)
            .then(function (res) {
            });

    }

});