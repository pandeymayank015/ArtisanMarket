import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

import '../../styles/3_admin.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ModifyProductForm from './ModifyProductForm';
import DeleteProductForm from './DeleteProductForm';

const ArtisanStoreManagement = () => {
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(false);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? updatedProduct : product
      )
    );
  };

  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  const handleShowProductList = () => {
    setShowProductList(true);
  };

  return (
    <div>
      <br></br>
      {/* <nav> */}
      <ul>
        <li>
          <Link to="/ProductApprovalForm">Product Approval</Link>
        </li>
        <li>
          <Link to="/UpdateProductRatingForm">Update Product Rating</Link>
        </li>
        <li>
          <Link to="/Wishlist">Wish list</Link>
        </li>
        </ul>
        {/* </nav> */}
    <div className='view-container'>
    <div className='dashboard'>
      <h1>Admin dashboard </h1>
    <div className="container">
      <div className="box">
        <h2>Add Product</h2>
        <ProductForm onSubmit={addProduct} />
      </div>

      <div className="box">
        <h2>Modify Product</h2>
          <ModifyProductForm products={products} onUpdate={updateProduct} />
      </div>

      <div className="box">
        <h2>Delete Product</h2>
          <DeleteProductForm products={products} onRemove={removeProduct} />
      </div>

      <div className="box">
      <h2>List Product(s)</h2>
      <p></p>
        <button onClick={handleShowProductList}>List All Products</button>
        <p></p>
        <p></p>
        {showProductList && (
          <ProductList products={products} onUpdate={updateProduct} onRemove={removeProduct} />
        )}
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default ArtisanStoreManagement;
