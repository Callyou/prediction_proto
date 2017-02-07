
var getClient = angular.module('getClient', []);
angular.module('select2',['rt.select2']);
getClient.controller('getclientController', function($scope, $http) {
  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
    });
});
