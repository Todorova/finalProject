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

console.log($rootScope.loggedUser);

  $scope.login = function () {
     UserService.login($scope.user).then(function(response){ 
   
      if(response.status >= 200 && response.status <= 399){
      $rootScope.loggedUser = response.data;
      console.log($rootScope.loggedUser);
      $location.path('/');
      }
    })
    .catch(function(err){
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
    UserService.register($scope.user);
    $scope.user = {};
    return false;
  }
  
});