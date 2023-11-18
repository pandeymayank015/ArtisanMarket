// UploadForm.js
import React, { useState } from 'react';
import './styles.css'; // Import the CSS file for styling

const UploadForm = () => {
  const [uploadType, setUploadType] = useState('media'); // Default upload type is 'media'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleUploadTypeChange = (type) => {
    setUploadType(type);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement your upload logic here based on uploadType and form data
    console.log('Form submitted:', { uploadType, title, description, thumbnail });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setThumbnail('');
  };

  return (
    <div className="upload-form-container">
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
                Thumbnail URL:
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </label>
            </>
          )}
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
