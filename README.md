# les liens pour se connecter à l'application:
  - pour se connecter à l'interface kapupa : http://localhost:8888/public/interfacepred/pages/interfacekapupa.html
  - pour se connecter à l'interface kapupa : http://localhost:8888/public/interfacepred/pages/0_interfaceclient.html

# prediction_proto Single Page App

## Connexion à la base de données MongoDB via le serveur NodeJs
- installer MongoDB
  - faire un mongorestore de la base dump, coller dans le `bin/` où MongoDB a été installé, le répertoire dump dézippé.
  Puis ouvrir un invité de commande dans ce répertoire et copier-coller la commande suivante
  ```sh
 mongorestore.exe dump
  ```
- installer nodejs npm
- installer express
- dans `bin/` où a été installé MongoDB lancer le serveur mongod.exe, mongo.exe
- dans le repertoire git du projet preditcion_proto/server/, ouvrir un invité de commande et lancer :
```sh
 npm install mongodb
 npm install express
 npm install body-parser
 npm install method-override
 npm install mongoose
 node connexion.js
```
Possibilité d'installer le css et le front-end avec
```sh
 npm install bootstrap
 npm install angular
```
Aller dans un navigateur web à l'adresse pour voir le contenu de la base affiché : `http://localhost:8888/`

# IHM CSS HTML
## Pour rajouter un Dropdown menu ajouter après les dropdown existant
```sh
                        <!-- /.dropdown -->
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                                </li>
                                <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                                </li>
                                <li class="divider"></li>
                                <li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                                </li>
                            </ul>
                            <!-- /.dropdown-user -->
                        </li>
                        <!-- /.dropdown -->
 ```
 # Interface client :
 ## Architecture :

- 0_interfaceclient.html
  - 1_dashboard.html
    - 2_messagesList.html
      - 3_messagesdetails.html
    - 2_messagesListdone.html
    - 2_messagesListdoneFeedback.html

## html : Les fichiers html se trouvent dans prediction_proto > client> interfacepred > pages

-0_interfaceclient.html : est la vue dans laquelle on gére l'affichage de la page d'acceuil client.

- 1_dashboard.html : C'est dans cette vue qu'on gére les vignettes messages en cours, messages estimés et retour sur prédiction de la page d'acceuil.
```sh
<div class="row">
    <a ng-href="#/messagelist?messageType=messagewithoutdelivery">
    <div class="col-lg-4 col-md-8">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="row">
            <div class="col-xs-3">
              <i class="fa fa-cogs fa-4x" aria-hidden="true"></i>
            </div>
            <div class="col-xs-9 text-right">
              <div class="huge">
                {{messagewithoutdelivery.length}}
              </div>
              <div>Messages en cours</div>
            </div>
          </div>
        </div>
        <div class="panel-footer">
            <span class="pull-left">Voir détails</span>
            <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
            <div class="clearfix"></div>
        </div>
      </div>
    </div>
	 </a>
```
-2_messageList.html : c'est ici qu'on gére l'affichage des message en cours
```sh
<div class="panel-body">
  <thead>
    <tr>
    <th ng-click="orderByMe('id')">id <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('creationDate')">Date de création <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('dueDate')">Date d échéance <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('title')">Titre <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
  </tr>
</thead>
<tbody id="table" ng-repeat="message in messages | filter:search | orderBy:myOrderBy| limitTo:quantity ">
    <tr>
      <td><a ng-href="#/message/{{message._id}}">{{message._id}}</a></td>
      <td>{{message.creationDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.dueDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.title}}</td>
    </tr>
  </tbody>
</table>
</div>
```
-2_messageListdone.html : ici on affiche l'ensemble des messages estimés.

