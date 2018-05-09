app.controller('adminController', function ($http, $scope, $rootScope, $location) {

    $rootScope.clouse = function () {
        $rootScope.clouseAlertI = false;
        $rootScope.clouseAlertW = false;
        $rootScope.clouseAlertS = false;
        $rootScope.clouseAlertD = false;
        $rootScope.alertMessage = "";
    }

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
                $rootScope.clouseAlertS = true;
                $rootScope.alertMessage = "Потвърдихте новината";
            }).catch(function(res){
                $rootScope.clouseAlertI = true;
                $rootScope.alertMessage ="Неуспешно потвърждаване";
            });

        $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
                var index = $scope.allNews.findIndex(function (news) {
                    if (news._id == id) return news;
                });
        
                $scope.allNews.splice(index, 1);
            }).catch(function(res){
                $rootScope.clouseAlertI = true;
                $rootScope.alertMessage ="Проблем с базата данни" + '\n'
                +"Новината не е изтрита от чакащи за одобрение";
            });
    }

    $scope.reject = function (id) {
        $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
                $rootScope.clouseAlertD = true;
                $rootScope.alertMessage ="Успешно отхвърлихте новината";

                var index = $scope.allNews.findIndex(function (news) {
                    if (news._id == id) return news;
                });
        
                $scope.allNews.splice(index, 1);
            }).catch(function(res){
                $rootScope.clouseAlertI = true;
                $rootScope.alertMessage ="Проблем с базата данни" + '\n'
                +"Новината не е изтрита от чакащи за одобрение";
            });

        
    }


    $scope.deleteUserFunc = function () {
        var username = $scope.userToDelete;
        if ($scope.users.find(function(user) { return user.username == username })) {
            $http.delete(window.location.origin + '/users/delete/' + username)
                .then(function (res) {
                    $scope.userToDelete = "";
                    $scope.del = true;
                    $rootScope.clouseAlertD = true;
                    $rootScope.alertMessage ="Успешно изтрихте потребителя";
                }).catch(function(res){
                    $rootScope.clouseAlertI = true;
                    $rootScope.alertMessage ="Неуспешно изтриване на потребителя";
                });
        } else {
            $rootScope.clouseAlertW = true;
            $rootScope.alertMessage = "Не съществува такова потребителско име";
        }
    }

    $scope.toAdminFunc = function () {

        var username = $scope.toAdminUser;
        if ($scope.users.find(function(user) { return user.username == username })) {
            $http.get(window.location.origin + '/users/' + username).then(function (res) {
                $scope.toAdminUser = "";
                $scope.toAdmin = res.data[0];

            }).catch(function(res){
                $rootScope.clouseAlertI = true;
                $rootScope.alertMessage ="Проблем с базата данни";
                return;
            });
        } else {
            $rootScope.clouseAlertW = true;
            $rootScope.alertMessage = "Не съществува такова потребителско име";
        }
    }

    $scope.changeIsAdmin = function () {
        $http.post(window.location.origin + '/users/' + $scope.toAdmin._id + "/" + $scope.isAdminCheckbox)
            .then(function (res) {
                $rootScope.clouseAlertS = true;
                var position = $scope.isAdminCheckbox? "e админ":"не е админ";
                $rootScope.alertMessage = "Потребителят вече " + position;
            }).catch(function(res){
                $rootScope.clouseAlertI = true;
                $rootScope.alertMessage ="Неуспешна заявка";
            });
    }

});