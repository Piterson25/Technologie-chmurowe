const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Witaj w mikroserwisie B!');
});

app.listen(port, () => {
  console.log(`Mikroserwis B nasłuchuje na porcie ${port}`);
});