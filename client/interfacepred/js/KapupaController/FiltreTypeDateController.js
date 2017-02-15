app.controller('FilterController',function($scope,$http){
    ViderLaListeDesQuestions();
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

function ViderLaListeDesQuestions(){
    //alert('je vide la liste des questions');

    var select = document.getElementById("questions");

    var length = select.options.length;
    for (i = 0; i < length; i++)
    {
      select.options[i] = null;
    }

  }
