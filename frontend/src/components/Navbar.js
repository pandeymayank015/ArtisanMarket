// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../styles/styles.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/resource-center">Dashboard</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Logout onLogout={onLogout} />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
          <Link to="/ArtisanStoreManagement">Admin</Link>
        </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
