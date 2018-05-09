app.controller('infoController', function ($http, $scope, $rootScope, $location, $routeParams, UserService) {
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
    if (!$rootScope.loggedUser) {
         $location.path('/user');
     }


    $http.get(window.location.origin + '/categories').then(function (res) {
        $scope.categories = res.data;
    });

    $http.get(window.location.origin + '/menu').then(function(res){
        $scope.categoryMenu = res.data.reduce(function(prev, curr) {
            prev.push(curr.name);
            if (curr.children) {
                curr.children.forEach(function(children) {
                    prev.push(children.name);
                });
            }
            return prev;
        }, []);
    })

    if (!$routeParams.id) {
        $http.get(window.location.origin + '/news/userId/' + $rootScope.loggedUser.username)
            .then(function (res) {
                $scope.allNews = res.data;
                if ($scope.allNews.length > 0) {
                    $scope.myNews = true;
                } else {
                    $scope.myNews = false;
                }
            });
        }


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

        // if (!$scope.news.video) {
        //     check("Видео");
        //     return;
        // }

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


        if ($scope.news.video) {
            newNews.video = $scope.news.video;
        } else {
            newNews.video = "";
        }

        newNews.categories = arr;
        newNews.creator = $rootScope.loggedUser.username;

        
        if ($scope.news._id) {
            $http.put(window.location.origin + '/waitingNews/'+$scope.news._id, newNews)
                .then(function (res) {
                    alert("Изпратено updated");
                });
        } else {
            $http.post(window.location.origin + '/waitingNews', newNews)
                .then(function (res) {
                    alert("Изпратено");
                });
        }
        $scope.news = {};
        
    }


    $scope.openMyNews = function () {
        $scope.myNews = true;
    }

    $scope.openNewsDiv = function () {
        $scope.myNews = false;
    }

    if ($routeParams.id) {
        $http.get(window.location.origin + '/waitingNews/' + $routeParams.id).then(function (res) {
            $scope.news = res.data[0];
            $scope.myNews = false;
        });
    }
});