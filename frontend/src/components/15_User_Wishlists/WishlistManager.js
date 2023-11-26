import React, { useState } from 'react';
import Wishlist from './Wishlist';
import WishlistForm from './WishlistForm';

const WishlistManager = () => {
  const [wishlist, setWishlist] = useState([]);

  const handleAddItem = (item) => {
    setWishlist([...wishlist, item]);
  };

  const handleRemoveItem = (itemId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  return (
    <div>
        <h2>Wishlist</h2>
      <WishlistForm onAdd={handleAddItem} />
      <Wishlist wishlist={wishlist} onRemove={handleRemoveItem} />
    </div>
  );
};

export default WishlistManager;
