// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../utils/ApiUrls';
import '../styles.css'; // Import your existing styles

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
    <div className="page-container">
      <div className="upload-form-container">
        <h2>Signup</h2>
        <form>
          <div className="form-fields">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <br />

          <div className="form-fields">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />

          <div className="form-fields">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />

          <div className="form-fields">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="artisan">Artisan</option>
            </select>
          </div>
          <br />

          <div className="form-fields">
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <br />

          <button type="button" className="upload-button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
