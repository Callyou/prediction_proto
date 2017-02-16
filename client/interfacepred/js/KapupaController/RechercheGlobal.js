app.controller('rechercherGlobal', function($scope, $http) {
   $('#btnSearch').on('click',function(){
    // recuperer le texte à chercher puis chercher dans la collection message (pour tous les champs !!)
    var texteToSearch = $('#textToSearch').val();
    $http.get("/message")
    .success(function(response) {
      $scope.messages  = response;
      $scope.contact = "";
    });
    $http.get("/client")
    .success(function(response) {
      $scope.clients  = response;
    });
  });
});
