var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var mongodb = require('mongodb');

router.post('/save', (req, res) => {
  let form = req.body;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    dbo.collection('doctors').insertOne(form, (err, result) =>{
      if (err) throw err;
      db.close();
      res.end();
    });
  });
});

router.get('/list', (req, res) => {
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    dbo.collection('doctors').find().toArray((err, result) => {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
});

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) throw err;
    let dbo = db.db('Hospital');
    let idToDelete = {_id: new mongodb.ObjectID(id)};
    dbo.collection('doctors').deleteOne(idToDelete, (err, result) => {
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
    dbo.collection('doctors').updateOne(idToUpdate, formToUpdate, (err, result) => {
      if (err) throw err;
      db.close();
      res.end();
    });
  })
});

router.get('/search/:term', (req, res) => {
  let term = req.params.term;
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    let dbo = db.db('Hospital');
    let query = {lname: new RegExp(term, 'i')};
    dbo.collection('doctors').find(query).toArray((err, result) => {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  })
})

module.exports = router;
