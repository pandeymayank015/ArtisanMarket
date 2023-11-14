// ProductList.js

import React from 'react';

const ProductList = ({ products, onUpdate, onRemove }) => {
  return (
    <div>
      <h3>Product Listings</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description}
            <button onClick={() => onUpdate(product.id, { ...product, name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => onRemove(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

// import React from 'react';

// const ProductList = ({ products, onUpdate, onRemove }) => {
//   return (
//     <div>
//       {/* <h3>List of Products</h3> */}
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <div>
//               <strong>Name:</strong> {product.name}
//             </div>
//             <div>
//               <strong>Description:</strong> {product.description}
//             </div>
//             <div>
//               <button onClick={() => onUpdate(product.id, /* updatedProduct */)}>
//                 Update
//               </button>
//               <button onClick={() => onRemove(product.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;



