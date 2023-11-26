import React from 'react';
import Rating from './Rating';

const Review = ({ review }) => (
  <div className="review">
    <p>{review.text}</p>
    <Rating value={review.rating} />
  </div>
);

export default Review;
