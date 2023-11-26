import React, { useState } from 'react';
import Rating from './Rating';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

const ProductDetail = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    // Add the new review to the existing reviews
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <div>
      <h2>Product Detail</h2>
      <p>Average Rating: {calculateAverageRating().toFixed(1)}</p>
      <Rating value={calculateAverageRating()} />
      <ReviewForm onSubmit={addReview} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default ProductDetail;
