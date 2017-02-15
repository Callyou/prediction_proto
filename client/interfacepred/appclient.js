
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/message/:_id', {
      templateUrl: '/public/interfacepred/pages/messagedetails.html',
      controller : 'MessageViewDetailsCtrl'
    }).when('/messagelist', {
      templateUrl: '/public/interfacepred/pages/messageList.html',
      controller: function($scope, $http, $routeParams, loggedClient) {
        var messages = loggedClient.getMessages();
        switch ($routeParams.messageType) {
          case 'messagewithoutdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.deliveryDate== null;
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
        $scope.quantity = 10;
        $scope.orderByMe = function(x) {
          $scope.myOrderBy = x;
        }
      }
    }).when('/messagelistdone', {
      templateUrl: '/public/interfacepred/pages/messageListdone.html',
      controller : 'MessageViewCtrl'
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

app.controller('MessageViewDetailsCtrl', function($scope, $http, $routeParams, loggedClient) {
 $scope.message = loggedClient.getMessages().filter(function(lm){return lm._id == $routeParams._id;})[0];
 $scope.parseFloat = parseFloat;
 console.log($scope.message)
});

app.controller('MessageViewCtrl', function($scope, $http, $routeParams, loggedClient) {
 $scope.messages = loggedClient.getMessages();
 $scope.quantity = 10;
 $scope.orderByMe = function(x) {
   $scope.myOrderBy = x;
 }
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
