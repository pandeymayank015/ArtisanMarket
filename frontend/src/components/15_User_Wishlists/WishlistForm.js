import React, { useState } from 'react';

const WishlistForm = ({ onAdd }) => {
  const [itemName, setItemName] = useState('');

  const handleAdd = () => {
    if (itemName.trim() !== '') {
      onAdd({ id: Date.now(), name: itemName });
      setItemName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAdd}>Add to Wishlist</button>
    </div>
  );
};

export default WishlistForm;
