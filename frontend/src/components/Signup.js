// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../utils/ApiUrls'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('image', image);

      console.log(formData);
      const response = await axios.post(url +'/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

      console.log(response.data);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="artisan">Artisan</option>
        </select>
        <br />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />

        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
