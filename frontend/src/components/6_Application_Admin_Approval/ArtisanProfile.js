// ArtisanProfile.js
import React, { useState } from 'react';
import AdminApprovalPanel from './AdminApprovalPanel';

const ArtisanProfile = ({ artisan }) => {
  const [isApproved, setIsApproved] = useState(artisan.isApproved);

  return (
    <div>
      <h3>{artisan.name}</h3>
      <p>{artisan.description}</p>
      <p>Status: {isApproved ? 'Approved' : 'Pending Approval'}</p>

      <AdminApprovalPanel
        isApproved={isApproved}
        onApprovalChange={(newApprovalStatus) => setIsApproved(newApprovalStatus)}
        artisanId={artisan.id}
      />
    </div>
  );
};

export default ArtisanProfile;
