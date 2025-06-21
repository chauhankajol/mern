import React from "react";
import Product from "./products/Product";
import Login from"./login/Login"
import Ragister from"./login/Ragister"
import Cart from "./cart/Cart";
import { Route ,Routes} from "react-router-dom";
import Detailsproduct from "./utils/detailsproduct/Detailsproduct";


const Pages=()=>{
    return(
        <div>
            <Routes>
            <Route path='/' element={<Product/>}/>
            <Route path="/login" element={<Login/>}/>  
             <Route path="/register" element={<Ragister/>}/>
            <Route path="/cart" element={<Cart/>}/>
           <Route path="/detail/:id" element={<Detailsproduct/>}/>
           
           
            </Routes>
           

        </div>
    )
}
export default Pages;