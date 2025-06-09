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

// PUT review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const updatedReview = await reviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('book').populate('user');

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST create new review
exports.createReview = async (req, res) => {
  try {
    const review = new reviewModel({
      book: req.body.book,
      user: req.body.user,
      rating: req.body.rating,
      comment: req.body.comment
    });
    const newReview = await review.save();
    await newReview.populate(['book', 'user']);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};