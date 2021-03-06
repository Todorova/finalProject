app.controller('NewsPreviewController', function ($scope, $rootScope, $location, $routeParams, $http) {

    $http.get(window.location.origin + '/news/' + $routeParams.id).then(function (response) {
        $scope.news = response.data;
    });

    $http.get(window.location.origin + '/news/' + $routeParams.id + '/comments').then(function (response) {
        $scope.comments = response.data;
    });

    $scope.addComment = function () {
        $scope.newComment.newsId = $routeParams.id;
        if (($scope.newComment.username.trim().length > 0) && ($scope.newComment.text.trim().length > 0)) {
            $http.post(window.location.origin + '/news/' + $routeParams.id + '/comment', $scope.newComment).then(function (response) {
                $scope.comments.unshift(response.data);
                $scope.newComment = {};
            })
        }
    }

    
    $scope.deleteComment = function(id){

        $http.delete(window.location.origin + '/comments/' + id)
        .then(function(res){
            console.log(res);
        });

      
    var index = $scope.comments.findIndex(function (comment) {
        if (comment._id == id) return comment;
    });

        $scope.comments.splice(index, 1);
    }

    $scope.deleteNews = function(id) {
        $http.delete(window.location.origin + '/news/' + id)
        .then(function(res){
            alert('Новината е изтрита');
            $location.url('/');
        });
    }

    // newsId
    // userId
    // username
    // date
    // text
});

