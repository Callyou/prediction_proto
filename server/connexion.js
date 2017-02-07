// installation du module mongodb par: npm install MongoDB
var mongodb= require('mongodb');// chargement module mongodb
// installation du module mongodb par: npm install express
var exp = require('express'); // chargement module express
// instatiation du module
var app = exp();
// Création d'une connexion client
var MongoClient = mongodb.MongoClient
// le lien de la base données sur le serveur de base de données
var url = 'mongodb://localhost:27017/miageTest'
// fonction de connexion avec la base de données
MongoClient.connect(url, function (err, db) {
  //console.log(err);
  if(err) throw err;
  // Affichage du message de dans la racine pour faire joli :
  app.get('/',function(req,res){
     res.send('HELLOOO');
   });
//crée une route a /public et donne acces au fichier qui a dans repertoire client
   app.use('/public', exp.static('../client'));

  console.log('connexion etablie')
// code qui exploite la base db
// la collection de la base données est : client
	 db.collection('client',function(err,collection){
// récuperation de  tous les clients : localhost:port/client
		 app.get('/client',function(req,res){
				   collection.find().toArray(function(err,client){
					  if(!err) res.send(client)
					  console.log(res)
				   })
		 })
	 app.post('/client',function(req,res){
	     collection.insert(req.body,function(err,client){
		      if(!err) res.send(client)
		   })
	 })
// Récuperation d'un client en copiant son _id : localhost:port/client/_id
	 app.get('/client/:id',function(req,res){
		   collection.findOne({"_id": new mongodb.ObjectID(req.params.id)},function(err,client){
		        if(!err) res.send(client)
		   })
	 })
	})

//****Accès à la base user ***
db.collection('user',function(err,collection){
// récuperation de tous les utilisateurs : localhost:port/user
  app.get('/user',function(req,res){
        collection.find().toArray(function(err,user){
         if(!err) res.send(user)
         console.log(res)
        })
  })
app.post('/user',function(req,res){
    collection.insert(req.body,function(err,user){
       if(!err) res.send(user)
    })
})
// Récuperation d'un utilisateur en copiant son _id : localhost:port/user/_id
app.get('/user/:id',function(req,res){
    collection.findOne({"_id": new mongodb.ObjectID(req.params.id)},function(err,user){
         if(!err) res.send(user)
    })
})
})

//****Accès à la base message ***
db.collection('message',function(err,collection){
// récuperation de  tous les messages : localhost:port/message
  app.get('/message',function(req,res){
        collection.find().toArray(function(err,message){
         if(!err) res.send(message)
         console.log(res)
        })
  })
app.post('/message',function(req,res){
    collection.insert(req.body,function(err,message){
       if(!err) res.send(message)
    })
})
// Récuperation d'un message en copiant son _id : localhost:port/message/_id
app.get('/message/:id',function(req,res){
    collection.findOne({"_id": new mongodb.ObjectID(req.params.id)},function(err,message){
         if(!err) res.send(message)
    })
})
})
});
//Pour utilisation des routes static
 /*app.use('/temp',express.static('./temp'))*/
 //ordre important
 /*app.use(express.static('temp'),function(req,res,next){
      res.send('HLLO');
 })*/
 // app.get(path,function(req,res){})
 /* collection.insert(
	       {
	       first_name :'Caliane',
		   Last_name: 'You'
		   }
		   function(err,livre){
		      if(!err) console.log('Ok!')
		   }
	  )*/

var server = app.listen(8888)// démarrer l'appli sur le port 8888 si vous voulez, vous pouvez mettre n'importe quel port
//server.close();
