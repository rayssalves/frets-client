import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";


import { loginSuccess, logOut, tokenStillValid } from "./slice";

export const signUp = (name, email, password,city,isOwner,description,imageUrl,pet) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
        city,
        isOwner,
        imageUrl,
        description,
        pet
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
 
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);

    
      } else {
        console.log(error.message);
      
      }
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
     
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
    }
  };
};
