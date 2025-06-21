import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../../Globalstate'

const Detailsproduct = () => {
    const params =useParams()
    const state=useContext(GlobalState)
    const[products]=state.Productapi.products
    const[detailProduct,setDetailProduct]=useState([])
  useEffect(()=>{
    if(params){
        products.forEach(product=>{
            if(product._id === params.id)setDetailProduct(product)
        })
    }
  },[params,products])
  console.log(detailProduct)
    return (
    <div className='detail'>
<img src={detailProduct?.images?.url || ''} alt={detailProduct?.title || 'Product Image'} />

 <div className='box-detail'>
  <div className='row'>
<h2>{detailProduct.title}</h2>
<h6>{detailProduct.product_id}</h6>
  </div>
  
  <span>${detailProduct.price}</span>
  <span>${detailProduct.description}</span>
  <p>{detailProduct.content}</p>
    <p>sold{detailProduct.sold}</p>
    <Link to='/cart' className='cart'>Buy Now</Link>

 </div>
    </div>
  )
}

export default Detailsproduct