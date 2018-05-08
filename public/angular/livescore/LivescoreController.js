app.controller('LivescoreController', function ($scope, $rootScope, $location, LivescoreService) {

  var today = new Date();
  $scope.from_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  $scope.to_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  $scope.getPartialLivescore = function () {
    LivescoreService.getLivescore($scope.from_date, $scope.to_date).then(response => {
      $scope.livescores = response.data.reverse().slice(0,29);
    }).catch(err => console.log(err));
  }
  $scope.getAllLivescore = function () {
    LivescoreService.getLivescore($scope.from_date, $scope.to_date).then(response => {
      $scope.livescores = response.data.reverse();
    }).catch(err => console.log(err));
  }
  $scope.getPartialLivescore();
});