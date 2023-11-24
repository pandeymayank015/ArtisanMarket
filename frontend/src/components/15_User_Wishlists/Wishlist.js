import React from 'react';
import WishlistItem from './WishlistItem';

const Wishlist = ({ wishlist, onRemove }) => {
  return (
    <div>
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Wishlist;
