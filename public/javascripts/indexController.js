var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/',{
            templateUrl: "/views/list.html"
        }).
        when('/list',{
            templateUrl: "/views/list.html"
        }).
        when('/grid',{
            templateUrl: "/views/grid.html"
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

myApp.controller('AngularJSCtrl', function($scope, dataService) {
    $scope.eventList = [];
    $scope.submit = function() {
        if ($scope.url) {
            dataService.getData($scope.url).then(function(data){
                $scope.eventList = data.data;
                $scope.url ="";
            });
        }
    };
});
