app.service('UserService', function ($http) {

    var users = [];

    this.register = function (user) {
        $http.post(window.location.origin + '/users/register', user)
            .then(function (res) {
                console.log(res);
            }).catch(function(res){
                alert(res.data.message);
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
          console.log(res);
        }).catch(function(res){
            console.log(res);
        });
    }

});