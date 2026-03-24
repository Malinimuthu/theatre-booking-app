import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '20px', background: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h2>Theatre Booking</h2>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
        <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</Link>
      </div>
    </nav>
  );
};

export default Navbar;