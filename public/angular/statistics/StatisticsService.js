app.service('StatisticsService', function ($http) {

   
    this.getCountries = () => $http.get('https://apifootball.com/api/?action=get_countries&APIkey=dd8b47b56d5c8ded9427307e2031fb2ecad2b6a79d0147074566f5b8bf35ee40')
  

    this.getLeagues = (id) => $http.get(' https://apifootball.com/api/?action=get_leagues&country_id='+ id +'&APIkey=dd8b47b56d5c8ded9427307e2031fb2ecad2b6a79d0147074566f5b8bf35ee40')
  

    this.getStatistics = (league_id, from_date, to_date) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from_date}&to=${to_date}&league_id=${league_id}&APIkey=dd8b47b56d5c8ded9427307e2031fb2ecad2b6a79d0147074566f5b8bf35ee40`);


    this.getStatisticsBG = (id, from, to) => $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&league_id=${id}&APIkey=dd8b47b56d5c8ded9427307e2031fb2ecad2b6a79d0147074566f5b8bf35ee40`);

});