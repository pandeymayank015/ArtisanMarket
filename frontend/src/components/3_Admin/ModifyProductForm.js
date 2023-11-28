import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls';

const ModifyProductForm = ({ onSubmit }) => {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const handleImageChange = (e) => {
    // console.log('Image selected:', e.target.files[0]);
    const selectedImage = e.target.files[0];
    setProductImage(selectedImage);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userEmail);
    formData.append('id', productID);
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('category', productCategory);
    formData.append('image', productImage);

    try {
      // Send a request to the backend API to update the product
      const response = await fetch(`${url}/products/update/${productID}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // If the request is successful, notify the parent component
        // onSubmit(productID);
        // Clear the form
        setProductID('');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
        setUserEmail('');
        alert("Modification Success!!")
      } else {
        // Handle the case where the request is not successful
        alert('Error modifying product');
      }
    } catch (error) {
      console.error('Error modifying product:', error);
      alert('Error modifying product');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <form>
      <label>
        ID:
        <input
          type="number"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
        />
      </label>
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
      <label>
        User Email:
        <input
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </label>
      <br />

      {/* <button type="submit">Modify Product</button> */}
      <button onClick={handleSubmit}>Modify Product</button>
    </form>
  );
};

export default ModifyProductForm;
