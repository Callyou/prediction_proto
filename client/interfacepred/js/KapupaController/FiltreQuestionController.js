app.controller('SelectQuestionController',function($scope,$http){

  var ques;
  var clientid;


  $("#questions").change(function(){

    clientid= $("#champcaché").val();
    ques= $("#questions").val();
    $http.get("/message").success(function(response){

      var jsonmessage=JSON.stringify(response);

      $.each( response, function( key, value ) {
        if( value.clientId==clientid && value.title==ques){

          $("#estimation").text(value.hasOwnProperty('estimation') ? value.estimation : "non renseigné");
          $("#tauxerreur").text(value.hasOwnProperty('successRate') ? value.successRate : "non renseigné");
          $("#retourclient").text(value.hasOwnProperty('feedBack') ? value.feedBack.realNb : "non renseigné");

          if(value.hasOwnProperty('answer')== true)
          {
            google.charts.load('current', {'packages':['bar','corechart']});
            google.charts.setOnLoadCallback(drawStuff);

            function drawStuff() {
              var data = new google.visualization.arrayToDataTable([
                ['', ''],
                ["envoyés", parseInt(value.nbPull.mobilePull)+parseInt(value.nbPull.websitePull)],
                ["répondus",  parseInt(value.answer.stat.total)]

                ]);

              var options = {
               colors: ['#800040'],
               width:400,
               legend: { position: 'none' },
                   bars: 'vertical', // Required for Material Bar Charts.
                   axes: {
                    x: {
              0: { side: 'top', label: 'Nombre de messages'} // Top x-axis.
            }
          },
          bar: { groupWidth: "90%" }
        };

        var chart = new google.charts.Bar(document.getElementById('top_x_div'));
        chart.draw(data, options);
      };



      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['type de réponses', 'nombre de réponses'],
          ['Oui',      parseInt(value.answer.stat.positive)],
          ['Non',     parseInt( value.answer.stat.negative)]


          ]);

        var options = {
          colors: ['#FFA500', '#800040'],
          title: 'Nombre de réponses'
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }

    }else {

      $("#graphe1").text("non renseigné");
      $("#graphe2").text("non renseigné");
    }
  }
});
    })
    $('#divquestion').show();
  })
});
