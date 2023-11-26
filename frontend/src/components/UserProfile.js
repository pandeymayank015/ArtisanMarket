// src/components/UserProfile.js
import React, { useState } from 'react';
import '../styles/profile.css';

const UserProfile = () => {
  const [profileVisible, setProfileVisible] = useState(true);

  const [userInfo, setUserInfo] = useState({
    username: 'JohnDoe',
    email: 'john@example.com',
    address: '123 Main St',
    contact: '123-456-7890',
  });

  const handleUpdateProfile = () => {
    // Implement logic to update the user profile
    console.log('Updating user profile:', userInfo);
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
