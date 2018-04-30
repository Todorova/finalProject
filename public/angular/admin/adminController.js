app.controller('adminController', function ($http,$scope,$rootScope,$location) {

    $http.get(window.location.origin + '/waitingNews')
    .then(function(res){
        console.log(res.data);
         $scope.allNews = res.data;
    })

$scope.accept = function(){

}

$scope.reject = function(id){
    console.log(id);
   
      

    $http.delete(window.location.origin + '/waitingNews/' + id)
    .then(function( res){
        console.log(res);
    });


}

});