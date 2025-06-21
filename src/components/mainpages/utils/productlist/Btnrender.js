import React from 'react'
 import { GlobalState } from '../../../../Globalstate';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
 const Btnrender = (product) => {
    const state = useContext(GlobalState);
  const [products] = state.Productapi.products;
  const [isAdmin]=state.userapi.isAdmin
  const addCart=state.userapi.addCart
  return (
    <div> <div className='row_btn'>
    {isAdmin?
    <>
    <Link id='btn_buy'to={`#!`} >Delete </Link>
    <Link id='btn_view' to={`detail/${product._id}`}>Edit</Link>
  </>
:<>
 <Link id='btn_buy'to={`#!`} onClick={()=>addCart(product)} >Buy </Link>
    <Link id='btn_view' to={`detail/${product._id}`}>view</Link>
</>

    }
      </div></div>
  )
}

export default Btnrender