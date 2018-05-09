app.service('UserService', function ($http, $rootScope) {

    var users = [];

    $rootScope.clouse = function () {
        $rootScope.clouseAlertI = false;
        $rootScope.clouseAlertW = false;
        $rootScope.clouseAlertS = false;
        $rootScope.clouseAlertD = false;
        $rootScope.alertMessage = "";
    }

    this.register = function (user) {
        $http.post(window.location.origin + '/users/register', user)
            .then(function (res) {
                $rootScope.clouseAlertS = true;
                $rootScope.alertMessage = "Регистрирахте се";
            }).catch(function(res){
              $rootScope.clouseAlertI = true;
              $rootScope.alertMessage = res.data.message;
            });
    }

    this.getUsers = function () {
        $http.get(window.location.origin + '/users')
            .then(function (response) {
                users = response.data;
            });
    }

    this.login = function (user) {
        return $http.post(window.location.origin + '/users/login', user);
    }

    this.update = function(newData){
        $http.put(window.location.origin + '/users/update', newData)
        .then(function (res) {
            $rootScope.clouseAlertS = true;
            $rootScope.alertMessage = "Редактирахте профила си";
        }).catch(function(res){
            $rootScope.clouseAlertI = true;
              $rootScope.alertMessage ="Не успяхте да редактирате профила си";
        });
    }

});