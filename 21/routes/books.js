// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// ✅ Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price, genre } = req.body;
    const book = new Book({ title, author, price, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Retrieve all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, author, price, genre } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, genre },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
