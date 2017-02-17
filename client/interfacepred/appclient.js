var app = angular.module('myApp', ['ngRoute','angular.morris']);

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
                return lm.answer == null;
              });
            break;
          case 'messagewithdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.answer !== null;
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

    updateMessage: function(msg, successCallBack) {
      $http.post("/message/" + msg._id, msg).success(function(res) {
        var idx = messages.findIndex((function(object) {return object._id == msg._id}));
        messages[idx] = res;
        if(successCallBack) {
          successCallBack(res, messages);
        }
      });
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
// $scope.messages = loggedClient.getMessages();
// $scope.parJson = function (json) {
//    return angular.fromJson(json);
// }
//  $scope.data = $scope.messages.filter(function(lm) { return lm.answer != null & lm._id == $routeParams._id;}).map(function(elem) {
//    return {
//
//      y: elem.content[0].positive,
//      a: elem.answer.stat.positive,
//      b: elem.answer.stat.negative
//    }
//  });
});

app.controller('MessageViewCtrl', function($scope, $http, $routeParams, loggedClient) {

  $scope.messages = loggedClient.getMessages().filter(function(lm) {
    return lm.feedBack == null;
  }).map(function(elem) {
    var copyWithTemporaryFeedBack = JSON.parse(JSON.stringify(elem));
    copyWithTemporaryFeedBack.feedBack = {
      content:"",
      realNb: 0
    };
    return copyWithTemporaryFeedBack;
  });

  $scope.updateMessage = function(_id) {
    var msg = $scope.messages.find( function(elem) { return _id == elem._id });
    loggedClient.updateMessage(msg, function(res, messages) {

      $scope.messages = messages.filter(function(lm) {
        return lm.feedBack == null;
      }).map(function(elem) {
        var copyWithTemporaryFeedBack = JSON.parse(JSON.stringify(elem));
        copyWithTemporaryFeedBack.feedBack = {
          content:"",
          realNb: 0
        };
        return copyWithTemporaryFeedBack;
      });
    });

  }

  $scope.messages.map(console.log)
  $scope.quantity = 10;
  $scope.orderByMe = function(x) {
    $scope.myOrderBy = x;
  }

  $scope.remove = function(_id) {
    console.log(_id);
    $http.delete('/message/' + _id).success(function(response){
    });

  }

  $scope.edit = function(_id) {
    console.log(_id);
    $http.get('/message/'+ _id).success(function(response) {
      $scope.contact = response;
    })
  }
});

app.controller('dashboardController', function($location, $scope, $routeParams, loggedClient) {
  $scope.currentClient = loggedClient.getClient();
  $scope.messages = loggedClient.getMessages();

  $scope.messagewithoutdelivery = $scope.messages.filter(function(lm){
    return lm.answer == null;
  });

  $scope.messagewithdelivery = $scope.messages.filter(function(lm){
    return lm.answer !== null;
  });

  $scope.messagewithcontent = $scope.messages.filter(function(lm) {
    return lm.feedBack == null
  });

  $scope.data = $scope.messages.filter(function(lm) { return lm.feedBack != null }).map(function(elem) {
    return {
      y: elem.title,
      a: elem.feedBack.realNb,
      b: elem.estimation
    }
  });
  console.log($scope.data);

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

});
