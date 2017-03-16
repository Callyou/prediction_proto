app.controller('MessageViewDetailsCtrl', function($scope, $http, $routeParams, loggedClient) {
 $scope.message = loggedClient.getMessages().filter(function(lm){return lm._id == $routeParams._id;})[0];
 $scope.parseFloat = parseFloat;
});
