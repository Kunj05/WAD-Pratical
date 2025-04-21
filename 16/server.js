const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Optional: Add more routes
app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/gallery.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
