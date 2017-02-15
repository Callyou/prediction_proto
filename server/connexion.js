// installation du module mongodb par: npm install MongoDB
var mongodb= require('mongodb');// chargement module mongodb
// installation du module mongodb par: npm install express
var exp = require('express'); // chargement module express
// instatiation du module
var app = exp();
// Création d'une connexion client
var MongoClient = mongodb.MongoClient
// le lien de la base données sur le serveur de base de données
var url = 'mongodb://localhost:27017/miageTest';


// pour parser le document envoyé à MongoDB
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//crée une route a /public et donne acces au fichier qui a dans repertoire client
app.use('/public', exp.static('../client'));

// fonction de connexion avec la base de données
MongoClient.connect(url, function (err, db) {
  //console.log(err);
  if(err) throw err;
  // Affichage du message de dans la racine pour faire joli :
  app.get('/',function(req,res){
    res.send('HELLOOO');
  });

  // retourne


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
      collection.findOne({"clientId": req.params.id}, function(err,client) {
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
    app.post('/user', function(req,res){
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
// fonction ajout d'un attribut entier
    app.post('/message',function(req, res){
      console.log(req.body);
      collection.insert(req.body, function(err, doc){
        res.json(doc);
      });
    })
// a revoir error callback
    app.delete('/message/:id',function(req, res){
      var id = req.params.id;
        console.log(id);
      collection.remove({_id : new mongodb.ObjectID(id)}, function(err, doc){
        res.json(doc);
        console.log(res.json(doc));
      });
    });
    app.get('/message/:id', function (req, res) {
      var id = req.params.id;
      console.log(id);
      collection.findOne({_id: mongodb.ObjectID(id)}, function(err, doc){
        res.json(doc);
      })
    });
    app.post('/message/:id', function (req, res) {
      var id = req.params.id;

      collection.update({_id: id}, req.body);
      res.send(req.body)
    });
    // Récuperation d'un message en copiant son _id : localhost:port/message/_id
    app.get('/message/:id',function(req,res){
      collection.findOne({"_id": new mongodb.ObjectID(req.params.id)},function(err, message){
        if(!err) res.send(message)
      })
    })

    // Récuperation d'un client en copiant son _id : localhost:port/client/_id et l'associant au clientId de message
    app.get('/client/:id/messages', function(req, res) {
      collection.find({"clientId": req.params.id}).toArray(function(err, messages) {
        if(!err) console.log(messages); res.send(messages)
      })
    })

    app.get('/:date',function(req,res){
        var collection = db.collection('message');
        //var collection1 = db.collection('client');
        collection.distinct("clientId",{'deliveryDate': new Date(req.params.date)},function(err, result){
          if(!err){
            console.log(result);
            res.send(result);
          }
        });
  });

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

var server = app.listen(8888);// démarrer l'appli sur le port 8888 si vous voulez, vous pouvez mettre n'importe quel port
//server.close();
