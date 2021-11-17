var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var mongodb = require('mongodb');

router.get('/checkname/:term', (req, res) => {
    let term = req.params.term;
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
      let dbo = db.db('Hospital');
      let query = {username: new RegExp(term, 'i')};
      dbo.collection('users').find(query).toArray((err, result) => {
        if (err) throw err;
        db.close();
        console.log(result);
        res.json(result);
      });
    })
  });

router.post('/save', (req, res) => {
  let form = req.body;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    dbo.collection('users').insertOne(form, (err, result) =>{
      if (err) throw err;
      db.close();
      res.end();
    });
  });
});

router.get('/list/:term', (req, res) => {
  let term = req.params.term;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    let dbo = db.db('Hospital');
    let query = {type: new RegExp(term, 'i')};
    dbo.collection('users').find(query).toArray((err, result) => {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  })
});

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    let idToDelete = {_id: new mongodb.ObjectID(id)};
    dbo.collection('users').deleteOne(idToDelete, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    });
  })
});

router.put('/update/:id', (req, res) => {
  let form = req.body;
  let id = req.params.id;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    let idToUpdate = {_id: new mongodb.ObjectID(id)};
    let formToUpdate = {$set: form};
    dbo.collection('users').updateOne(idToUpdate, formToUpdate, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    });
  })
});

module.exports = router;
