// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/ApiUrls';

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
        navigate('/dashboard', { state: { username } });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
