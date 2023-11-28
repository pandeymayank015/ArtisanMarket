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
import AuthGuard from './components/AuthGuard'; // Import the AuthGuard component

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
          <Route
            path="/resource-center"
            element={<AuthGuard isAuthenticated={isAuthenticated}><ResourceCenter /></AuthGuard>}
          />
          <Route
            path="/events"
            element={<AuthGuard isAuthenticated={isAuthenticated}><Events /></AuthGuard>}
          />
          <Route
            path="/logout"
            element={<AuthGuard isAuthenticated={isAuthenticated}><Logout onLogout={handleLogout} /></AuthGuard>}
          />
          <Route
            path="/user-profile"
            element={<AuthGuard isAuthenticated={isAuthenticated}><UserProfile /></AuthGuard>}
          />
          <Route
            path="/artisan-profile"
            element={<AuthGuard isAuthenticated={isAuthenticated}><ArtisanProfile /></AuthGuard>}
          />
          <Route
            path="/community-forum"
            element={<AuthGuard isAuthenticated={isAuthenticated}><CommunityForum /></AuthGuard>}
          />
          <Route
            path="/event-creation"
            element={<AuthGuard isAuthenticated={isAuthenticated}><EventCreation /></AuthGuard>}
          />
          <Route
            path="/artisan/:username"
            element={<AuthGuard isAuthenticated={isAuthenticated}><ArtisanWorkshopProfile /></AuthGuard>}
          />
          <Route
            path="/upload/:username"
            element={<AuthGuard isAuthenticated={isAuthenticated}><UploadForm /></AuthGuard>}
          />
          <Route
            path="/ArtisanStoreManagement"
            element={<AuthGuard isAuthenticated={isAuthenticated}><ArtisanStoreManagement /></AuthGuard>}
          />
          <Route
            path="/ProductApprovalForm"
            element={<AuthGuard isAuthenticated={isAuthenticated}><ProductApprovalForm /></AuthGuard>}
          />
          <Route
            path="/UpdateProductRatingForm"
            element={<AuthGuard isAuthenticated={isAuthenticated}><UpdateProductRatingForm /></AuthGuard>}
          />
          <Route
            path="/Wishlist"
            element={<AuthGuard isAuthenticated={isAuthenticated}><Wishlist /></AuthGuard>}
          />
          <Route
            path="/blog"
            element={<AuthGuard isAuthenticated={isAuthenticated}><BlogDetails /></AuthGuard>}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;