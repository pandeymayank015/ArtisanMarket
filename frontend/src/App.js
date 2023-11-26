import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UpdateProductRatingForm from './components/12_Rating_&_Review/UpdateProductRatingForm';
import Wishlist from './components/15_User_Wishlists/Wishlist';
import ArtisanStoreManagement from './components/3_Admin/ArtisanStoreManagement';
import ProductApprovalForm from './components/3_Admin/ProductApprovalForm';
// src/App.js
// import React from 'react';
import './App.css';
import ArtisanProfile from './components/ArtisanProfile';
import CommunityForum from './components/CommunityForum';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import ArtisanWorkshopProfile from './components/artisan-workshop-profile/ArtisanWorkshopProfile';
import UploadForm from './components/resource-center/UploadForm';
import ResourceCenter from './components/resource-center/resource-center';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/artisan-profile" element={<ArtisanProfile />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/resource-center" element={<ResourceCenter />} />
          <Route path="/artisan/:username" element={<ArtisanWorkshopProfile />} />
          <Route path="/upload/:username" element={<UploadForm />} />
          <Route path="/ArtisanStoreManagement" element={<ArtisanStoreManagement />} />
          <Route path="/ProductApprovalForm" element={<ProductApprovalForm />} />
          <Route path="/UpdateProductRatingForm" element={<UpdateProductRatingForm />} />
          <Route path="/Wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </div>
    </Router >
  );
}

export default App;



// import './App.css';
// import React from 'react';
// import { Routes, Route, Link  } from 'react-router-dom';
// import ProductApprovalForm from './components/ProductApprovalForm';
// import ArtisanStoreManagement from './components/ArtisanStoreManagement';

// const App = () => {
//   return (
//       {/* <Routes>
//         <Route path="/ArtisanStoreManagement" element={<ArtisanStoreManagement />} />
//         <Route path="/ProductApprovalForm" element={<ProductApprovalForm />} />
//       </Routes> */}
//       <Link to="/ArtisanStoreManagement">Artisan Store Management</Link>
//       <Link to="/ProductApprovalForm">Product Approval Form</Link>
//   );
// }

// export default App;
