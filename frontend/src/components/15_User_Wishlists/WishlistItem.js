import React from 'react';

const WishlistItem = ({ item, onRemove }) => {
  return (
    <div>
      <p>{item.name}</p>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

export default WishlistItem;
