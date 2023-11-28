// UploadForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './../resource-center/resource-center.css';
import { url } from '../../utils/ApiUrls';
import ToastPopUp from '../toast_popup/ToastPopUp';

const UploadForm = () => {
    const [uploadType, setUploadType] = useState('media'); // Default upload type is 'media'
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [conditionMet, setConditionMet] = useState(false);

    const handleShowToast = () => {
        setConditionMet(true);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setThumbnail(selectedImage);
        console.log("Image uploaded");
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
            formData.append('content', content);
            formData.append('type', "BLOG");

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
        handleShowToast();
        // Reset form fields after submission
        setTitle('');
        setDescription('');
        setThumbnail('');
        setContent('');
    };

    return (
        <div className='view-container'>
            <div className="upload-form-container upload-resource-container">
                <h2>Upload Form</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-fields">
                        <label>
                            Title:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </label>
                        <label>
                            Content:
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </label>
                        <label>
                            Thumbnail:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e)} />
                        </label>
                    </div>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <ToastPopUp show={conditionMet} />
        </div>
    );
};

export default UploadForm;
