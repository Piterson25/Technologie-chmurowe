const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({ host: 'redis' });
const PORT = 3000;

app.use(express.json());

app.get('/messages', (req, res) => {
  client.lrange('messages', 0, -1, (err, messages) => {
    if (err) throw err;

    res.send(messages);
  });
});

app.post('/messages', (req, res) => {
  const message = req.body.message;

  client.rpush('messages', message, (err) => {
    if (err) throw err;

    res.send('Message added');
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
