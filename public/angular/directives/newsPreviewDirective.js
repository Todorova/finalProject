app.directive('news', function () {
    return {
        templateUrl: 'angular/directives/newsPreviewTemplate.htm',
        restrict: 'E',
        scope: {
            news: '='
        }
    };
});