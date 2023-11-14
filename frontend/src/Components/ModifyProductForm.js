// ModifyProductForm.js
import React, { useState } from 'react';

const ModifyProductForm = ({ products, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newProductDetails, setNewProductDetails] = useState({
    name: '',
    description: '',
  });

  const handleSearch = () => {
    // Implement search logic here
    const foundProduct = products.find((product) => product.name === searchTerm);

    if (foundProduct) {
      setNewProductDetails({
        name: foundProduct.name,
        description: foundProduct.description,
      });
    } else {
      // Handle the case where the product is not found
      alert('Product not found');
    }
  };

  const handleUpdate = () => {
    // Implement update logic here
    // Use the onUpdate prop to pass the updated details to the parent component
    onUpdate(newProductDetails);
    // Clear the form
    setNewProductDetails({ name: '', description: '' });
  };

  return (
    <div>
      <h3>Search and Modify Product</h3>
      <label>
        Search by Name:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>

      {newProductDetails.name && (
        <div>
          <h4>Modify Product Details</h4>
          <label>
            New Name:
            <input
              type="text"
              value={newProductDetails.name}
              onChange={(e) =>
                setNewProductDetails({ ...newProductDetails, name: e.target.value })
              }
            />
          </label>
          <label>
            New Description:
            <textarea
              value={newProductDetails.description}
              onChange={(e) =>
                setNewProductDetails({
                  ...newProductDetails,
                  description: e.target.value,
                })
              }
            />
          </label>
          <button onClick={handleUpdate}>Update Product</button>
        </div>
      )}
    </div>
  );
};

export default ModifyProductForm;
