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


function gettauxerreurglobal(array){

  var somme=0;
  var moyenne=0;
  for (var i=0;i<array.length;i++){

    somme+=array[i];
  }
  moyenne=somme/array.length;
  return moyenne;
}

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
           alert("objectclient2 length: " + objectclient2.length);
           $scope.clientsobj = objectclient2;
         })
      }
      $("#dataTables-example2").show();
      $("#dataTables-example").hide();
    }
