
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

app.controller('messageController', function($scope, $location, $http) {
var refresh = function(){
  $http.get("/message")
  // $http.get("/client/"+ $scope.clientId +"/messages")
  .success(function(response) {
    $scope.messages  = response;
    $scope.contact = "";
  });


  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
    });
};

refresh();

  $scope.clickMsg = function($event, message) {
    $location.url('#' + message._id);
      console.log("clicked message:", message);
  }

  $scope.showClient = function(message) {
    $location.path('#/user' + message._id);
  };

  $scope.addContact = function(message){
    console.log("lol", $scope.contact, message, JSON.stringify($scope.contact));
    $http.post( '/message', $scope.contact ).success(function(response){
        console.log("res", response);
    })
  }
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
      console.log(type);
    }
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
