const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let currentId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = { id: currentId++, title, description, dueDate };
  tasks.push(newTask);
  res.json(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send('Task not found');
  }
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send('Task not found');
  }
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
