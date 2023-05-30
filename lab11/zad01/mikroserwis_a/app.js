const express = require('express');
const axios = require('axios');

const app = express();

const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`http://mikroserwis-b-service:${port}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Błąd komunikacji z mikroserwisem B');
  }
});

app.listen(port, () => {
  console.log(`Mikroserwis A nasłuchuje na porcie ${port}`);
});
