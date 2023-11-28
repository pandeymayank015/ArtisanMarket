import React, { useState, useEffect } from 'react';
import { url } from '../../utils/ApiUrls';

const ProductApprovalForm = () => {
  const [productIdForApproval, setProductIdForApproval] = useState('');
  const [productsForApproval, setProductsForApproval] = useState([]);

  useEffect(() => {
    // Fetch products awaiting approval when the component mounts
    const fetchProductsForApproval = async () => {
      try {
        const response = await fetch(`${url}/products/adminApprove/products`);
        if (response.ok) {
          const products = await response.json();
          setProductsForApproval(products);
          console.log(products);
        } else {
          alert('Error fetching products for approval');
        }
      } catch (error) {
        console.error('Error fetching products for approval:', error);
        alert('Error fetching products for approval');
      }
    };

    fetchProductsForApproval();
  }, []); // Empty dependency array ensures that the effect runs only once

  const handleApproveProduct = async (productId) => {
    try {
      const response = await fetch(`${url}/products/approve/${productId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        alert('Product approved and moved from admin approval to product table');
        // Remove the approved product from the list
        setProductsForApproval((prevProducts) =>
          prevProducts.filter((product) => product.product_id !== productId)
        );
        window.location.reload();
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
    <div className='view-container'>
      <div>
        <h3>Products Awaiting Approval</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsForApproval.map((product) => (
              <tr key={product.product_id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.image}</td>
                <td>
                  <button onClick={() => handleApproveProduct(product.id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductApprovalForm;










// import React, { useState } from 'react';
// import { url } from '../../utils/ApiUrls';
// // import '../../styles/ProductApprovalForm.css';

// const ProductApprovalForm = () => {
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productCategory, setProductCategory] = useState('');
//   const [productIdForApproval, setProductIdForApproval] = useState('');

//   const handleAddProduct = async () => {
//     const newProduct = {
//       name: productName,
//       description: productDescription,
//       price: productPrice,
//       category: productCategory,
//     };

//     try {
//       const response = await fetch(url+"/products/admin", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newProduct),
//       });

//       if (response.ok) {
//         alert('Product added and sent for admin approval');
//         // Clear form fields after successful submission
//         setProductName('');
//         setProductDescription('');
//         setProductPrice('');
//         setProductCategory('');
//       } else {
//         alert('Error adding product');
//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//       alert('Error adding product');
//     }
//   };

//   const handleApproveProduct = async () => {
//     try {
//       const response = await fetch(`${url}/products/approve/${productIdForApproval}`, {
//         method: 'PUT',
//       });

//       if (response.ok) {
//         alert('Product approved and moved from admin approval to product table');
//         // Clear form field after successful approval
//         setProductIdForApproval('');
//       } else if (response.status === 404) {
//         alert('Admin approval not found for the given product ID');
//       } else {
//         alert('Error approving product');
//       }
//     } catch (error) {
//       console.error('Error approving product:', error);
//       alert('Error approving product');
//     }
//   };

//   return (
//     <div className='view-container'>
//       <h1>Product Approval</h1>
//       <div>
//         <h3>Add Product for Approval</h3>
//         <label>
//           Product Name:
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </label>
//         {/* Add other input fields for description, price, category */}

//         <button onClick={handleAddProduct}>Add Product</button>
//       </div>

//       <div>
//         <h3>Approve Product</h3>
//         <label>
//           Product ID for Approval:
//           <input
//             type="number"
//             value={productIdForApproval}
//             onChange={(e) => setProductIdForApproval(e.target.value)}
//           />
//         </label>

//         <button onClick={handleApproveProduct}>Approve Product</button>
//       </div>
//     </div>
//   );
// };

// export default ProductApprovalForm;
