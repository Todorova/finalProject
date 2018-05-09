app.controller('adminController', function ($http, $scope, $rootScope, $location) {

    $http.get(window.location.origin + '/users').then(function (res) {
        $scope.users = res.data
    });

    if (!$rootScope.loggedUser) {
        $location.path('/user');
    }

    $scope.showNews = true;

    $scope.showNewsDiv = function () {
        $scope.showNews = true;
    }

    $scope.showUsers = function () {
        $scope.showNews = false;
    }

    $http.get(window.location.origin + '/waitingNews')
        .then(function (res) {
            $scope.allNews = res.data;
        });

    $scope.accept = function (data) {
        var id = data._id;

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


    $scope.deleteUserFunc = function () {
        var username = $scope.userToDelete;
        if ($scope.users.find(function(user) { return user.username == username })) {
            $http.delete(window.location.origin + '/users/delete/' + username)
                .then(function (res) {
                    $scope.userToDelete = "";
                    $scope.del = true;
                })
        } else {
            alert('Няма такова име')
        }
    }

    $scope.toAdminFunc = function () {

        var username = $scope.toAdminUser;
        if ($scope.users.find(function(user) { return user.username == username })) {
            $http.get(window.location.origin + '/users/' + username).then(function (res) {
                $scope.toAdminUser = "";
                $scope.toAdmin = res.data[0];
                console.log($scope.toAdmin);
            });
        } else {
            alert('Няма такова име')
        }
    }

    $scope.changeIsAdmin = function () {
        $http.post(window.location.origin + '/users/' + $scope.toAdmin._id + "/" + $scope.isAdminCheckbox)
            .then(function (res) {
            });
    }

});