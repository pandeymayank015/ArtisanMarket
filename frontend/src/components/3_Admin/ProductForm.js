import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls'
import axios from 'axios';


const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  
  const handleImageChange = (e) => {
    // console.log('Image selected:', e.target.files[0]);
    const selectedImage = e.target.files[0];
    setProductImage(selectedImage);
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  // Create a FormData object to handle the file upload
  const formData = new FormData();
  formData.append('name', productName);
  formData.append('description', productDescription);
  formData.append('price', productPrice);
  formData.append('category', productCategory);
  formData.append('image', productImage);
  formData.append('user_id', '1');
  // console.log("formData:", formData);
  console.log([...formData.entries()]);

  try {
    // Use Axios for the file upload
    const response = await axios.post(url + '/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      const addedProduct = response.data;
      onSubmit(addedProduct);

      alert('Product added!');
      // Clear the form after successful submission
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductCategory('');
      setProductImage(null); // Clear the selected image
    } else {
      console.error('Failed to add product:', response.statusText);
    }
  } catch (error) {
    alert('Error adding product:', error);
    console.error('Error adding product:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server Error Data:', error.response.data);
      console.error('Server Error Status:', error.response.status);
      console.error('Server Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No Response Received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>

      <br />

      <label>
        Product Description:
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </label>

      <br />

      <label>
        Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>

      <br />

      <label>
        Category:
        <input
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
      </label>
      <label>
      Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)} />
      </label>

      <br />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;