app.controller('infoController', function ($http, $scope, $rootScope, $location, UserService) {



    $scope.news = {};
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

    /* if (!$rootScope.loggedUser) {
         $location.path('/user');
     }*/


    $http.get(window.location.origin + '/categories').then(function (res) {
        $scope.categories = res.data;
    });

    $http.get(window.location.origin + '/news/userId/' + $rootScope.loggedUser._id)
    .then(function (res) {
        $scope.allNews = res.data;
        console.log($scope.allNews.length);
        if($scope.allNews.length > 0){
          $scope.myNews = true;
        }else{
          $scope.myNews = false;
        }
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

        if (!$scope.news.video) {
            check("Видео");
            return;
        }

        newNews.title = $scope.news.title;
        newNews.text = $scope.news.text;
        newNews.img = $scope.news.img;

        var arr = [];
        if ($scope.news.category1)
            arr.push($scope.news.category1);
        if ($scope.news.category2)
            arr.push($scope.news.category2);
        if ($scope.news.category3)
            arr.push($scope.news.category3);



        if (!!$scope.news.video) {
            newNews.video = $scope.news.video;
        } else {
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

    
    $scope.openMyNews = function () {
        $scope.myNews = true;
    }

    $scope.openNewsDiv = function () {
        $scope.myNews = false;
    }

});