import React, { useState } from 'react';
import { url } from '../utils/ApiUrls';

const ProductApprovalForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productIdForApproval, setProductIdForApproval] = useState('');

  const handleAddProduct = async () => {
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category: productCategory,
    };

    try {
      const response = await fetch(url+"/api/products/user-add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert('Product added and sent for admin approval');
        // Clear form fields after successful submission
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleApproveProduct = async () => {
    try {
      const response = await fetch(`${url}/api/products/approve/${productIdForApproval}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Product approved and moved from admin approval to product table');
        // Clear form field after successful approval
        setProductIdForApproval('');
      } else if (response.status === 404) {
        alert('Admin approval not found for the given product ID');
      } else {
        alert('Error approving product');
      }
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Error approving product');
    }
  };

  return (
    <div>
      <h2>Product Approval</h2>
      <div>
        <h3>Add Product for Approval</h3>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        {/* Add other input fields for description, price, category */}

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        <h3>Approve Product</h3>
        <label>
          Product ID for Approval:
          <input
            type="number"
            value={productIdForApproval}
            onChange={(e) => setProductIdForApproval(e.target.value)}
          />
        </label>

        <button onClick={handleApproveProduct}>Approve Product</button>
      </div>
    </div>
  );
};

export default ProductApprovalForm;
