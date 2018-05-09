app.controller('userController', function ($scope, $http, $rootScope, $location, UserService) {
  $scope.user = {};
  $scope.hideLogin = $rootScope.loggedUser;

  $scope.hideFunc = function () {

    $scope.hideLogin = !$scope.hideLogin;
  }

  $scope.login = function () {
    if (!$scope.user.username ||$scope.user.username.trim() == "" ) {
      $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Попълването на поле потребителско име е задължително";
      return;
    }
    if (!$scope.user.password ||$scope.user.password.trim() == "") {
      $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Попълването на поле парола е задължително";
      return;
    }
    UserService.login($scope.user).then(function (response) {
      $rootScope.loggedUser = response.data;
      $location.path('/');

    })
      .catch(function (err) {
        $rootScope.clouseAlertI = true;
        $rootScope.alertMessage ="Грешно име или парола";
      });

  }

  $scope.addNewUser = function () {
   
    if (!$scope.user.username ||$scope.user.username.trim() == "" || $scope.user.username.length <3) {
      $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Попълването на поле потребителско име е задължително" + '\n' + 
      "Потребителско име трябва да е с поне 3 символа";
      return;
    }
    if (!$scope.user.password ||$scope.user.password.trim() == "" || $scope.user.password.length <8 ) {
      $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Попълването на поле потребителско име е задължително" + '\n' + 
      "Паролата трябва да е с поне 8 символа";
      return;
    }
    if (!$scope.user.password2 ||$scope.user.password2.trim() == "" || $scope.user.password2.length <8 ) {
      $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Попълването на поле потребителско име е задължително" + '\n' + 
      "Паролата трябва да е с поне 8 символа";
      return;
    }

    if ($scope.user.password != $scope.user.password2) {
      $rootScope.clouseAlertI = true;
      $rootScope.alertMessage ="Паролите не съвпадат";
      return;
    }

    delete $scope.user.password2;

    UserService.register($scope.user);
    $scope.user = {};
    $scope.hideLogin = !$scope.hideLogin;
  }

  $scope.updateUserInfo = function () {


    if (!!$scope.user.password == "") {
      $rootScope.clouseAlertI = true;
      $rootScope.alertMessage ="Няма данни за редактиране";
      return;
    } else {

      if (!!$scope.user.password != "" && !!$scope.user.password2 == "" || !!$scope.user.password2 != "" && !!$scope.user.password == "") {
        $rootScope.clouseAlertW = true;
      $rootScope.alertMessage = "Повтори паролата";
        return;
      }
      if (!!$scope.user.password != "" && !!$scope.user.password2 != "") {
        if ($scope.user.password != $scope.user.password2) {
          $rootScope.clouseAlertI = true;
          $rootScope.alertMessage ="Паролите не съвпадат";
          return;
        } else {
          $rootScope.loggedUser.password = $scope.user.password;
        }
      }
      UserService.update($rootScope.loggedUser);
    }

  }
  $scope.logout = function () {
    $http.get(window.location.origin + '/users/logout');
    delete $rootScope.loggedUser;
    $scope.hideLogin = false;
  }


});