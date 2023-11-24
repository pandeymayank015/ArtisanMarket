import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtisanStoreManagement from './components/3_Admin/ArtisanStoreManagement';
import ProductApprovalForm from './components/3_Admin/ProductApprovalForm';
import ProductDetail from './components/12_Rating_&_Review/ProductDetail';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/ArtisanStoreManagement" element={<ArtisanStoreManagement />} />
          <Route path="/ProductApprovalForm" element={<ProductApprovalForm />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />

        </Routes>
      </div>
    </Router>
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
