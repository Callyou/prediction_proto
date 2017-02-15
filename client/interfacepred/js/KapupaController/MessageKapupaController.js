app.controller('messageController', function($scope, $location, $http) {
  var refresh = function(){
  $http.get("/message")
  .success(function(response) {
    $scope.messages  = response;
    $scope.contact = "";
  });
  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
  });
};
});


app.controller('listControllerMsg',function($scope,$http){
  $http.get("/message").success(function(response){
    $scope.messages=response;
  })
});

app.controller('selectTypeMsg', ['$scope', function($scope) {
  $scope.data = {
    multipleSelect: []
  };
}]);
