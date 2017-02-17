app.controller('FicheClientController',function($scope,$http){

  var clientid;
  var tauxerreur =[];

  $http.get("/client").success(function(response){
    $scope.getclients = function(client){
      ViderLaListeDesQuestions();
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

            var dateString =  $("#deliverydate").val();
            if(dateString != ''){

              //Enlever le décalage horaire
              var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
              var date = (new Date(new Date(dateString) - tzoffset)).toISOString().slice(0,-1);

              // date selectionée en année, mois et jour
              var dateJustYearDayAndMonth = date.substring(0,10);

              // date de prediction (deliveryDate from mongodb)
              var deliveryDateFromMongo =(value.deliveryDate).substring(0,10);
              if(deliveryDateFromMongo == dateJustYearDayAndMonth){
                $('#questions').append(new Option(value.title));
              }
            }
            else {
                $('#questions').append(new Option(value.title));
            }
          }
        });

         var tauxerreurglobal= gettauxerreurglobal(tauxerreur);

         $("#tauxerreurglobal").text(tauxerreurglobal);

       }
     })

    }
  })
});
