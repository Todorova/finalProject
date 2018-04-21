app.controller('MainController', function ($scope, $http) {
    $scope.newChehyl = {};

    $scope.f = '';

    $scope.buy = function (index) {
        $scope.orders[index].sold = true;
    }

    $scope.orders = [{
        title: 'Chehli s puh',
        price: 20,
        sold: true,
        photoUrl: 'https://badu.bg/upload/galleries/36437/181841big.jpg'
    },
    {
        title: 'Chehli za banq',
        price: 2,
        photoUrl: 'http://4orapi.com/media/18/166.jpg'
    },
    {
        title: 'Chehli za diskoteka',
        price: 200,
        sold: true,
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXSNq5iUC7S5JN3rdUheeqqx2UmlO7vcvNx3vKvRG6ghL4OnNwhQ'
    },
    {
        title: 'Chehli za svatba',
        price: 2000,
        photoUrl: 'https://istatic.bazar.bg/photosbazar/05/fp/05d42e86c08aaf0d8162d42a8d8a453b.jpg'
    }
    ];

    $scope.addNewChehyl = function ($event) {
        $event.preventDefault();
        $scope.orders.unshift($scope.newChehyl);
        $scope.newChehyl = {};
    }
});