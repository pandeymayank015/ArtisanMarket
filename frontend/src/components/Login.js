// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/ApiUrls';
import '../styles/styles.css'; // Import your existing styles

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(url + '/auth/login', { username, password });
      console.log(response);
      if (response.status === 200) {
        const { jwtToken, username, email } = response.data;
  
        // Store the JWT token in localStorage
        localStorage.setItem('jwtToken', jwtToken);

        // Store user details in localStorage
        localStorage.setItem('currentUser', JSON.stringify({ username, email }));
  
        // Redirect to the dashboard with the username as a parameter
        navigate("/resource-center");
      }
      console.log(response.data);
     

    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="page-container">
      <div className="upload-form-container">
        <form>
          <div className="form-fields">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="form-fields">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="button" className="upload-button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
