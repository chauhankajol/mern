import React from 'react'

import Btnrender from './Btnrender';

const Productlist = ({product,isAdmin}) => {
    console.log(product)
 

  return (
    <div className='product_card'>
    {
      isAdmin&&<input type='checkbox'checked={product.checked}/>
    }
   <img src={product.images.url} alt=''/>
    <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>${product.description}</p>

    </div>
 <Btnrender product={product}/>
    </div>
  )
}

export default Productlist