import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls'


const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      "name": productName,
      "description": productDescription,
      "price": productPrice,
      "category":productCategory
    };

    try {
      const response = await fetch(url+'/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        onSubmit(addedProduct);

        alert("Product added!");
        // Clear the form after successful submission
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');

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

      <br />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;































// import React, { useState } from 'react';

// const ProductForm = ({ onSubmit }) => {
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productPrice, setproductPrice] = useState('');
//   const [productCategory, setproductCategory] = useState('');
//   const url = 'http://localhost:3306/';
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProduct = {
//       "name": productName,
//       "description": productDescription,
//       "price": productPrice,
//       "category":productCategory
//     };

//     onSubmit(newProduct);

//     // Clear the form after submission
//     setProductName('');
//     setProductDescription('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <h3>Add Product</h3> */}
//       <label>
//         Product Name:
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//       </label>

//       <br />

//       <label>
//         Product Description:
//         <textarea
//           value={productDescription}
//           onChange={(e) => setProductDescription(e.target.value)}
//         />
//       </label>

//       <br />

//       <label>
//         Price:
//         <input
//           type="number"
//           value={productPrice}
//           onChange={(e) => setproductPrice(e.target.value)}
//         />
//       </label>

//       <br />

//       <label>
//         Category:
//         <input
//           type="text"
//           value={productCategory}
//           onChange={(e) => setproductCategory(e.target.value)}
//         />
//       </label>

//       <br />

//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default ProductForm;
