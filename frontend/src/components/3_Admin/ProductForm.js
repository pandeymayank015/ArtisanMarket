import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls'


const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');
  
  const handleImageChange = (e) => {
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

  try {
    const response = await fetch(url + '/products', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const addedProduct = await response.json();
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