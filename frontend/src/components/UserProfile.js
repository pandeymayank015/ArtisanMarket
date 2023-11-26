import React, { useState, useEffect } from 'react';
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
    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${localStorage.getItem('currentUser')?.username}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Make an API call to update the user profile
      await axios.put('/api/users/', userInfo);
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className='view-container'>
      <div className="profile-container">
        <div className="profile-picture-container">
          <img src={"https://i.pinimg.com/474x/0f/4a/ba/0f4aba8348df3a41b51ae07371088190.jpg"} alt="Profile" className="profile-picture" />
          <br></br>
          <input type="file" className="profile-picture-input" accept="image/*" onChange={"* Add onChange handler for updating the photo */"} />

          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<div className="toggle-container">
  <input
    type="checkbox"
    className="toggle-input"
    id="profileToggle"
    checked={profileVisible}
    onChange={() => setProfileVisible(!profileVisible)}
  />
  <label htmlFor="profileToggle" className="toggle-label">
    <span className="toggle-name">{profileVisible ? 'Show Profile' : 'Hide Profile'}</span>
  </label>
  </div>
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
    </div>
  );
};

export default UserProfile;