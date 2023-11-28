import React, { useState, useEffect } from 'react';
import { url } from '../../utils/ApiUrls';

const ProductList = ({ onUpdate, onRemove }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url+'/products');
        if (response.ok) {
          const productsData = await response.json();
          // console.log(productsData);
          // console.log(typeof productsData.base64Image);
          setProducts(productsData);
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <div>
      <h3>Product Listings</h3>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Image</th>
      {/* Add more table headers for additional details */}
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        {/* <td>{product.image}</td> */}
        <td>
          {product.base64Image && (
            <img
            src={`data:image/png;base64,${product.base64Image}`}  // Assuming the image is in PNG format; adjust accordingly
            alt={`Image for ${product.name}`}
            style={{ maxWidth: '50px', maxHeight: '50px' }} // Adjust the dimensions as needed
          />
          )}
        </td>

        {/* Add more table cells for additional details */}
        {/* <td>{product.someOtherField}</td> */}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default ProductList;



