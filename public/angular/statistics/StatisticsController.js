app.controller('StatisticsController', function ($scope, $rootScope, $location, StatisticsService) {
  // $scope.country_id = 201;
  // $scope.league_id = 407;
  var today = new Date();
  var begin_year = new Date(today.getFullYear() + '-01-03');
  $scope.from_date = `${begin_year.getFullYear()}-0${begin_year.getMonth() + 1}-0${begin_year.getDate()}`;
  $scope.to_date = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
 

 StatisticsService.getCountries().then(countries => {
    $scope.countries = countries.data;
    $scope.country_id = parseInt($scope.countries.find(function(country) { return country.country_name == 'Bulgaria' }).country_id)
    $scope.getLeagues();
  });

  
  $scope.getLeagues = function () {
    StatisticsService.getLeagues($scope.country_id).then(leagues => {
      $scope.leagues = leagues.data;
      $scope.league_id = parseInt($scope.leagues[0].league_id)
      $scope.getStatistic();
    });
  }

  $scope.getStatistic = function () {
    StatisticsService.getStatistics($scope.league_id, $scope.from_date, $scope.to_date).then(response => {
      $scope.statistics = response.data.reverse();
    })
  }
});