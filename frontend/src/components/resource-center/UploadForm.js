// UploadForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './../resource-center/resource-center.css';
import { url } from '../../utils/ApiUrls';

const UploadForm = () => {
    const [uploadType, setUploadType] = useState('media'); // Default upload type is 'media'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const handleUploadTypeChange = (type) => {
        setUploadType(type);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setThumbnail(selectedImage);
    };

    const { username } = useParams();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Implement your upload logic here based on uploadType and form data
        console.log('Form submitted:', { uploadType, title, description, thumbnail });
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('publishedAt', Date.now());
            formData.append('thumbnailFile', thumbnail);
            formData.append('content', "Test Content");
            formData.append('type', uploadType.toUpperCase());

            console.log(formData);
            const response = await axios.post(url + '/resource/create/' + username, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error during uploading resource:', error);
        }

        // Reset form fields after submission
        setTitle('');
        setDescription('');
        setThumbnail('');
    };

    return (
        <div className='view-container'>
            <div className="upload-form-container upload-resource-container">
                <h2>Upload Form</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="upload-type-container">
                        <label>
                            <input
                                type="radio"
                                value="media"
                                checked={uploadType === 'media'}
                                onChange={() => handleUploadTypeChange('media')}
                            />
                            Media
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="blog"
                                checked={uploadType === 'blog'}
                                onChange={() => handleUploadTypeChange('blog')}
                            />
                            Blog
                        </label>
                    </div>
                    <div className="form-fields">
                        <label>
                            Title:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        {uploadType === 'blog' && (
                            <>
                                <label>
                                    Description:
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </label>
                                <label>
                                    Thumbnail:
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e)} />
                                </label>
                            </>
                        )}
                    </div>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
