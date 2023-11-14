import React, { useState } from 'react';

import './ArtisanStoreManagement.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

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
    <div>
      <h2>Artisan Store Management & Creation (Admin Side)</h2>

      <ProductForm onSubmit={addProduct} />

      <ProductList
        products={products}
        onUpdate={updateProduct}
        onRemove={removeProduct}
      />
    </div>
  );
};

export default ArtisanStoreManagement;
