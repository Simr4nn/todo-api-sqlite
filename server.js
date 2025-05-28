const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());
app.use(express.static('public'));

// GET all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { name, priority, isComplete, isFun } = req.body;
  db.run(
    'INSERT INTO todos (name, priority, isComplete, isFun) VALUES (?, ?, ?, ?)',
    [name, priority, isComplete ? 1 : 0, isFun ? 1 : 0],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
