import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import commonProfilePicture from './images/artisan.jpg';

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    // Mock API response for initial data
    const mockApiResponse = [
      { id: 1, name: 'Artisan 1', profession: 'Painter' },
      { id: 2, name: 'Artisan 2', profession: 'Sculptor' },
      { id: 3, name: 'Artisan 3', profession: 'Photographer' },
      { id: 4, name: 'Artisan 4', profession: 'Chef' },
      { id: 5, name: 'Artisan 5', profession: 'Potter' },
      { id: 6, name: 'Artisan 6', profession: 'Writer' },
      { id: 7, name: 'Artisan 7', profession: 'Musician' },
      { id: 8, name: 'Artisan 8', profession: 'Dancer' },
      // Add more artisans
    ];

    setArtisans(mockApiResponse);
  }, []);

  return (
    <div className="page-container">
      <div className="artisans-grid">
        {artisans.map((artisan) => (
          <Link key={artisan.id} to={`/artisan/${artisan.id}`} className="artisan-link">
            <div className="artisan-card">
              <img src={commonProfilePicture} alt="Common Profile" className="profile-picture" />
              <h3 className='artisan-name'>{artisan.name}</h3>
              <p className='artisan-profession'>{artisan.profession}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artisans;
