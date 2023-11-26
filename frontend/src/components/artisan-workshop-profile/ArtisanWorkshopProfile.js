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

    // Mock data
    const artisanData = {
        id: 1,
        name: 'Artisan 1',
        profession: 'Painter',
        media: ['Media 1', 'Media 2', 'Media 3'],
        blogs: [
            {
                id: 1,
                thumbnail: 'blog_thumbnail_1.jpg',
                title: 'Blog 1',
                publishedAt: '2023-01-01',
            },
            {
                id: 2,
                thumbnail: 'blog_thumbnail_2.jpg',
                title: 'Blog 2',
                publishedAt: '2023-02-15',
            },
            {
                id: 3,
                thumbnail: 'blog_thumbnail_3.jpg',
                title: 'Blog 3',
                publishedAt: '2023-03-20',
            },
        ],
    };

    return (
        <div className="page-container">
            <div className="artisan-info">
                <img src={''} alt="Common Profile" className="profile-pic" />
                <div className="name-profession">
                    <h3 className="name">{artisanData.name}</h3>
                    <p className="profession">{artisanData.profession}</p>
                </div>
            </div>
            <div className="profile-section">
                <h2>Media</h2>
                <div className="media-container">
                    {artisanData.media.map((media, index) => (
                        <div key={index} className="media-item">
                            <img src={media} alt={`Media ${index + 1}`} className="media-image" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="profile-section">
                <h2>Blogs</h2>
                <div className="blogs-container">
                    {artisanData.blogs.map((blog) => (
                        <div key={blog.id} className="blog-item">
                            <img
                                src={blog.thumbnail}
                                alt={`Thumbnail for ${blog.title}`}
                                className="blog-thumbnail"
                            />
                            <div className="blog-details">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-published">{`Published at: ${blog.publishedAt}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="upload-button-container">
                <button onClick={() => handleUploadClick()} className="upload-button">
                    Upload
                </button>
            </div>
        </div>
    );
};

export default ArtisanWorkshopProfile;
