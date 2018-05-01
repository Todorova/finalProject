app.controller('infoController', function ($http, $scope, $rootScope, $location, UserService) {


    $scope.news = {};
    $scope.showNews = false;
    $scope.showVideo = false;
    $scope.showImages = false;
    $scope.theEmpty = "";
    $scope.type = "";

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

    $scope.openNewsDiv = function (typeS) {
        $scope.type = typeS;
        $scope.showNews = !$scope.showNews;
        $scope.showImages = false;
        $scope.showVideo = false;
    }

    $scope.openImgsDiv = function (typeS) {
        $scope.type = typeS;
        console.log()
        $scope.showImages = !$scope.showImages;
        $scope.showNews = false;
        $scope.showVideo = false;
    }

    $scope.openVideoDiv = function(){
        $scope.showVideo = !$scope.showVideo;
        $scope.showNews = false;
        $scope.showImages = false;
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
    
        if($scope.showNews){
            if (!$scope.news.img) {
                check("Снимка");
                return;
            }
            newNews.video = "";
        }

        if($scope.showVideo){
            if (!$scope.news.video) {
                check("Видео");
                return;
            }
            newNews.img = "";
            $scope.showNews = false;
            $scope.showImages = false;
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
        newNews.dateCreated = new Date();

        $scope.news = {};
        $http.post(window.location.origin + '/waitingNews', newNews)
            .then(function (res) {
            });

    }

});