import React, { useState } from 'react';

import './ArtisanStoreManagement.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ModifyProductForm from './ModifyProductForm';

const ArtisanStoreManagement = () => {
  const [products, setProducts] = useState([]);

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

  return (
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
        {/* Your deletion functionality here */}
      </div>

      <div className="box">
        <h2>List Products</h2>
        <ProductList products={products} onUpdate={updateProduct} onRemove={removeProduct} />
      </div>
    </div>
  );
};

export default ArtisanStoreManagement;
