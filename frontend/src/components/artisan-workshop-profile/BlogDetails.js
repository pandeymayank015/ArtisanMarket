import React from 'react';
import { useLocation } from 'react-router-dom';
import "./ArtisanWorkshopProfile.css";
const BlogDetails = () => {
    const location = useLocation();
    const { blog } = location.state.blog;
    if (!blog) {
        return <div className='view-container blog-details-content d-flex justidy-content-center'>Loading...</div>; // or handle the loading state as needed
    } else {
        return (
            <div className="view-container container-fluid  px-5">
                <div className='row mt-3 mb-2'>
                    <div className='col-12'>
                        <h1 className='d-flex justify-content-center'>{blog.title}</h1>
                    </div>
                </div>
                <div className='row my-1'>
                    <div className='col-12 text-center'>
                        <span className='d-flex justify-content-center'>{new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                <div className='row my-3'>
                    <div className='col-12 px-5'>
                        <p className='d-flex justify-content-center'>{blog.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <img
                            src={`data:image/png;base64,${blog.base64Thumbnail}`}
                            alt={`Thumbnail for ${blog.title}`}
                            className="mx-auto d-block blog-image"
                        />                    </div>
                </div>
                <div className='row my-3'>
                    <div className='col-12 blog-content px-5'>
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default BlogDetails;