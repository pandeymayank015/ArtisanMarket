// src/components/ArtisanProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const ArtisanProfile = () => {
  const [profileVisible, setProfileVisible] = useState(true);
  const [artisanInfo, setArtisanInfo] = useState({
    username: '',
    email: '',
    address: '',
    contact: '',
    profession: '',
  });

  useEffect(() => {
    // Simulate fetching artisan profile data
    const mockArtisanData = {
      username: 'ArtisanDoe',
      email: 'artisan@example.com',
      address: '456 Craft St',
      contact: '987-654-3210',
      profession: 'Painter',
    };

    setArtisanInfo(mockArtisanData);
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Simulate updating artisan profile
      console.log('Simulating artisan profile update:', artisanInfo);

      // Uncomment the following lines when you have the actual update logic
      // await axios.post('/api/artisan', artisanInfo);
      // console.log('Artisan profile updated successfully!');
    } catch (error) {
      console.error('Error updating artisan profile:', error);
    }
  };

  return (
    <div className='view-container'>
      <div className="profile-container">
        <div className="profile-picture-container">
          <img src={"https://i.pinimg.com/474x/0f/4a/ba/0f4aba8348df3a41b51ae07371088190.jpg"} alt="Profile" className="profile-picture" />
          <br></br>
          <input type="file" className="profile-picture-input" accept="image/*" onChange={"/* Add onChange handler for updating the photo */"} />

<br></br>
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
        <form className="profile-form">
          <div className="form-fields">
            <label>Username:</label>
            <input
              type="text"
              value={artisanInfo.username}
              onChange={(e) => setArtisanInfo({ ...artisanInfo, username: e.target.value })}
            />
          </div>

          <div className="form-fields">
            <label>Email:</label>
            <input
              type="email"
              value={artisanInfo.email}
              onChange={(e) => setArtisanInfo({ ...artisanInfo, email: e.target.value })}
            />
          </div>

          <div className="form-fields">
            <label>Address:</label>
            <input
              type="text"
              value={artisanInfo.address}
              onChange={(e) => setArtisanInfo({ ...artisanInfo, address: e.target.value })}
            />
          </div>

          <div className="form-fields">
            <label>Contact:</label>
            <input
              type="text"
              value={artisanInfo.contact}
              onChange={(e) => setArtisanInfo({ ...artisanInfo, contact: e.target.value })}
            />
          </div>

          <div className="form-fields">
            <label>Profession:</label>
            <input
              type="text"
              value={artisanInfo.profession}
              onChange={(e) => setArtisanInfo({ ...artisanInfo, profession: e.target.value })}
            />
          </div>

          <button type="button" className="update-button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtisanProfile;
