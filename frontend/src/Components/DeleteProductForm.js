// DeleteProductForm.js
import React, { useState } from 'react';

const DeleteProductForm = ({ products, onRemove }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleDelete = () => {
    // Implement deletion logic here
    if (selectedProduct) {
      onRemove(selectedProduct);
      // Clear the selected product after deletion
      setSelectedProduct('');
    } else {
      // Handle the case where no product is selected
      alert('Please select a product to delete');
    }
  };

  return (
    <div>
      {/* <h3>Delete Product</h3> */}
      <label>
        Select Product:
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default DeleteProductForm;
