app.service('UserService', function ($http) {

    var users = [];

     this.register = function(user){
console.log(user)
    $http.post(window.location.origin + '/users/register', user)  
        .then(function(res){
            console.log(res);
        });
    }
    //$http.post('/someUrl', data, config).then(successCallback, errorCallback);

// dobre moment da se orientiram dobre 
   this.getUsers = function(){
         $http.get(window.location.origin + '/users')
        .then(function (response) { 
            console.log(response.data)
            users = response.data;
        });
    }

    this.login = function(user){
      
       return  $http.post(window.location.origin + '/users/login', user);
         
    }

   
});