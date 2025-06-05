const genreModel = require('../models/genre');

// GET all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await genreModel.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET genre by ID
exports.getGenreById = async (req, res) => {
  try {
    const genre = await genreModel.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: 'Genre not found' });
    res.json(genre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};