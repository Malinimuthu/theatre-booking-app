// Server/index.js (Copy & Paste this)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// INGA THAAN MUKKIYAM: Exact DB Name 'theatreDB'
mongoose.connect('mongodb://127.0.0.1:27017/theatreDB')
  .then(() => console.log("✅ Database Connected: theatreDB"))
  .catch(err => console.log("❌ DB Error:", err));

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    image: String,
    description: String
}, { collection: 'movies' });

const Movie = mongoose.model('Movie', movieSchema);

app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));