const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Witaj w mikroserwisie A!');
});

app.listen(port, () => {
  console.log(`Mikroserwis A nasłuchuje na porcie ${port}`);
});