```sh
<div class="panel-body">
  <thead>
    <tr>
    <th ng-click="orderByMe('messageId')">id <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('creationDate')">Date de création <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('dueDate')">Date d'échéance <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('deliveryDate')">Date d'estimation <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
    <th ng-click="orderByMe('title')">Titre <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </th>
  </tr>
</thead>
<tbody id="table" ng-repeat="message in messages | filter:search | orderBy:myOrderBy| limitTo:quantity ">
    <tr>
      <td><a ng-href="#/message/{{message._id}}">{{message.messageId}}</a></td>
      <td>{{message.creationDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.dueDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.deliveryDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.title}}</td>
    </tr>
  </tbody>
</table>
</div>
```
-2_messageListDoneFeedback.html : ici on affiche les messages estimés dont le client n'a pas encore effectué un retour.
```sh
<div class="panel-body">
  <thead>
    <tr>
      <th ng-click="orderByMe('id')">id <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('creationDate')">Date de création<i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('dueDate')">Date d'échéance <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('title')">Titre <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('estimation')">Estimation <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('content')">Commentaires <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
      </th>
      <th ng-click="orderByMe('realNb')">Nombre d'entrée réel <i class="fa fa-arrows-v" aria-hidden="true" align="right"></i>
    </tr>
  </thead>
  <tbody id="table" ng-repeat="message in messages | filter:search | orderBy:myOrderBy| limitTo:quantity ">
    <tr>
      <td><a ng-href="#/message/{{message._id}}">{{message._id}}</a></td>
      <td>{{message.creationDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.dueDate | date:'dd/MM/yyyy'}}</td>
      <td>{{message.title}}</td>
      <td>{{message.estimation}}</td>
      <td>
        <input type="text" name="subject"
        placeholder="{{message.feedBack.content}}"
        class="contact-subject form-control"
        style="width: 200px; height: 100px; text-align : center" id="contact-subject"
        ng-model="message.feedBack.content"> </td>
      <td >
        <input type="number" name="nombre" value="0" ng-model="message.feedBack.realNb">
        <menu type="toolbar"> </td>
      <td >
        <button class="btn btn-danger" ng-click="updateMessage(message._id)">
          Envoyer</button></td>
      </tr>
    </tr>
  </tbody>
</table>
</div>
```
-3_messagesdetails.html : Ici on gére l'affichage du détail des messages.

## Controleur : ./client/interfacepred/js/ClientController/

# Back end : le dossier “Server “

Le dossier Server contient tout le back-end  de l’application. Il inclut deux fichiers :
 - Connexion.js
 - calculEstimation.js

## le fichier : Connexion.js

L’application est lancé par ce fichier. Il contient la connexion avec la base de données par le chargement du module mongo comme suit :

```sh
var mongodb= require('mongodb'); // chargement du module mongo par node
var url = 'mongodb://localhost:27017/miageTest'; // le chemin vers la base de données Mongo
MongoClient.connect(url, function (err, db) {
  // Récupère les collections (client et message) par un get
  // Insère dans les collections (client et message) par un get  
                                          }
```
Pour récupérer les données d’une collection  on utilise la fonction “get” du module express:
```sh
db.collection('client',function(err,collection){
// récuperation de  tous les clients : localhost:port/client
   app.get('/client',function(req,res){
     collection.find().toArray(function(err,client){
      if(!err) res.send(client)
        console.log(res)
        })
   })
})
```
Pour insérer et mettre à jour les données d’une collection  on utilise la fonction “post” du module express:
```sh
db.collection('client',function(err,
  app.post('/client',function(req,res){
    collection.insert(req.body,function(err,client){
      if(!err) res.send(client)
        })
   })
})
```
## le fichier : calculEstimation.js

Ce fichier contient deux fonctions :
La fonction de prédiction : calculEstimation  qui pour etre changer par le doctorant
> - La fonction est appelé dans le fichier connexion.js pour l’insertion de la propriété “estimation” .
    La fonction de calcul de taux de d’erreur calculées à partir du nombre réel retourner pour le client et l’estimation (la prédiction)
> - La fonction est appelé dans le fichier connexion.js pour l’insertion de la propriété “succesRate”

# Interface Kapupa :
## FRONT END:
- Tous les controlleurs se trouvent dans le dossier js (chemin: client/js/)
- Tous les views se trouvent dans le dossier pages (chemin : client/pages/)

- Interface administrateur kapupa contient une page d'acceuil (le fichier
  interfacekapupa.html) avec plusieurs views qui s'affichent suivant le mode de routage d'angular js effectuer dans le fichier controleur "appkapupa.js":

```
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

```

### Affichage de la liste des clients par type client ###

-  suite au routage faite par le fichier appkapupa.js et le contrôleur ClientKapupaController.js
   la view listeClient.html affiche la liste des clients suivant le type de client choisi
   - ClientKapupaController.js:
   app.controller('clientController', function($scope, $http) {
     $http.get("/client")
     .success(function(response) {
       $scope.clients  = response;
     });
   });

   app.controller('selectTypeClient', ['$scope', function($scope) {
     $scope.data = {
       multipleSelect: []
     };
   }]);

   - listeClient.html:

```
   <div class="panel-body" >
       <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
         <tbody id="tbodyFiltreByTypeClient">
           <tr  class="odd gradeX" ng-repeat="client in clients| filter:{type:data.multipleSelect} |filter: globalSearch ">
             <td><a href="" ui-sref="home"id="a" ng-click="getclients(client);">{{client.name}}</a></td>
           </tr>
           <tr href="" ui-sref="home" ng-show="!clients.length">
               <td>
                   <p>Aucun client trouv&eacute; pour votre selection</p>
               </td>
           </tr>
         </tbody>
       </table>
   </div>
   ---

```
### Affichage de la liste des clients par Date ###

