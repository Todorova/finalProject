app.service('LivescoreService', function ($http) {

    this.getLivescore = (from, to) => {
              return $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&APIkey=2791c4a9415e6d589dfba3f0c5f2ade1fa3d4d6dfe84434c25da36998eb86e87&match_live=1`)
    }
    
});