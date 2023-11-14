import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(), // A simple way to generate a unique ID (replace with your logic)
      name: productName,
      description: productDescription,
    };

    onSubmit(newProduct);

    // Clear the form after submission
    setProductName('');
    setProductDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h3>Add Product</h3> */}
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

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
