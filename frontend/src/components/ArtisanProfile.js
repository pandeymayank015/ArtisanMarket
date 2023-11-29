import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import { url } from '../utils/ApiUrls';
import ToastPopUp from './toast_popup/ToastPopUp';

const ArtisanProfile = () => {
  const [profileVisible, setProfileVisible] = useState(true);
  const [artisanInfo, setArtisanInfo] = useState({
    username: '',
    email: '',
    address: '',
    contact: '',
    profession: '',
    profilePicture: '',
  });
  const [showToast, setShowToast] = useState(false); // State for controlling the toast visibility

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Extract username from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Current User:', currentUser);

        // Make an API call to get artisan profile data, including the image
        const response = await axios.get(url + `/users/${currentUser?.username}`);
        setArtisanInfo({
          ...response.data,
          profilePicture: response.data.base64Image, // Assuming the base64 image is returned in the API response
        });
      } catch (error) {
        console.error('Error fetching artisan profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(url + '/users/', artisanInfo);
      console.log('User profile updated successfully!');
      setShowToast(true); // Show the toast message after updating the profile
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className='view-container'>
      <div className="profile-container">
        <div className="profile-picture-container">
          <img src={`data:image/png;base64,${artisanInfo.profilePicture}`} alt="Profile" className="profile-picture" />
          <br />
          <input type="file" className="profile-picture-input" accept="image/*" onChange={"* Add onChange handler for updating the photo */"} />
          <br />
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
        {/* Render the ToastPopUp component with show prop */}
        <ToastPopUp show={showToast} />
      </div>
    </div>
  );
};

export default ArtisanProfile;
