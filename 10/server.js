const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const task = { id: currentId++, text };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = +req.params.id;
  const { text } = req.body;
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = text;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = +req.params.id;
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
