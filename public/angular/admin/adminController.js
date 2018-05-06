app.controller('adminController', function ($http, $scope, $rootScope, $location) {

    if(!$rootScope.loggedUser){
        $location.path('/user');
     }

     $scope.showNews = true;

     $scope.showNewsDiv = function(){
        $scope.showNews = true;
     }

     $scope.showUsers = function(){
        $scope.showNews = false;
     }

    $http.get(window.location.origin + '/waitingNews')
        .then(function (res) {
            $scope.allNews = res.data;
        });

    $scope.accept = function (data) {


        var id = data._id;
        delete data._id;


        data.commentsCount = 0;
        data.visited = 0;

        $http.post(window.location.origin + '/news', data)
            .then(function (res) {
               
            });

            $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
            });

        var index = $scope.allNews.findIndex(function (news) {
            if (news._id == id) return news;
        });

        $scope.allNews.splice(index, 1);


    }

    $scope.reject = function (id) {
        $http.delete(window.location.origin + '/waitingNews/' + id)
            .then(function (res) {
            });

        var index = $scope.allNews.findIndex(function (news) {
            if (news._id == id) return news;
        });

        $scope.allNews.splice(index, 1);
    }

   

    $scope.deleteUserFunc = function(){
        var name = document.getElementById('deleteUser').value;
        console.log(name);
        $http.delete(window.location.origin + '/users/delete/' + name)
        .then(function(res){
            document.getElementById('toAdminUser').value = "";
            $scope.del = true;
        })
    }

$scope.toAdminFunc = function(){

    var name = document.getElementById('toAdminUser').value;
    $http.get(window.location.origin + '/users/' + name).then(function(res){
        document.getElementById('toAdminUser').value = "";
        $scope.toAdmin = res.data[0];

         console.log($scope.toAdmin.isAdmin);
         if($scope.toAdmin.isAdmin){
             document.getElementById('ime').querySelector("input").checked = "checked";
         }else{
             document.getElementById('ime').querySelector("input").checked = "";
         }

    });
}

$scope.changeIsAdmin = function(){
    $scope.adm = document.getElementById('ime').querySelector("input").checked;
    
    $http.post(window.location.origin + '/users/' +$scope.toAdmin._id +"/"+$scope.adm)
    .then(function(res){
    });
}

});