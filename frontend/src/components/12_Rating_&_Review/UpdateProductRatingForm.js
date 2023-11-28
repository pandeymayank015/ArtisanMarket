import React, { useState, useEffect } from 'react';
import { url } from '../../utils/ApiUrls';

const UpdateProductRatingForm = () => {
  const [productId, setProductId] = useState('');
  const [newRating, setNewRating] = useState('');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url + '/products');
        if (response.ok) {
            const productsData = await response.json();
            if (productsData.length === 0) {
              alert('No products found');
            } else {
              setProducts(productsData);
            }
        } else {
          alert('Error fetching product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Error fetching product details');
      }
    };

    if (productId) {
      fetchProducts();
    }
  }, [productId]);

  const handleUpdateRating = async (e) => {
    e.preventDefault();

    // Ensure the new rating is between 0 and 5
    if (newRating < 0 || newRating > 5) {
      alert('Rating must be between 0 and 5 stars.');
      return;
    }

    // Check if product data is available
    if (!product) {
      alert('Product details not available. Please check the product ID.');
      return;
    }

    const updatedProduct = {
      ...product,
      rating: newRating,
    };
    // const formData = new FormData();
    // formData.append('id', product.id);
    // formData.append('name', product.name);
    // formData.append('description', product.description);
    // formData.append('price', product.price);
    // formData.append('category', product.category);
    // formData.append('image', product.base64Image);
    // formData.append('rating', newRating);

    try {
      const response = await fetch(`${url}/products/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      // const response = await fetch(`${url}/products/update/${productId}`, {
      //   method: 'PUT',
      //   body: formData,
      // });

      if (response.ok) {
        alert('Product rating updated successfully!');
        // Refresh the page to reflect the updated data
        window.location.reload();      } else {
        alert('Error updating product rating');
      }
    } catch (error) {
      console.error('Error updating product rating:', error);
      alert('Error updating product rating');
    }
  };

  const fetchProductById = () => {
    // Find the product with the specified ID
    const foundProduct = products.find((p) => p.id === parseInt(productId));
    if (!foundProduct) {
        alert('Product not found');
    }else{
        console.log('foundProduct', foundProduct);
        setProduct(foundProduct);
    }
  };

  return (
    <div className='view-container'>
      <h1>Update Product Rating</h1>
      <form onSubmit={handleUpdateRating}>
        <label>
          Product ID:
          <input
            type="number"
            min="0"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </label>

        <label>
          Current Rating:
          <input
            type="text"
            value={product ? product.rating : ''}
            readOnly
          />
        </label>

        <label>
          New Rating:
          <input
            type="number"
            value={newRating}
            placeholder="Give the stars in number (max 5)"
            min="0"
            max="5"
            onChange={(e) => setNewRating(e.target.value)}
          />
        </label>

        <button type="button" onClick={fetchProductById}>
          Fetch Product
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="submit">Update Rating</button>
      </form>
    </div>
  );
};

export default UpdateProductRatingForm;
