app.controller('infoController', function ($http, $scope, $rootScope, $location, UserService) {


    $scope.news = {};
    $scope.showNews = false;
    $scope.showVideo = false;
    $scope.showImages = false;
    $scope.myNews = true;
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

     if(!$rootScope.loggedUser){
        $location.path('/user');
     }

    $scope.openNewsDiv = function (typeS) {
        $scope.type = typeS;
        $scope.showNews = !$scope.showNews;
        $scope.showImages = false;
        $scope.showVideo = false;
        $scope.myNews = false;
    }

    $scope.openImgsDiv = function (typeS) {
        $scope.type = typeS;
        $scope.showImages = !$scope.showImages;
        $scope.showNews = false;
        $scope.showVideo = false;
        $scope.myNews = false;
    }

    $scope.openVideoDiv = function(){
        $scope.showVideo = !$scope.showVideo;
        $scope.showNews = false;
        $scope.showImages = false;
        $scope.myNews = false;
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

    
            if (!$scope.news.img) {
                check("Снимка");
                return;
            }

        if($scope.showVideo){
            if (!$scope.news.video) {
                check("Видео");
                return;
            }
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

      

        if(!!$scope.news.video){
            newNews.video = $scope.news.video;
        }else{
            newNews.video = "";
        }

        
        newNews.categories = arr;
        newNews.dateCreated = new Date();
        newNews.creator = $rootScope.loggedUser._id;

        $scope.news = {};
        $http.post(window.location.origin + '/waitingNews', newNews)
            .then(function (res) {
                alert("Изпратено");
            });

    }

    $http.get(window.location.origin + '/news/userId/' + $rootScope.loggedUser._id)
    .then(function (res) {
       $scope.allNews = res.data;
    });

    $scope.openMyNews = function(){
        $scope.showNews = false;
        $scope.showImages = false;
        $scope.showVideo = false;
        $scope.myNews = true;
    }

   

});