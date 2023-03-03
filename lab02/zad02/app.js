const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const now = new Date();
  const date_options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  };
  const time_options = {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  const date = now.toLocaleDateString('pl-PL', date_options).replace(/\./g, '/');
  const time = now.toLocaleTimeString('pl-PL', time_options);
  const data = {
    date,
    time
  };
  res.json(data);
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
