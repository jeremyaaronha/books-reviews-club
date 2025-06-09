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

// PUT genre by ID
exports.updateGenreById = async (req, res) => {
  try {
    const updatedGenre = await genreModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    res.json(updatedGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE genre by ID
exports.deleteGenreById = async (req, res) => {
  try {
    const deletedGenre = await genreModel.findByIdAndDelete(req.params.id);

    if (!deletedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    res.json({ message: 'Genre deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create new genre
exports.createGenre = async (req, res) => {
  try {
    const genre = new genreModel({
      name: req.body.name
    });
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};