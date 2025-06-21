import { useEffect, useState } from 'react';
import axios from 'axios';


const Userapi = () => {
  const [isLogged, setLogged] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token }
          });

          setLogged(true);
          setAdmin(res.data.role === 1); // Assuming role 1 is admin
        } catch (err) {
          alert(err.response?.data?.msg || 'Failed to fetch user info');
        }
      };
      getUser();
    }
  }, []);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login");

    const check = cart.every(item => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product is already in the cart");
    }
  };

  return {
    isLogged: [isLogged, setLogged],
    isAdmin: [isAdmin, setAdmin],
    cart: [cart, setCart],
    addCart: addCart
  };
};

export default Userapi;
