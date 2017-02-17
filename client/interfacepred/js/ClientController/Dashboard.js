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
