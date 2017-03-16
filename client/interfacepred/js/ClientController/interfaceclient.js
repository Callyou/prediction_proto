app.service('loggedClient', function( $http, $location, $route ) {

  var pClient = null;

  var messages = [];

  return {

    getClient: function() {
      return pClient;
    },
    getClientCb: function(cb) {
      $http.get("/client/"+ pClient.clientId).success(function(clientRes) {
        pClient = clientRes
        cb(clientRes)
      })
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
      /* Force to go on the dashboard and to reload the page. */
        $location.url("/");
        $route.reload();
      })

    }
  };
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
    loggedClient.getClientCb(function(client) {
      $scope.loggedClient = client
    });
    console.log($scope.loggedClient)
  }

});
