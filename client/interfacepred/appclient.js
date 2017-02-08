
var app = angular.module('myApp', []);

app.controller('clientController', function($scope, $http) {
  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
    });
});

app.controller('userController', function($scope, $http) {
  $http.get("/user")
  .success(function(response) {
    $scope.users  = response;
    });
});

app.controller('messageController', function($scope, $http) {
  $http.get("/message")
  .success(function(response) {
    $scope.messages  = response;
  });

  $scope.clickMsg = function($event, message) {
      console.log("clicked message:", message);
  }

});


app.controller('listController',function($scope,$http){
  $http.get("/client").success(function(response){

    var type="Restaurant";
    console.log(type);


    $scope.clients=response;

    //var toto = $filter('filter')( $scope.clients, { type:  ["Restaurant"] });
    //toto=response;
  })

});



 app.controller('selectTypeClient', ['$scope', function($scope) {
   $scope.data = {

    multipleSelect: []

   };


}]);

app.controller('listControllerMsg',function($scope,$http){
  $http.get("/message").success(function(response){

    // var type=({{message.title}});
    console.log(response);
    $scope.messages=response;

    //var toto = $filter('filter')( $scope.clients, { type:  ["Restaurant"] });
    //toto=response;
  })

});



 app.controller('selectTypeMsg', ['$scope', function($scope) {
   $scope.data = {

    multipleSelect: []

   };


}]);
