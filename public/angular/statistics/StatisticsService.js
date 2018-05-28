app.service('StatisticsService', function ($http) {

   
    this.getCountries = () => $http.get('https://apifootball.com/api/?action=get_countries&APIkey=2791c4a9415e6d589dfba3f0c5f2ade1fa3d4d6dfe84434c25da36998eb86e87')
  

    this.getLeagues = (id) => $http.get(' https://apifootball.com/api/?action=get_leagues&country_id='+ id +'&APIkey=2791c4a9415e6d589dfba3f0c5f2ade1fa3d4d6dfe84434c25da36998eb86e87')
  

    this.getStatistics = (league_id, from_date, to_date) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from_date}&to=${to_date}&league_id=${league_id}&APIkey=2791c4a9415e6d589dfba3f0c5f2ade1fa3d4d6dfe84434c25da36998eb86e87`);


    this.getStatisticsBG = (id, from, to) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&league_id=${id}&APIkey=2791c4a9415e6d589dfba3f0c5f2ade1fa3d4d6dfe84434c25da36998eb86e87`);

});