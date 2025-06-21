import React, { useContext } from 'react';
import { GlobalState } from '../../../Globalstate';
import Productlist from '../utils/productlist/Productlist';

const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.Productapi.products;
  const [isAdmin]=state.userapi.isAdmin
  console.log("Products:", products); // 👈 this must log actual products

  return (
    <div className="products">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <Productlist key={product._id || product.id} product={product} isAdmin={isAdmin} />
        ))
      )}
    </div>
  );
};

export default Product;
