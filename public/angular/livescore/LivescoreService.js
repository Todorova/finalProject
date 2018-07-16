app.service('LivescoreService', function ($http) {

    this.getLivescore = (from, to) => {
              return $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&APIkey=dd8b47b56d5c8ded9427307e2031fb2ecad2b6a79d0147074566f5b8bf35ee40&match_live=1`)
    }
    
});