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
    console.log($scope.form)
    var msg = $scope.messages.find( function(elem) { return _id == elem._id });
    loggedClient.updateMessage(msg, function(res, messages) {
console.log(msg)
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
