const Joi = require('joi');

const reviewSchema = Joi.object({
    book: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'string.pattern.base': 'Book ID must be a valid ObjectId',
          'any.required': 'Book ID is required'
        })
    }).required(),
  
    user: Joi.object({
      _id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'string.pattern.base': 'User ID must be a valid ObjectId',
          'any.required': 'User ID is required'
        })
    }).required(),
  
    rating: Joi.number()
      .integer()
      .min(0)
      .max(5)
      .required()
      .messages({
        'number.base': 'Rating must be a number',
        'number.integer': 'Rating must be a whole number',
        'number.min': 'Rating must be at least 0',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
      }),
  
    comment: Joi.string()
      .min(1)
      .max(1000)
      .optional()
      .allow('')
      .messages({
        'string.min': 'Comment must be at least 1 character long if provided',
        'string.max': 'Comment cannot exceed 1000 characters'
      })
  });

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

module.exports = validateReview;