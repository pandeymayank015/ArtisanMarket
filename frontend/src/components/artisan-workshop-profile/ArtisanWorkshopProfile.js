import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link from React Router
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
        const fetchResources = async () => {
            const resourcesData = await getResources();
            if (resourcesData) {
                setResources(resourcesData);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="view-container">
            <div className="artisan-info">
                <div className="name-profession m-3">
                    <h3 className="name d-flex justify-content-center">{username}</h3>
                </div>
            </div>
            <div className="profile-section">
                <h3 className='py-3'>Blogs</h3>
                <div className="blogs-container">
                    {resources?.BLOG?.map((blog, index) => (
                        <Link
                            to={{
                                pathname: '/blog',
                            }}
                            state={{ blog: { blog } }}
                            key={index}
                            className="blog-item"
                        >
                            <img
                                src={`data:image/png;base64,${blog.base64Thumbnail}`}
                                alt={`Thumbnail for ${blog.title}`}
                                className="blog-thumbnail"
                            />
                            <div className="blog-details">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-published">{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtisanWorkshopProfile;
