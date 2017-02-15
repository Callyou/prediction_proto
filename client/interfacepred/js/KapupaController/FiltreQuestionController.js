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
