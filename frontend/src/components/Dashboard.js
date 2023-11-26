// src/Dashboard.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const username = location.state?.username || ''; // Use default value to avoid 'null' error

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>
        <Link to="/events">Events</Link>
      </p>
    </div>
  );
};

export default Dashboard;
