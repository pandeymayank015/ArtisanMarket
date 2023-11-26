import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../artisan-workshop-profile/ArtisanWorkshopProfile.css';
import axios from 'axios';
import { url } from '../../utils/ApiUrls';

const ArtisanWorkshopProfile = () => {
    const { username } = useParams();

    const [resources, setResources] = useState([]);

    const getResources = async () => {
        try {
            const response = await axios.get(url + '/resource/getall/' + username);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during fetching artisans:', error);
        }
    };

    useEffect(() => {
        // Correctly handle the promise returned by getArtisans
        const fetchResources = async () => {
            const resourcesData = await getResources();
            if (resourcesData) {
                setResources(resourcesData);
            }
        };

        fetchResources();
    }, []);


    return (
        <div className="page-container view-container">
            <div className="artisan-info">
                <div className="name-profession">
                    <h3 className="name">{username}</h3>
                </div>
            </div>
            <div className="profile-section">
                <h2>Blogs</h2>
                <div className="blogs-container">
                    {resources?.BLOG?.map((blog, index) => (
                        <div key={index} className="blog-item">
                            {/* Assuming you have a field named "base64Thumbnail" for the blog thumbnail */}
                            <img
                                src={'data:image/png;base64,' + `${blog.base64Thumbnail}`} // Adjust the format if necessary
                                alt={`Thumbnail for ${blog.title}`}
                                className="blog-thumbnail"
                            />
                            <div className="blog-details">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-published">{`Published at: ${new Date(
                                    blog.publishedAt
                                ).toLocaleString()}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ArtisanWorkshopProfile;
