app.controller('adminController', function ($http, $scope, $rootScope, $location) {

    if(!$rootScope.loggedUser){
        $location.path('/user');
     }

    $http.get(window.location.origin + '/waitingNews')
        .then(function (res) {
            $scope.allNews = res.data;
        });

    $scope.accept = function (data) {


        var id = data._id;
        delete data._id;


        data.commentsCount = 0;
        data.visited = 0;

        $http.post(window.location.origin + '/news', data)
            .then(function (res) {
               
            });

            $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
            });

        var index = $scope.allNews.findIndex(function (news) {
            if (news._id == id) return news;
        });

        $scope.allNews.splice(index, 1);


    }

    $scope.reject = function (id) {
        $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
            });

        var index = $scope.allNews.findIndex(function (news) {
            if (news._id == id) return news;
        });

        $scope.allNews.splice(index, 1);
    }


});