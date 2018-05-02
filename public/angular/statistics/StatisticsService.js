app.service('StatisticsService', function ($http) {

   
    this.getCountries = () => $http.get('https://apifootball.com/api/?action=get_countries&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f')
  

    this.getLeagues = (id) => $http.get(' https://apifootball.com/api/?action=get_leagues&country_id='+ id +'&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f')
  

    this.getStatistics = (league_id, from_date, to_date) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from_date}&to=${to_date}&league_id=${league_id}&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f`);


    this.getStatisticsBG = (id, from, to) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&league_id=${id}&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f`);

});