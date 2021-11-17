var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var mongodb = require('mongodb');

router.post('/', (req, res) => {
    let form = req.body;
    console.log(form);
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('Hospital');
        let query = {username: new RegExp(form.username, 'i'), password: new RegExp(form.password, 'i')};
        dbo.collection('users').find(query).toArray((err, result) => {
            if (err) throw err;
            db.close();
            res.json(result);
          });
      })
    
  });

module.exports = router;