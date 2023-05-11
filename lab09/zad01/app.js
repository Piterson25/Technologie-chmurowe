const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Charles' },
  ];
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const user = { id: req.params.id, name: 'Tom' };
  res.status(200).json(user);
});

app.post('/users', (req, res) => {
  const newUser = { id: 3, name: 'New User' };
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const updatedUser = { id: req.params.id, name: 'Updated User' };
  res.status(200).json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
