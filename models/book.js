const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  pages: { type: Number, required: true },
  publishedDate: { type: Date },
  isbn: { type: String },
  rating: { type: Number, min: 0, max: 5 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);