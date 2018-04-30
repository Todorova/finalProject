app.controller('adminController', function ($http,$scope,$rootScope,$location) {

    $http.get(window.location.origin + '/waitingNews')
    .then(function(res){
         $scope.allNews = res.data;
    });

$scope.accept = function(data){

    
        console.log(data);
        var id = data._id;
        delete data._id;

        console.log(data);

        $http.post(window.location.origin + '/news', data)
        .then(function (res) {
            $http.delete(window.location.origin + '/waitingNews/' + id)
    .then(function( res){
    });

    var index = $scope.allNews.findIndex(function(news){
        if(news._id == id) return news;
    });

    $scope.allNews.splice(index, 1);
        });


}

$scope.reject = function(id){
    $http.delete(window.location.origin + '/waitingNews/' + id)
    .then(function( res){
    });

    var index = $scope.allNews.findIndex(function(news){
        if(news._id == id) return news;
    });

    $scope.allNews.splice(index, 1);
}

});