import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!rating || !text) {
      alert('Please provide both a rating and a review text.');
      return;
    }

    // Call the onSubmit callback with the new review
    onSubmit({ rating, text });

    // Clear the form
    setRating(0);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">Select a rating</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </label>
      <label>
        Review:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
