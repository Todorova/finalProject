app.service('LivescoreService', function ($http) {

   
    this.getLivescore = (from, to) => {
        console.log(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f&match_live=1`);
        return $http.get(`https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f&match_live=1`)
    }
    
    // https://apifootball.com/api/?action=get_events&from=${from}&to=${to}&league_id=${id}&APIkey=ee1acd03c7fe86602a7e1425102867b7aad9c4fa59a44eafc8cf2763f5b8480f`);

});