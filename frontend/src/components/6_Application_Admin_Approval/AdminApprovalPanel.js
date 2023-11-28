// AdminApprovalPanel.js
import React from 'react';
// import { approveArtisan, rejectArtisan } from '../api'; // Replace with your actual API functions

const AdminApprovalPanel = ({ isApproved, onApprovalChange, artisanId }) => {
  const handleApprove = () => {
    // Send approval request to the server
    approveArtisan(artisanId)
      .then(() => onApprovalChange(true))
      .catch((error) => console.error('Error approving artisan:', error));
  };

  const handleReject = () => {
    // Send rejection request to the server
    rejectArtisan(artisanId)
      .then(() => onApprovalChange(false))
      .catch((error) => console.error('Error rejecting artisan:', error));
  };

  return (
    <div>
      {isApproved ? (
        <p>Already Approved</p>
      ) : (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      )}
    </div>
  );
};

export default AdminApprovalPanel;
