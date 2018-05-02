app.controller('userController', function ($scope,$rootScope,$location, UserService) {
  $scope.user = {};
  $scope.theEmpty = "";
  $scope.hideLogin = false;
  


  var empty = false;


  $scope.hideFunc = function(){
   
    $scope.hideLogin = !$scope.hideLogin;
  }

  function check(element){
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
     UserService.login($scope.user).then(function(response){ 
   
      if(response.status >= 200 && response.status <= 399){
      $rootScope.loggedUser = response.data;
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
    if (!$scope.user.password2) {
      check("Password");
      return;
    }

if($scope.user.password != $scope.user.password2){
  alert("Паролите не съвпадат");
  return;
}

delete !$scope.user.password2;

    UserService.register($scope.user);
    $scope.user = {};
    $scope.hideLogin = !$scope.hideLogin;
  }
  
});