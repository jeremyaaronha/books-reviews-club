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

// POST create new book
exports.createBook = async (req, res) => {
  try {
    const book = new bookModel({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      pages: req.body.pages,
      publishedDate: req.body.publishedDate,
      isbn: req.body.isbn,
      rating: req.body.rating
    });
    const newBook = await book.save();
    await newBook.populate('genre');
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};