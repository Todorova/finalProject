app.controller('userController', function ($scope, $http, $rootScope, $location, UserService) {
  $scope.user = {};
  $scope.theEmpty = "";
  $scope.hideLogin = false;

  var empty = false;


  $scope.hideFunc = function () {

    $scope.hideLogin = !$scope.hideLogin;
  }

  function check(element) {
    empty = true;
    $scope.theEmpty = element;
    $scope.isEmpty();
  }

  $scope.isEmpty = function () {
    return empty;
  }



  $scope.login = function () {
    if (!$scope.user.username) {
      check("Username");
      return;
    }
    if (!$scope.user.password) {
      check("Password");
      return;
    }
    UserService.login($scope.user).then(function (response) {
      $rootScope.loggedUser = response.data;
      $location.path('/');

    })
      .catch(function (err) {
        alert("Грешно име или парола");
      });

  }

  $scope.addNewUser = function () {
    if (!$scope.user.username) {
      check("Username");
      return;
    }
    if (!$scope.user.password) {
      check("Password");
      return;
    }
    if (!$scope.user.password2) {
      check("Password");
      return;
    }

    if ($scope.user.password != $scope.user.password2) {
      alert("Паролите не съвпадат");
      return;
    }

    delete $scope.user.password2;

    UserService.register($scope.user)
    $scope.user = {};
    $scope.hideLogin = !$scope.hideLogin;
  }

  $scope.updateUserInfo = function () {

    if (!!$scope.user.password == "") {
      alert("Няма данни за редактиране");
      return;
    } else {
      if (!!$scope.user.password != "" && !!$scope.user.password2 == "" || !!$scope.user.password2 != "" && !!$scope.user.password == "") {
        alert("Повтори паролата");
        return;
      }

      if (!!$scope.user.password != "" && !!$scope.user.password2 != "") {
        if ($scope.user.password != $scope.user.password2) {
          alert("Паролите не съвпадат");
          return;
        } else {
          $rootScope.loggedUser.password = $scope.user.password;
        }
      }
      $http.put(window.location.origin + '/users/update', $rootScope.loggedUser)
        .then(function (res) {
          console.log(res);
        });
    }

  }
  $scope.logout = function () {
    $http.get(window.location.origin + '/users/logout');
    $rootScope.loggedUser = {};
  }


});