const bookModel = require('../models/book');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().populate('genre');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id).populate('genre');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};