const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: String,
  seats: [Number],
  totalPrice: Number,
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);