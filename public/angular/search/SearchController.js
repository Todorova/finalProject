app.controller('SearchController', function ($scope, $routeParams, $http) {

    $scope.search = function() {
        if($scope.searchText){
        $http.get(window.location.origin + '/news/search/' + $scope.searchText).then(function (response) {
            $scope.titles = [];
            angular.forEach(response.data, function(t){
                $scope.titles.push({
                    id: t._id,
                    title: t.title
                });
            });
        
        }).catch(function(err) {
        })
    }else{
        $scope.titles=[]
    }
    
    };

    $scope.open = function(id) {
        $scope.titles = [];
        $scope.searchText = '';
    };
});


//         $scope.complete = function(name){
//             if(name.trim().length > 0){
//                 allproductService.search(name).then(function(output){
//                     $scope.filterProduct = output.data;
//                 })
//             }
//         }
//         $scope.fillTextbox = function(product){
//             $scope.product = product.name;
//             $scope.hidethis = true;
//             $location.path('/product/' + product._id);

//         }
        
      
//     });
// });
