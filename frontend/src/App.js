// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import ArtisanProfile from './components/ArtisanProfile';
import CommunityForum from './components/CommunityForum';

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
