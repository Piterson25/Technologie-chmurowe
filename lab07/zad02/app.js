const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://db:27017';
const dbName = 'mydb';

app.use((req, res, next) => {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    req.db = client.db(dbName);
    next();
  });
});

app.get('/users', function(req, res) {
  req.db.collection('users').find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
