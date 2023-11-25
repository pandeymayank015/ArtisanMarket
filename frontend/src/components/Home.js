// src/components/Home.js
import React from 'react';
import '../styles/styles.css';
function Home() {
  return <div className='container-fluid home-container'>
    <div className='row h-100'>
      <div className='col-5 offset-1 align-self-center'>
        <div className='home-title'>Welcome to your local Artisan Market</div>
        <div className='home-subtitle'>Chapter: Nova Scotia</div>
      </div>
    </div>
  </div>;
}

export default Home;
