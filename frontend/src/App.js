// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ArtisanProfile from './components/ArtisanProfile';
import ArtisanWorkshopProfile from './components/artisan-workshop-profile/ArtisanWorkshopProfile';
import CommunityForum from './components/CommunityForum';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import ResourceCenter from './components/resource-center/resource-center';
import UploadForm from './components/resource-center/UploadForm';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/artisan-profile" element={<ArtisanProfile />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/resource-center" element={<ResourceCenter />} />
          <Route path="/artisan/:username" element={<ArtisanWorkshopProfile />} />
          <Route path="/upload/:username" element={<UploadForm />} />
        </Routes>
        <Footer />
      </div>
    </Router >
  );
}

export default App;
