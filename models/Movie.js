const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  genre: String,
  language: String
});

module.exports = mongoose.model('Movie', movieSchema);