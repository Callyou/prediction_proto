
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',
function($routeProvider) {

  $routeProvider.when('/hello', {
    template: 'KAAAAAAAAAAWWWWWWWWWWAIIII + HELLO',
    controller: function($scope, $http) {
      console.log('hello');
    }
  })
  .when('/message/:clientId', {
    templateUrl: '/public/interfacepred/pages/messageTemplate.html',
    controller: function($scope, $http, $routeParams) {
      console.log($routeParams);
      $http.get("/message/"+$routeParams.clientId)
     .success(function(response) {
       $scope.message = response;
       console.log($routeParams.clientId);
     });
    }
 })
  // .when('/message/:clientId', {
  //   templateUrl: '/public/interfacepred/pages/messagessent.html',
  //   controller: 'MessageViewCountCtrl'
  // })
  // .when('/client/:clientId', {
  //   templateUrl: '/public/interfacepred/pages/messagesdone.html',
  //   controller: 'MessageCountViewCtrl'
  // })
  // .when('/client/:clientId', {
  //   templateUrl: '/public/interfacepred/pages/messagesdetailsdone.html',
  //   controller: 'MessageCountViewCtrl'
  // })
  // .when('/client/:clientId', {
  //   templateUrl: '/public/interfacepred/pages/feedback.html',
  //   controller: 'MessageCountViewCtrl'
  // })
  .otherwise({
    templateUrl: '/public/interfacepred/pages/messagessent.html',
    controller: 'messageController'
  });
  // .otherwise({
  //   templateUrl: '/public/interfacepred/pages/selectMessage.html',
  //   controller: 'messageController'
  // });
  // .otherwise({
  //   templateUrl: '/public/interfacepred/pages/selectMessagebase.html',
  //   controller: 'messageController'
  // });
}]);

app.controller('MessageViewCtrl', function($scope, $http, $routeParams) {
  console.log($routeParams);
  $http.get("/message/"+$routeParams.messageId)
  .success(function(response) {
    $scope.message = response;
  });
});

app.controller('MessageCountViewCtrl', function($scope, $http, $routeParams) {
  console.log($routeParams);
  $http.get("/message/"+$routeParams.clientId)
  .success(function(response) {
    $scope.message = response;
  });
});

app.controller('clientController', function($scope, $http) {
  $http.get("/client")
  .success(function(response) {
    $scope.clients  = response;
  });
});

app.controller('userController', function($scope, $http) {
  $http.get("/user")
  .success(function(response) {
    $scope.users  = response;
  });
});

app.controller('messageController', function($scope, $location, $http) {
  var refresh = function(){
    $http.get("/message")
    // $http.get("/client/"+ $scope.clientId +"/messages")
    .success(function(response) {
      $scope.messages  = response;
      $scope.contact = "";
      $scope.messagewithoutdelivery = response.filter(function(lm){
        // $scope.hello = response.filter(function(ab){
        //   return ab.clientId == client.clientId
        // });
        console.log(lm.deliveryDate);
        return lm.deliveryDate == null
      });
      $scope.messagewithdelivery = response.filter(function(lm){
        console.log(lm);
        return lm.deliveryDate != null
      });
      $scope.messagewithcontent = response.filter(function(lm){
        console.log(lm);
        return lm.content != null
      });
    });


    $http.get("/client")
    .success(function(response) {
      $scope.clients  = response;
    });
  };

  refresh();

  $scope.clickMsg = function($event, message) {
    $location.url('#' + message._id);
    console.log("clicked message:", message);
  }

  $scope.showClient = function(message) {
    $location.path('#/user' + message._id);
  };

  $scope.clickMsg2 = function($event, message) {
    $location.url('#' + message.clientId);
    console.log("clicked message:", message);
  }

  $scope.showClient2 = function(message) {
    $location.path('#/user' + message.clientId);
  };

  $scope.addContact = function(message){
    console.log($scope.contact, message, JSON.stringify($scope.contact));
    $http.post( '/message', $scope.contact ).success(function(response){
      console.log("res", response);
    })
  }

});


app.controller('listController',function($scope,$http){
  $http.get("/client").success(function(response){

    $scope.clients=response;
    $scope.test = function(client){

      $('.page1').hide();
      $('.page2').show();
      $("#nom").text(client.name);
      $("#ville").text(client.city);
      $("#adresse").text(client.locality.address)
      $("#siteweb").text(client.contact.webSite);
      $("#email").text(client.contact.email);
      $("#contact").text(client.contact.tel);

      $("#test1").val(client.clientId);
      console.log(type);
    }
  })

});


app.controller('selectTypeClient', ['$scope', function($scope) {
  $scope.data = {

    multipleSelect: []

  };


}]);

app.controller('listControllerMsg',function($scope,$http){
  $http.get("/message").success(function(response){
    $scope.messages=response;
  })

});



app.controller('selectTypeMsg', ['$scope', function($scope) {
  $scope.data = {
    multipleSelect: []
  };
}]);
