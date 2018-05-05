app.controller('NewsPreviewController', function ($scope, $rootScope, $routeParams, $http) {

    $http.get(window.location.origin + '/news/' + $routeParams.id).then(function (response) {
        $scope.news = response.data;
    });

    $http.get(window.location.origin + '/news/' + $routeParams.id + '/comments').then(function (response) {
        $scope.comments = response.data;
    });

    $scope.addComment = function () {
        $scope.newComment.newsId = $routeParams.id;
        $http.post(window.location.origin + '/news/' + $routeParams.id + '/comment', $scope.newComment).then(function (response) {
            $scope.comments.unshift(response.data)
            $scope.newComment={}
        })
    }

    
    $scope.deleteComment = function(id){
        console.log(id);

        $http.delete(window.location.origin + '/comments/' + id)
        .then(function(res){
            console.log(res);
        });

      /*  $http.get(window.location.origin + '/comments/' + id)
        .then(function (res) { 
            console.log(res.data);
        });

    var index = $scope.comments.findIndex(function (comment) {
        if (comment._id == id) return comment;
    });

    $scope.comments.splice(index, 1);*/
    }

    // newsId
    // userId
    // username
    // date
    // text
});

