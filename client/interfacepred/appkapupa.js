
var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
 $urlRouterProvider.otherwise('/');
$stateProvider
  .state('home',{
    url:'/',
    views: {
      'liste': {
        templateUrl: 'listeClient.html',
        controller:'FicheClientController'
      },
      'fiche': {
        templateUrl: 'ficheClient.html'
      }
	 }
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

$scope.addContact = function(message){
  console.log("lol", $scope.contact, message, JSON.stringify($scope.contact));
  $http.post( '/message', $scope.contact ).success(function(response){
    console.log("res", response);
  })
}
});


app.controller('FicheClientController',function($scope,$http){

  var clientid;
  var tauxerreur =[];

  $http.get("/client").success(function(response){
    $scope.getclients = function(client){
      var select = document.getElementById("questions");
      var length = select.options.length;
      for (i = 0; i < length; i++)
      {
        select.options[i] = null;
      }
      var jsonclient=JSON.stringify(client);

      console.log(jsonclient);

       $(".nom").text(client.hasOwnProperty('name') ? client.name : "non renseigné");

      $(".ville").text(client.hasOwnProperty('city') ? client.city : "non renseigné");

      $("#adresse").text(client.locality.hasOwnProperty('address') ? client.locality.address : "non renseigné");

      $("#siteweb").text(client.contact.hasOwnProperty('webSite') ? client.contact.webSite : "non renseigné");

      $("#email").text(client.contact.hasOwnProperty('email') ? client.contact.email : "non renseigné");

      $("#contact").text(client.contact.hasOwnProperty('tel') ? client.contact.tel : "non renseigné");

      $('#question').show();
      $('.page1').hide();
      $('.page2').show();
      $('#divquestion').hide();

      var jsonclient1=JSON.stringify(client);
      clientid=client.clientId;
      $("#champcaché").val(clientid);

        $('#questions').append(new Option(""));
      $http.get("/message").success(function(response){
        var jsonmessage=JSON.stringify(response);

        if (jsonmessage.indexOf(clientid)>-1){

         $.each( response, function( key, value ) {
          if(value.clientId==clientid){

            if (typeof value.successRate != "undefined") {

              tauxerreur.push(Number(value.successRate));
            }

            $('#questions').append(new Option(value.title));

          }
        });

         var tauxerreurglobal= gettauxerreurglobal(tauxerreur);

         $("#tauxerreurglobal").text(tauxerreurglobal);

       }
     })

    }
  })
});

app.controller('listController',function($scope,$http){
  $http.get("/client").success(function(response){

    $scope.clients=response;

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

app.controller('SelectQuestionController',function($scope,$http){

  var ques;
  var clientid;

  $("#questions").change(function(){
    $("#donut-example").empty();
    $("#donut-example1").empty();

    clientid= $("#champcaché").val();
    ques= $("#questions").val();
    $http.get("/message").success(function(response){

      var jsonmessage=JSON.stringify(response);

      $.each( response, function( key, value ) {
        if( value.clientId==clientid && value.title==ques){
          Morris.Donut({
            element: 'donut-example',
            data: [
            {label: "total réponses",value: value.answer.stat.total},
            {label: "total messages envoyés", value: parseInt(value.nbPull.mobilePull)+parseInt(value.nbPull.websitePull)}

            ]
          });

          Morris.Donut({
            element: 'donut-example1',
            data: [
            {label: "réponses oui ",value: value.answer.stat.positive},
            {label: "réponses non", value: value.answer.stat.negative}

            ]
          });
          $("#estimation").text(value.estimation);
          $("#retourclient").text(value.feedBack.realNb);
          $("#tauxerreur").text(value.successRate);

        }
      });
    })
    $('#divquestion').show();
  })
});
function gettauxerreurglobal(array){

  var somme=0;
  var moyenne=0;
  for (var i=0;i<array.length;i++){

    somme+=array[i];
  }
  moyenne=somme/array.length;
  return moyenne;
}

app.controller('FilterController',function($scope,$http){
    $("#multipleSelect").on('change', function(){
      if($("#deliverydate").val()){

        // s'il y a une date déjà choisi
        functionFilterByDate($scope, $http);
      }
      else {

        // s'il n'y a pas une date (filtre que par type des clients)
        $("#dataTables-example2").hide();
        $("#dataTables-example").show();
      }
    });

    $("#deliverydate").change(function(){
        functionFilterByDate($scope, $http);
    })
})


function functionFilterByDate($scope, $http){

      var date;
      var dateJustYearDayAndMonth;
      var clients=[];
      var objectclient=[];
      var objectclient2 = [];

      var clientType = $('#multipleSelect').find(":selected").text();
      var dateString =  $("#deliverydate").val();



      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      var date = (new Date(new Date(dateString) - tzoffset)).toISOString().slice(0,-1);

    
      dateJustYearDayAndMonth = date.substring(0,10);
      $http.get("/message").success(function(response){
        var jsonmessage=JSON.stringify(response);

        $.each( response, function( key, value ) {
          if(typeof value.deliveryDate != "undefined"){
           var deliveryDateFromMongo =(value.deliveryDate).substring(0,10);
           if(deliveryDateFromMongo == dateJustYearDayAndMonth){
             clients.push(value.clientId);
           }
         }
       })
      })

      if(clientType){
       // filtrer la liste des clients à la fois par la date et par type client

       $http.get("/client").success(function(response){
        $.each( response, function( key, value ) {
         if ((clients.indexOf(value.clientId) != -1)) {
              if(value.type == clientType){
                  objectclient.push(value);
              }
         }
       })
       console.log(objectclient);
       for(var i=0; i < objectclient.length; i++){
         if((objectclient2.indexOf(objectclient[i] > -1))||(objectclient2.length == 0)){
             objectclient2.push(objectclient[i]);
         }
       }
        $scope.clientsobj = objectclient2;
      })
      }

      else{
       // filter la liste des clients par date => pour toutes les types clients

          $http.get("/client").success(function(response){
           $.each( response, function( key, value ) {
            if ((clients.indexOf(value.clientId) != -1)) {
                  objectclient.push(value);
            }
          })
          console.log(objectclient);
          for(var i=0; i < objectclient.length; i++){
            if((objectclient2.indexOf(objectclient[i] > -1))||(objectclient2.length == 0)){
                objectclient2.push(objectclient[i]);
            }
          }
           $scope.clientsobj = objectclient2;
         })
      }
      $("#dataTables-example2").show();
      $("#dataTables-example").hide();
    }
