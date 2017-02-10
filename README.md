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
