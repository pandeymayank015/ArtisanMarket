import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils/ApiUrls';
import ToastPopUp from './toast_popup/ToastPopUp';

const UserProfile = () => {
  const [profileVisible, setProfileVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    address: '',
    contact: '',
    profilePicture: '',
  });
  const [showToast, setShowToast] = useState(false); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Current User:', currentUser);

        const response = await axios.get(url + `/users/${currentUser?.username}`);
        setUserInfo({
          ...response.data,
          profilePicture: response.data.base64Image,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(url + '/users/', userInfo);
      console.log('User profile updated successfully!');
      setShowToast(true); 
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className='view-container'>
      <div className="profile-container">
        <div className="profile-picture-container">
          <img src={`data:image/png;base64,${userInfo.profilePicture}`} alt="Profile" className="profile-picture" />
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

        <ToastPopUp show={showToast} />
      </div>
    </div>
  );
};

export default UserProfile;