la liste des clients sera affiche via toujours la view listeClient ci-dessous
avec le contrôleur FiltreTypeDateController

FiltreTypeDateController :

```
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

```
### Affichage de la fiche client ###
suite au routage faite par le fichier appkapupa.js et le contrôleur FicheClientController.js,
au moment où on sélectionne le client on a une fiche client qui s'affiche via la view "ficheClient.html"

FicheClientController.js:

```
$http.get("/client").success(function(response){
  $scope.getclients = function(client){
    ViderLaListeDesQuestions();
    var jsonclient=JSON.stringify(client);

    $(".nom").text(client.hasOwnProperty('name') ? client.name : "non renseigné");

    $(".ville").text(client.hasOwnProperty('city') ? client.city : "non renseigné");

    $("#adresse").text(client.locality.hasOwnProperty('address') ? client.locality.address : "non renseigné");

    $("#siteweb").text(client.contact.hasOwnProperty('webSite') ? client.contact.webSite : "non renseigné");

    $("#email").text(client.contact.hasOwnProperty('email') ? client.contact.email : "non renseigné");

    $("#contact").text(client.contact.hasOwnProperty('tel') ? client.contact.tel : "non renseigné");
...

  }
}

```
ficheClient.html:

```

<div class="row" id="titre">
  <div class="col-lg-12" style="text-align:center;" >
    <h3 class="page-header"><span class="nom"></span></h3>
    <div class="col-lg-12" style="text-align:center;margin-bottom:20px;">
     <button type="button" class="btn btn-outline btn-danger" >Taux d'erreur global : <span id="tauxerreurglobal"><b>20%</b></span></button>
   </div>


 </div>


 <!-- /.col-lg-12 -->
</div>


<div class="row" id="ficheclient">
 <div class="col-md-12">

  <div class="panel panel-warning" ng-controller="FicheClientController" >
    <div class="panel-heading">
     Fiche Client
   </div>
   <div class="panel-body">
    <div class="row">
      <div class="col-md-6">
        <ul>
         <li><b> Nom : </b><span class="nom"></span> </li>
         <li><b> Ville : </b><span class="ville"></span> </li>
         <li><b> Adresse : </b><span id="adresse"></span></li>
       </ul>

     </div>
     <div class="col-md-6">
      <ul>
       <li><b> Contact : </b><span id="contact"></span> </li>
       <li><b> Site Web : </b><span id="siteweb"></span></li>
       <li><b> Email : </b><span id="email"></span></li>
     </ul>
   </div>
 </div>
</div>

</div>
</div>
</div>
<div id="divquestion">
<div class="row">
<div class="col-lg-6">
  <div class="panel panel-default">
    <div class="panel-heading">
      total réponse/total questions
    </div>
    <div class="panel-body">
    <span class="nonrenseigne">Non renseigné </span>
    <div  id="top_x_div" style="width: 400px; height: 300px;display:block;margin:0 auto;"></div>

    </div>

  </div>
  <!-- /.col-lg-4 -->
</div>

<div class="col-lg-6">
  <div class="panel panel-default">
    <div class="panel-heading">
    total oui/non
   </div>
   <div class="panel-body">
     <span class="nonrenseigne">Non renseigné </span>
      <div id="donutchart" style="width:400px; height:300px;display:block;margin:0 auto;"></div>

  </div>

</div>
<!-- /.col-lg-4 -->
</div>
</div>


<div class="row">
<div class="col-lg-4">
  <div class="panel panel-green">
    <div class="panel-heading">
      Résultat de prédiction
    </div>
    <div class="panel-body" id="estim">
      <h3><span id="estimation"></span></h3>
    </div>

  </div>
  <!-- /.col-lg-4 -->
</div>
<div class="col-lg-4">
  <div class="panel panel-yellow">
    <div class="panel-heading">
      Retour client
    </div>
    <div class="panel-body" id="retour">
      <h3><span id="retourclient"></span> </h3>
    </div>

  </div>
  <!-- /.col-lg-4 -->
</div>
<div class="col-lg-4">
  <div class="panel panel-red">
    <div class="panel-heading">
     Taux d'erreur
   </div>
   <div class="panel-body" id="taux">
    <h3><span id="tauxerreur"></span></h3>
  </div>

</div>
<!-- /.col-lg-4 -->
</div>
</div>

</div>

```
