app.controller('FicheClientController',function($scope,$http){

  var clientid;
  var tauxerreur =[];

  $http.get("/client").success(function(response){
    $scope.getclients = function(client){
      ViderLaListeDesQuestions();
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
