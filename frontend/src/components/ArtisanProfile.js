// src/components/ArtisanProfile.js
import React, { useState } from 'react';
import '../styles/profile.css';
const ArtisanProfile = () => {
  const [artisanInfo, setArtisanInfo] = useState({
    username: 'ArtisanDoe',
    email: 'artisan@example.com',
    address: '456 Craft St',
    contact: '987-654-3210',
    profession: 'Painter',
  });

  const handleUpdateProfile = () => {
    // Implement logic to update the artisan profile
    console.log('Updating artisan profile:', artisanInfo);
  };

  return (
    <div>
      <h2>Artisan Profile</h2>
      <div className="profile-picture-container">
        <img src={"/* Add source of the profile picture here */"} alt="Profile" className="profile-picture" />
        <input type="file" className="profile-picture-input" accept="image/*" onChange={"/* Add onChange handler for updating the photo */"} />
      </div>
      <form>
        <div className="form-fields">
          <label>Username:</label>
          <input
            type="text"
            value={artisanInfo.username}
            onChange={(e) => setArtisanInfo({ ...artisanInfo, username: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Email:</label>
          <input
            type="email"
            value={artisanInfo.email}
            onChange={(e) => setArtisanInfo({ ...artisanInfo, email: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Address:</label>
          <input
            type="text"
            value={artisanInfo.address}
            onChange={(e) => setArtisanInfo({ ...artisanInfo, address: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Contact:</label>
          <input
            type="text"
            value={artisanInfo.contact}
            onChange={(e) => setArtisanInfo({ ...artisanInfo, contact: e.target.value })}
          />
        </div>
        <br />

        <div className="form-fields">
          <label>Profession:</label>
          <input
            type="text"
            value={artisanInfo.profession}
            onChange={(e) => setArtisanInfo({ ...artisanInfo, profession: e.target.value })}
          />
        </div>
        <br />

        <button type="button" className="auth-button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ArtisanProfile;
