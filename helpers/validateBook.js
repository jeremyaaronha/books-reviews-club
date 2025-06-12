const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),
  
  author: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Author is required',
      'string.min': 'Author must be at least 1 character long',
      'string.max': 'Author cannot exceed 100 characters',
      'any.required': 'Author is required'
    }),
  
  genre: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Genre must be a valid ObjectId',
      'any.required': 'Genre is required'
    }),
  
  pages: Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .required()
    .messages({
      'number.base': 'Pages must be a number',
      'number.integer': 'Pages must be a whole number',
      'number.min': 'Pages must be at least 1',
      'number.max': 'Pages cannot exceed 10,000',
      'any.required': 'Pages is required'
    }),
  
  publishedDate: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.base': 'Published date must be a valid date',
      'date.max': 'Published date cannot be in the future'
    }),
  
  isbn: Joi.string()
    .pattern(/^(?:ISBN(?:-1[03])?:?\s)?(?=[-0-9\s]{17}$|[-0-9X\s]{13}$|[0-9X]{10}$)(?:97[89][-\s]?)?[0-9]{1,5}[-\s]?(?:[0-9]+[-\s]?){2}[0-9X]$/)
    .optional()
    .messages({
      'string.pattern.base': 'ISBN must be a valid ISBN-10 or ISBN-13 format'
    }),
  
  rating: Joi.number()
    .min(0)
    .max(5)
    .precision(1)
    .optional()
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 0',
      'number.max': 'Rating cannot exceed 5',
      'number.precision': 'Rating can have at most 1 decimal place'
    })
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error', 
      details: error.details[0].message 
    });
  }
  next();
};

module.exports = validateBook;