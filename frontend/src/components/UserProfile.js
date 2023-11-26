// src/components/UserProfile.js
import React, { useState } from 'react';
import '../styles/profile.css';
import axios from 'axios';

const UserProfile = () => {
  const [profileVisible, setProfileVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    address: '',
    contact: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user'); // Assuming your user API endpoint is '/api/user'
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.post('/api/user', userInfo); // Assuming your user API endpoint is '/api/user'
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className='view-container'>
      <div className="profile-container">
      <div className="profile-picture-container">
        <img src={"/* Add source of the profile picture here */"} alt="Profile" className="profile-picture" />
        <input type="file" className="profile-picture-input" accept="image/*" onChange={"* Add onChange handler for updating the photo */"} />
      </div>
      <form>
        <div className="form-fields">
          <label>Username:</label>
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Email:</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Address:</label>
          <input
            type="text"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Contact:</label>
          <input
            type="text"
            value={userInfo.contact}
            onChange={(e) => setUserInfo({ ...userInfo, contact: e.target.value })}
          />
        </div>
        <br />

        <button type="button" className="auth-button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
      </div>
      <button type="button" className="toggle-button" onClick={() => setProfileVisible(!profileVisible)}>
        {profileVisible ? 'Hide Profile' : 'Show Profile'}
      </button>
      </div>
  );
};

export default UserProfile;
