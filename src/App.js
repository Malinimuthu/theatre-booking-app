import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Booking from './pages/Booking';
import Success from './pages/Success'; 
import Snacks from './pages/Snacks';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      {/* Chinna Navbar Style */}
      <nav style={{ background: '#000', padding: '15px', textAlign: 'center', borderBottom: '2px solid #e50914' }}>
          <h2 style={{ color: '#e50914', margin: 0 }}>🎬 MALINI'S CINEMA BOOKING</h2>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;