const express = require('express');
const { MongoClient } = require("mongodb");

const Db = "mongodb://localhost:27017";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();

server.get('/', async (_, res) => {
  await client.connect();

  const stats = await client.db('test').collection("customers").find({}).toArray()
  res.status(200).json(stats);

  client.close();
});

server.listen(8080);