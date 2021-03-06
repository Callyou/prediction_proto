app.controller('dashboardController', function($location, $scope, $routeParams, loggedClient) {
  $scope.currentClient = loggedClient.getClient();
  $scope.messages = loggedClient.getMessages();
console.log("coucou je suis dans dashboard", $scope.messages)
  $scope.messagewithoutdelivery = $scope.messages.filter(function(lm){
    return (lm.answer != null && lm.answer.stat == null) | lm.answer == null;
  });

  $scope.messagewithdelivery = $scope.messages.filter(function(lm){
      return lm.answer != null && lm.answer.stat;
  });

  $scope.messagewithcontent = $scope.messages.filter(function(lm) {
    return lm.feedBack == null
  });

  $scope.data = $scope.messages.filter(function(lm) { return lm.feedBack != null })
  .sort(function(a, b) {
    a = new Date(a.dueDate);
    b = new Date(b.dueDate);
    return a-b;
}).slice(-5).map(function(elem) {
    return {
      y: elem.title,
      a: elem.feedBack.realNb,
      b: elem.estimation
    }
  });
  console.log($scope.data);

});
