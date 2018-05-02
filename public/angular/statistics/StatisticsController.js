app.controller('StatisticsController', function ($scope,$rootScope,$location, StatisticsService) {
  $scope.country_id = 201;
  $scope.league_id = 407;
  var today = new Date();
  var begin_year = new Date(today.getFullYear() + '-01-01');
  $scope.from_date = `${begin_year.getFullYear()}-${begin_year.getMonth()+1}-${begin_year.getDate()}`;
  $scope.to_date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

StatisticsService.getCountries().then(countries => {
  $scope.countries = countries.data;
});

$scope.getLeagues = function() {
  StatisticsService.getLeagues($scope.country_id).then(leagues => {
    $scope.leagues = leagues.data;
  });
}

$scope.get = function() {
  StatisticsService.getStatistics($scope.league_id, $scope.from_date, $scope.to_date).then(response => {
    $scope.statistics = response.data.reverse();
  })
}

 $scope.get();
 $scope.getLeagues();
});