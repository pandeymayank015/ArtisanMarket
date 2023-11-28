// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/ArtisanStoreManagement">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
