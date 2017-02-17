app.controller('dashboardController', function($location, $scope, $routeParams, loggedClient) {
  $scope.currentClient = loggedClient.getClient();
  $scope.messages = loggedClient.getMessages();
console.log("coucouc je suis dans dashboard", $scope.messages)
  $scope.messagewithoutdelivery = $scope.messages.filter(function(lm){
    return (lm.answer != null && lm.answer.stat == null) | lm.answer == null;
  });

  $scope.messagewithdelivery = $scope.messages.filter(function(lm){
      return lm.answer != null && lm.answer.stat;
  });

  $scope.messagewithcontent = $scope.messages.filter(function(lm) {
    return lm.feedBack == null
  });

  $scope.data = $scope.messages.filter(function(lm) { return lm.feedBack != null }).slice(1).slice(-5).map(function(elem) {
    return {
      y: elem.title,
      a: elem.feedBack.realNb,
      b: elem.estimation
    }
  });
  console.log($scope.data);

});
