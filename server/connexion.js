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
/*  app.get('/',function(req,res){
     res.send('HELLOOO');
   });*/
    app.get('/',function(req,res){
       getClients(res,db);
      
     
                


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

///****** start filtrage client message date

///******  end filtrage client message date
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


var server = app.listen(8888)// démarrer l'appli sur le port 8888 si vous voulez, vous pouvez mettre n'importe quel port
//server.close();


function getClients(res,db){
  
   var collection = db.collection('message');
 
         var collection1 = db.collection('client');
         var cursor = collection.aggregate([{'$match': { 'deliveryDate': {'$gte' : new Date("2017-01-01T11:04:00.201Z")}}},{'$group': {'_id': '$clientId'}}]);

       //Lets iterate on the result
           cursor.each(function (err, doc) {

             if (err) {

               console.log(err);

             } else {
                if(doc==null){ } else
               {

              var cursor=collection1.find({"clientId":doc._id});
                //res.send(cursor);
               cursor.each(function(err,doc1){
                     if (err) {
                   console.log(err);

                   } else {
                   if(doc1==null){ }
                    else{
                     
                  
                            res.send(doc1.name);
        


                                           }

                   }

                    

                 })


               }

             }
           });
                  
               //res.redirect('/');
   // next();

}