import React from 'react';

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < value ? 'star filled' : 'star'}>
      ★
    </span>
  ));

  return <div className="rating">{stars}</div>;
};

export default Rating;
