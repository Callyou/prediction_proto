
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
});


app.controller('listController',function($scope,$http){
  $http.get("/client").success(function(response){

 
   
    $scope.clients=response;

    //var toto = $filter('filter')( $scope.clients, { type:  ["Restaurant"] });
    //toto=response;
    //$scope.clientName ='toto';
    $scope.test = function(client){




      $('.page1').hide();
      $('.page2').show();
     $("#nom").append(client.name);
     $("#ville").append(client.city);
     $("#adresse").append(client.locality.address)
     $("#siteweb").append(client.contact.webSite);
     $("#email").append(client.contact.email);
     $("#contact").append(client.contact.tel);

    

    }  

  })
  
});

app.controller('selectTypeClient', ['$scope', function($scope) {
   $scope.data = {
    
    multipleSelect: []
    
   }
}]);








