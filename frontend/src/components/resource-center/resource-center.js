import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './resource-center.css';
import axios from 'axios';
import { url } from '../../utils/ApiUrls';

const ResourceCenter = () => {
    const [artisans, setArtisans] = useState([]);

    const getArtisans = async () => {
        try {
            const response = await axios.get(url + '/users/artisans/all');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    useEffect(() => {
        // Correctly handle the promise returned by getArtisans
        const fetchArtisans = async () => {
            const artisansData = await getArtisans();
            if (artisansData) {
                setArtisans(artisansData);
            }
        };

        fetchArtisans();
    }, []);

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return window.btoa(binary);
    }
    return (
        <div className='view-container p-4'>
            <h2 className='p-3'>Artisan's Workshop</h2>
            <div className="artisans-grid">
                {artisans.map((artisan) => (
                    <Link key={artisan.username} to={`/artisan/${artisan.username}`} className="artisan-link">
                        <div className="artisan-card p-4">
                            <img src={'data:image/png;base64,' + artisan.base64Image} alt="Common Profile" className="profile-picture" />
                            <h3 className='artisan-name'>{artisan.username}</h3>
                            <p className='artisan-profession'>{artisan.profession || "Artisan"}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link className="position-fixed mx-4 upload-button" to={`/upload/mayankmadan`} >Upload</Link>
        </div>
    )
};

export default ResourceCenter;
