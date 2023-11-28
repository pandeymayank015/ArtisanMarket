import React, { useState } from 'react';
import { url } from '../../utils/ApiUrls';
import '../../styles/Wishlist.css';
const Wishlist = () => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = async () => {
    try {
      const response = await fetch(`${url}/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        alert('Product added to wishlist');
        // You can add further logic here, such as updating the UI or fetching the updated wishlist.
      } else {
        alert('Error adding product to wishlist');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('Error adding product to wishlist');
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await fetch(`${url}/wishlist/remove/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product removed from wishlist');
        window.location.reload();
        // You can add further logic here, such as updating the UI or fetching the updated wishlist.
      } else {
        alert('Error removing product from wishlist');
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      alert('Error removing product from wishlist');
    }
  };
  

  const getUserWishlist = async () => {
    try {
      const response = await fetch(`${url}/wishlist/${userId}`);
      if (response.ok) {
        const wishlistData = await response.json();
        alert("Fetch done!");
  
        // Fetch all products
        const productsResponse = await fetch(`${url}/products`);
        if (!productsResponse.ok) {
          console.error('Error fetching all products');
          alert('Error fetching wishlist');
          return;
        }
        
        const allProducts = await productsResponse.json();
  
        // Filter products based on wishlist items
        const wishlistWithDetails = wishlistData.map((item) => {
          const matchingProduct = allProducts.find((product) => product.id === item.productId);
          if (matchingProduct) {
            console.log(matchingProduct);
            // return { ...item, productName: matchingProduct.name };
            return {...item, ...matchingProduct};
            
          } else {
            console.error(`Product not found for ID ${item.productId}`);
            return item;
          }
        });
  
        setWishlist(wishlistWithDetails);
      } else {
        alert('Error fetching wishlist');
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      alert('Error fetching wishlist');
    }
  };
  
  

  return (
    <div className='view-container'>        
      <h1>Wishlist</h1>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <label>
        Product ID:
        <input type="number" min="0" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </label>
      <div className='buttons'>
      <button onClick={addToWishlist}>Add to Wishlist</button> &nbsp;&nbsp;
      <button onClick={removeFromWishlist}>Remove from Wishlist</button> &nbsp; &nbsp;
      <button onClick={getUserWishlist}>Get User Wishlist</button>
      </div>
      <p></p> 
      <h3>User Wishlist of Product:</h3>
    <table>
  <thead>
    <tr>
      <th>&nbsp;ID&nbsp;</th>
      <th>&nbsp;Name&nbsp;</th>
      <th>&nbsp;Price&nbsp;</th>
      <th>&nbsp;Category&nbsp;</th>
      <th>&nbsp;Image&nbsp;</th>
      {/* Add more table headers for additional details */}
    </tr>
  </thead>
  <tbody>
    {wishlist.map((item) => (
      <tr key={item.productId}>
        <td>&nbsp;{item.productId}&nbsp;</td>
        <td>&nbsp;{item.name}&nbsp;</td>
        <td>&nbsp;{item.price}&nbsp;</td>
  <td>&nbsp;{item.category}&nbsp;</td>      
  {item.base64Image && (
            <img
            src={`data:image/png;base64,${item.base64Image}`}  // Assuming the image is in PNG format; adjust accordingly
            alt={`Image for ${item.name}`}
            style={{ maxWidth: '50px', maxHeight: '50px' }} // Adjust the dimensions as needed
          />
          )}
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Wishlist;






// import React from 'react';
// import WishlistItem from './WishlistItem';

// const Wishlist = ({ wishlist, onRemove }) => {
//   return (
//     <div>
//       {wishlist.map((item) => (
//         <WishlistItem key={item.id} item={item} onRemove={onRemove} />
//       ))}
//     </div>
//   );
// };

// export default Wishlist;
