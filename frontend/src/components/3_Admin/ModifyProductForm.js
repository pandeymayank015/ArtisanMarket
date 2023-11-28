import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls';

const ModifyProductForm = ({ onSubmit }) => {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [fetchedProductByID, setFetchedProductByID] = useState(null);


  const handleImageChange = (e) => {
    // console.log('Image selected:', e.target.files[0]);
    const selectedImage = e.target.files[0];
    setProductImage(selectedImage);
  };
  const fetchProductByID = async () => {
    try {
      const response = await fetch(`${url}/products`);
      if (response.ok) {
        const allProducts = await response.json();
        const productByID = allProducts.find(product => product.id === parseInt(productID));
        if (productByID) {
          // console.log("productByID:",productByID);
          // console.log("image:", productByID.base64Image);
          setProductImage(productByID.base64Image); // If image is needed
          // console.log(productByID.base64Image);
        } else {
          alert('Product not found');
        }
      } else {
        alert('Error fetching products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchProductByID();
    // const formData = new FormData();
    // formData.append('userId', userEmail);
    // formData.append('id', productID);
    // formData.append('name', productName);
    // formData.append('description', productDescription);
    // formData.append('price', productPrice);
    // formData.append('category', productCategory);
    // formData.append('image', productImage);

    const productData = {
      // userId: userEmail,
      rating: productID,
      name: productName,
      description: productDescription,
      price: productPrice,
      category: productCategory,
      // base64Image: productImage // Assuming productImage is a base64 string or a URL
    };
    // console.log("productData",productData);

    try {
      // Send a request to the backend API to update the product
      // const response = await fetch(`${url}/products/update/${productID}`, {
      //   method: 'PUT',
      //   body: formData,
      // });

      const response = await fetch(`${url}/products/update/${productID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        // If the request is successful, notify the parent component
        // onSubmit(productID);
        // Clear the form
        setProductID('');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
        setUserEmail('');
        alert("Modification Success!!");
        window.location.reload();
      } else {
        // Handle the case where the request is not successful
        alert('Error modifying product');
      }
    } catch (error) {
      console.error('Error modifying product:', error);
      alert('Error modifying product');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <form>
      <label>
        ID:
        <input
          type="number"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
        />
      </label>
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
        Description:
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
      {/* <label>
      Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)} />
      </label> */}
      <label>
        Rating:
        <input
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </label>
      <br />

      {/* <button type="submit">Modify Product</button> */}
      <button onClick={handleSubmit}>Modify Product</button>
    </form>
  );
};

export default ModifyProductForm;
