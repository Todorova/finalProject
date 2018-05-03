app.service('StatisticsService', function ($http) {

   
    this.getCountries = () => $http.get('https://apifootball.com/api/?action=get_countries&APIkey=bb5f0319a07115c6f2155095cbcd1e9404774f6dd59f4a37d521eb0d2eb9c975')
  

    this.getLeagues = (id) => $http.get(' https://apifootball.com/api/?action=get_leagues&country_id='+ id +'&APIkey=bb5f0319a07115c6f2155095cbcd1e9404774f6dd59f4a37d521eb0d2eb9c975')
  

    this.getStatistics = (league_id, from_date, to_date) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from_date}&to=${to_date}&league_id=${league_id}&APIkey=bb5f0319a07115c6f2155095cbcd1e9404774f6dd59f4a37d521eb0d2eb9c975`);


    this.getStatisticsBG = (id, from, to) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&league_id=${id}&APIkey=bb5f0319a07115c6f2155095cbcd1e9404774f6dd59f4a37d521eb0d2eb9c975`);

});