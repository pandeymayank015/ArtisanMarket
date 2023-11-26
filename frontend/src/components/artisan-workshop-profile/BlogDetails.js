import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetails = () => {
    const location = useLocation();
    const { blog } = location.state.blog;
    if (!blog) {
        return <div className='view-container blog-details-content d-flex justidy-content-center'>Loading...</div>; // or handle the loading state as needed
    } else {
        return (
            <div className="view-container container-fluid">
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='d-flex justify-content-center'>{blog.title}</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <h5 className='d-flex justify-content-center'>{blog.publishedAt}</h5>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <img
                            src={`data:image/png;base64,${blog.base64Thumbnail}`}
                            alt={`Thumbnail for ${blog.title}`}
                            className="mx-auto d-block"
                        />                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <p className='d-flex justify-content-center'>{blog.description}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default BlogDetails;