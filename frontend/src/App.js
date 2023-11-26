// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import EventCreation from './components/EventCreation';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <h1>Welcome to Artisan Market</h1>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-creation" element={<EventCreation />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
