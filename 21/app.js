// app.js
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`📚 Bookstore API is running at http://localhost:${PORT}`);
});
