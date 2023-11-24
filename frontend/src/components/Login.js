// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../utils/ApiUrls';
import '../styles/styles.css'; // Import your existing styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(url +'/auth/login', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="upload-form-container">
        <h2>Login</h2>
        <form>
          <div className="form-fields">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <br />

          <div className="form-fields">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />

          <button type="button" className="upload-button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
