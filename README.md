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

- index.html
  - dashboard.html
    - messagessent.html
      - messagessentdetails.html
    - messagesdone.html
      - messagesdonedetails.html

## html :
- messageList.html
```sh
      <div class="panel-body" style="overflow-y:scroll">
        <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example1">
            <tbody id="table">
                <td>id</td>
                <td>Date de création</td>
                <td>Date d échéance </td>
                <td>Titre</td>
                <tr ng-repeat="message in messages">
                      <td>{{message._id}}</td>
                      <td>{{message.dueDate}}</td>
                      <td>{{message.title}}</td>
                </tr>
            </tbody>
          </table>
        </div>
```
- index.html
- dashboard.html
```sh
      
```
- messagessent.html
- messagessentdetails.html
- messagesdone.html
- messagesdonedetails.html

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


