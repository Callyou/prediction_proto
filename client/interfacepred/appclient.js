
var app = angular.module('myApp', ['ngRoute']);

app.controller('dataTableCtrl', function($scope, $http, $routeParams, loggedClient) {
  $http.get("/message/"+$routeParams._id)
  .success(function(response) {
    $scope.message = response;
  });
  $scope.quantity = 10;
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/message/:_id', {
      templateUrl: '/public/interfacepred/pages/messageTemplate.html',
      controller : 'MessageViewCtrl'
      // controller: function($scope, $http, $routeParams, loggedClient) {
      //   $http.get("/message/"+$routeParams._id)
      //   .success(function(response) {
      //     $scope.message = response;
      //   });
      // }
    }).when('/messagelist', {
      templateUrl: '/public/interfacepred/pages/messageList.html',
      controller: function($scope, $http, $routeParams, loggedClient) {
        var messages = loggedClient.getMessages();
        switch ($routeParams.messageType) {
          case 'messagewithoutdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.deliveryDate == null;
              });
            break;
          case 'messagewithdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.deliveryDate !== null;
              });
            break;
          case 'messagewithcontent':
              $scope.messages = messages.filter(function(lm) {
                return lm.feedBack == null
              });
            break;
          default:
            $scope.messages = messages;
        }
      }
    }).otherwise({
      templateUrl: '/public/interfacepred/pages/1dashboard.html',
      controller: 'dashboardController'
    });
  }
]);

app.service('loggedClient', function( $http, $location, $route ) {

  var pClient = null;

  var messages = [];

  return {
    getClient: function() {
      return pClient;
    },
    getMessages: function() {
      return messages;
    },
    setClient: function(client) {
      pClient = client;
      $http.get("/client/"+ pClient.clientId+ "/messages").success(function(response) {
        messages = response;
        /* Force to go on the dashboard and to reloadc the page. */
        $location.url("/");
        $route.reload();
      });
    }
  };
});


app.controller('MessageViewCtrl', function($scope, $http, $routeParams) {
  $http.get("/message/"+$routeParams._id)
  .success(function(response) {
    $scope.message = response;
  });
});

app.controller('dashboardController', function($location, $scope, $routeParams, loggedClient) {
  $scope.currentClient = loggedClient.getClient();
  $scope.messages = loggedClient.getMessages();

  $scope.messagewithoutdelivery = $scope.messages.filter(function(lm){
    return lm["deliveryDate "] == null;
  });

  $scope.messagewithdelivery = $scope.messages.filter(function(lm){
    return lm["deliveryDate "] != null;
  });

  $scope.messagewithcontent = $scope.messages.filter(function(lm) {
    return lm.feedBack == null
  });
});

app.controller('navbarController', function($scope, $location, $http, loggedClient) {
  $scope.clientId = null;

  $scope.data = {
    multipleSelect: []
  };

  $http.get("/client").success(function(response) {
    $scope.clients  = response;
  });

  $scope.updateCli = function() {
    var client = {
      clientId: $scope.clientId
    }

    loggedClient.setClient(client);
    $scope.loggedClient = loggedClient.getClient();
  }

  $scope.addContact = function(message){
    console.log($scope.contact, message, JSON.stringify($scope.contact));
    $http.post( '/message', $scope.contact ).success(function(response){
      console.log("res", response);
    })
  }
});
