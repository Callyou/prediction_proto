
var app = angular.module('myApp', []);

app.controller('planetController', function($scope, $http) {
  $http.get("/client")
  .success(function(response) {
    $scope.names  = response;
    });
});
