import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls';

const ModifyProductForm = ({ onSubmit }) => {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a product object with the entered values
    const newProduct = {
      id:productID,
      name: productName,
      description: productDescription,
      price: productPrice,
      category: productCategory,
    };

    try {
      // Send a request to the backend API to add the product
      const response = await fetch(`${url}/api/products/update/${productID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
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

      <br />

      {/* <button type="submit">Modify Product</button> */}
      <button onClick={handleSubmit}>Modify Product</button>
    </form>
  );
};

export default ModifyProductForm;
