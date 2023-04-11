const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

mongoose.connect('mongodb://database:27017/database', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', (req, res) => {
  User.find({})
  .then(users => res.json(users))
  .catch(err => {
    console.log(err);
    res.status(500).send('Server error');
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
