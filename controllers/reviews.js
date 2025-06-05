const reviewModel = require('../models/review');

// GET all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find()
      .populate('book')
      .populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id)
      .populate('book')
      .populate('user');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET reviews by Book ID
exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ book: req.params.bookId })
      .populate('book')
      .populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET reviews by User ID
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ user: req.params.userId })
      .populate('book')
      .populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};