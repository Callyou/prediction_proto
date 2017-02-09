
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

  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
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
     $("#nom").text(client.name);
     $("#ville").text(client.city);
     $("#adresse").text(client.locality.address)
     $("#siteweb").text(client.contact.webSite);
     $("#email").text(client.contact.email);
     $("#contact").text(client.contact.tel);

      $("#test1").val(client.clientId);
   


    }  


  })
  
});



app.controller('selectTypeClient', ['$scope', function($scope) {
   $scope.data = {
    
    multipleSelect: []
    
   }
}]);








