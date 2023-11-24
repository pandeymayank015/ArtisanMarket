import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls';

const DeleteProductForm = ({ onRemove }) => {
  const [productId, setProductId] = useState('');
  // const [message, alert] = useState('');

  const handleDelete = async () => {
    try {
      if (productId) {
        const response = await fetch(`${url}/api/products/delete/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // If the deletion is successful
          onRemove(productId);
          alert('Product deleted successfully');
        } else if (response.status === 404) {
          // If the product is not found
          alert('Product not found');
        } else {
          // Handle other error cases
          alert('Error deleting product');
        }
      } else {
        // Handle the case where no product ID is entered
        alert('Please enter a product ID');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div>
      <h3>Delete Product</h3>
      <label>
        Product ID:
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </label>
      <button onClick={handleDelete}>Delete Product</button>
      {/* {message && <p>{message}</p>} */}

    </div>
  );
};

export default DeleteProductForm;

