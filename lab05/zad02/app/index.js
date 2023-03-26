const express = require('express');
const app = express();

const my_value = process.env.MY_VARIABLE;

app.get('/', (req, res) => {
  res.send(`Zmienna srodowiskowa: ${my_value}`);
});

app.listen(3000, () => {
  console.log('Nasluchiwanie na porcie 3000');
});