app.controller('FilterController',function($scope,$http){
    ViderLaListeDesQuestions();
    $("#multipleSelect").on('change', function(){
      if($("#deliverydate").val()){
        functionFilterByDate($scope, $http);
      }
      else {
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

function afficherModalText(){

    //alert('afficher modal');
    //$('#researchDiv').hide();
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // affichage du modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      $('#researchDiv').show();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        $('#researchDiv').show();
      }
    }

    // when clik on select type or date close de model
    $("#multipleSelect").on('click', function(){
      modal.style.display = "none";
      $('#researchDiv').show();
    });
    $("#deliverydate").on('click', function(){
      modal.style.display = "none";
      $('#researchDiv').show();
    });
}
