app.controller('clientController', function($scope, $http) {
  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
  });
});


app.controller('selectTypeClient', ['$scope', function($scope) {
  $scope.data = {
    multipleSelect: []
  };
}]);
