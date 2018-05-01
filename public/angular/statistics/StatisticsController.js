app.controller('StatisticsController', function ($scope,$rootScope,$location, StatisticsService) {
   

  $scope.date = {
    value: new Date(2017, 1, 1)
  };







StatisticsService.getCountries().then(countries => {
  $scope.countries = countries.data;
});

$scope.getLeagues = function() {
  StatisticsService.getLeagues($scope.country.country_id).then(leagues => {
    $scope.leagues = leagues.data;
  });
}

$scope.get = function() {
  StatisticsService.getStatistics($scope.league_id, $scope.from_date, $scope.to_date).then(response => {
   $scope.statistics = response.data;
   console.log($scope.statistics)
  })
}
   
});