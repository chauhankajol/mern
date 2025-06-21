import React, { useContext } from 'react';
import { GlobalState } from '../../../Globalstate';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userapi.cart;

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>;

  return (
    <div>
      {cart.map(product => (
        <div key={product._id} className="box-detail">
          <div className="detail">
            <img src={product.product?.images?.url || ''} alt={product?.title || 'Product Image'} />

            <div className="box-detail">
              <div className="row">
                <h2>{product.title}</h2>
                <h6>{product.product_id}</h6>
              </div>

              <span>${product.product.price}</span>
              <span>{ product.product.description}</span>
              <p>{ product.product.content}</p>
              <p>Sold: {product.sold}</p>

              <Link to='/payment' className='cart'>Buy Now</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
