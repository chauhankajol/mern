import { createContext, useEffect, useState } from "react";
import Productapi from "./api/Productapi";
import Userapi from "./api/Userapi";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.accesstoken);
        localStorage.setItem('token', res.data.accesstoken);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    Productapi: Productapi(),
    userapi: Userapi(),
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
