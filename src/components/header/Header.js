import React, { useContext } from "react";
import { MdOutlineMenu, MdOutlineClose, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { GlobalState } from "../../Globalstate";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userapi.isLogged;
  const [isAdmin, setIsAdmin] = state.userapi.isAdmin;
  const[cart]=state.userapi.cart
  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.href = "/"; // force refresh
  };

  const adminRouter = () => (
    <>
      <li>
        <Link to="/create_product">Create Product</Link>
      </li>
      <li>
        <Link to="/category">Categories</Link>
      </li>
    </>
  );

  const loggedRouter = () => (
    <>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <a href="/" onClick={logoutUser}>Logout</a>
      </li>
    </>
  );

  return (
    <header>
      <div className="menu">
        <MdOutlineMenu size={30} />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "KajolShop"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? loggedRouter() : (
          <li>
            <Link to="/login">Login or Register</Link>
          </li>
        )}

        <li>
          <MdOutlineClose size={30} className="menu" />
        </li>
      </ul>

      {!isAdmin && (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart" >
            <MdShoppingCart size={30} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
