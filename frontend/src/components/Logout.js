// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/ApiUrls';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
        const response = await axios.post(url + '/auth/logout', {});
        console.log(response);
        if (response.status === 200) {
            // Clear localStorage
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('currentUser');

            // Notify the parent component about the logout
            onLogout();
            // Navigate to the login page
            navigate('/');
        }
    } catch (error) {
        console.error('Error signing out:', error);
    }
 };

  return (
    <button onClick={handleLogout} className="upload-button" style={{ marginLeft: '20px' }}>
      Logout
    </button>
  );
};

export default Logout;
