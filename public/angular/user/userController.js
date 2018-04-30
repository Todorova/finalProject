app.controller('userController', function ($scope,$rootScope,$location, UserService) {
  $scope.user = {};
  $scope.theEmpty = "";


  var empty = false;

  function check(element){
    empty = true;
    $scope.theEmpty = element;
    $scope.isEmpty();
  }

  $scope.isEmpty = function () {
    return empty;
  }


  $scope.login = function () {
    // UserService.getUsers().find(el =>{
    //   if (!$scope.user.username) {
    //     check("Username");
    //      return;
    //    }
    //    if (!$scope.user.password) {
    //      check("Password");
    //      return;
    //    }

    //   if(el.username == $scope.user.username && el.password == $scope.user.password){
    //     alert("lognat si");
    //   }
    // });

    UserService.login($scope.user).then(function(response){ 
  
      $rootScope.loggedUser = response.data;
      $location.path('/');
    })
    
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
    UserService.register($scope.user);
    $scope.user = {};
    return false;
  }
  
});