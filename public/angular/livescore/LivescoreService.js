app.service('LivescoreService', function ($http) {

    this.getLivescore = (from, to) => {
              return $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&APIkey=bb5f0319a07115c6f2155095cbcd1e9404774f6dd59f4a37d521eb0d2eb9c975&match_live=1`)
    }
    
});