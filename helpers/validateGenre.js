const Joi = require('joi');

const genreSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
});

function validateGenre(req, res, next) {
  console.log("🚧 Entered in validateGenre");
  console.log("📦 Body received:", req.body);

  const { error } = genreSchema.validate(req.body, { convert: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateGenre;
