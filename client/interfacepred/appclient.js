var app = angular.module('myApp', ['ngRoute','angular.morris','ngMessages']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/message/:_id', {
      templateUrl: '/public/interfacepred/pages/3_messageDetails.html',
      controller : 'MessageViewDetailsCtrl'
    }).when('/messagelist', {
      templateUrl: '/public/interfacepred/pages/2_messageList.html',
      controller: function($scope, $http, $routeParams, loggedClient) {
        var messages = loggedClient.getMessages();
        switch ($routeParams.messageType) {
          case 'messagewithoutdelivery':
              $scope.messages = messages.filter(function(lm){
                return (lm.answer != null && lm.answer.stat == null) | lm.answer == null;
              });
            break;
          case 'messagewithdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.answer != null && lm.answer.stat;
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
    })
    .when('/messagelistdone', {
      templateUrl: '/public/interfacepred/pages/2_messageListDone.html',
      controller: function($scope, $http, $routeParams, loggedClient) {
        var messages = loggedClient.getMessages();
        switch ($routeParams.messageType) {
          case 'messagewithoutdelivery':
              $scope.messages = messages.filter(function(lm){
                return (lm.answer != null && lm.answer.stat == null) | lm.answer == null;
              });
            break;
          case 'messagewithdelivery':
              $scope.messages = messages.filter(function(lm){
                return lm.answer != null && lm.answer.stat;
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

    }).when('/messagelistdonefeedback', {
      templateUrl: '/public/interfacepred/pages/2_messageListDoneFeedback.html',
      controller : 'MessageViewCtrl'
    }).otherwise({
      templateUrl: '/public/interfacepred/pages/1_dashboard.html',
      controller: 'dashboardController'
    });
  }
]);
