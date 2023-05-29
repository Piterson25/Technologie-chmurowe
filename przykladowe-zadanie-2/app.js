const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const Redis = require("ioredis");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const clientRedis = new Redis({
  host: "redis",
  port: 6379,
});

clientRedis.on("error", (err) => console.log(err));
clientRedis.on('connect', () => {
    console.log('Połączono z Redis');
  });

mongoose.connect('mongodb://db:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const taskSchema = new mongoose.Schema({
  task_name: String,
  status: String
});

const Tasks = mongoose.model('tasks', taskSchema);

app.get('/tasks', (req, res) => {
  Tasks.find({})
  .then(users => res.json(users))
  .catch(err => {
    console.log(err);
    res.status(500).send('Server error');
  });
});


app.post('/tasks', (req, res) => {
  const { task_name, status } = req.body;

  const newTask = new Tasks({ task_name, status });

  newTask.save()
    .then(savedTask => {
      res.json(savedTask);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
});


app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { task_name, status } = req.body;

  try {
    const updatedTask = await Tasks.findByIdAndUpdate(taskId, { task_name, status }, { new: true });

    if (updatedTask) {
      await clientRedis.incr("updated_tasks_count");

      res.json(updatedTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

app.get('/count', async (req, res) => {
  try {
    const value = await clientRedis.get("updated_tasks_count");
    res.json({ count: value });
  } catch (err) {
    console.error("Błąd podczas pobierania wartości licznika:", err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));