import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UpdateProductRatingForm from './components/12_Rating_&_Review/UpdateProductRatingForm';
import Wishlist from './components/15_User_Wishlists/Wishlist';
import ArtisanStoreManagement from './components/3_Admin/ArtisanStoreManagement';
import ProductApprovalForm from './components/3_Admin/ProductApprovalForm';
import ArtisanProfile from './components/ArtisanProfile';
import CommunityForum from './components/CommunityForum';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Events from './components/events/Events';
import EventCreation from './components/events/EventCreation';
import UserProfile from './components/UserProfile';
import ArtisanWorkshopProfile from './components/artisan-workshop-profile/ArtisanWorkshopProfile';
import BlogDetails from './components/artisan-workshop-profile/BlogDetails';
import UploadForm from './components/resource-center/UploadForm';
import ResourceCenter from './components/resource-center/resource-center';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('jwtToken') !== null);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className='app-container'>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAuthenticated ? (
            <>
              <Route path="/resource-center" element={<ResourceCenter />} />
              <Route path="/events" element={<Events />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/artisan-profile" element={<ArtisanProfile />} />
              <Route path="/community-forum" element={<CommunityForum />} />
            </>
          )}
          <Route path="/event-creation" element={<EventCreation />} />
          <Route path="/artisan/:username" element={<ArtisanWorkshopProfile />} />
          <Route path="/upload/:username" element={<UploadForm />} />
          <Route path="/ArtisanStoreManagement" element={<ArtisanStoreManagement />} />
          <Route path="/ProductApprovalForm" element={<ProductApprovalForm />} />
          <Route path="/UpdateProductRatingForm" element={<UpdateProductRatingForm />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
