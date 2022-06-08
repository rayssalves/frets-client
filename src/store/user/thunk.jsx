import axios from "axios";


import {
  startLoading,
  usersFetched,
  profile
} from "./slice";

export async function fetchUsers(dispatch, userId) {
  try {
    dispatch(startLoading());
    const response = await axios.get("http://localhost:4000/user");
    console.log("response", response);
    const users = response.data;
    dispatch(usersFetched(users));
  } catch (error) {
    console.log(error.message);
  }
}

export const fetchProfile = () => async (dispatch,getState)=> {
  try {
    const { token } = getState().user;
      console.log('USER ID: ', token)
    const response = await axios.get("http://localhost:4000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log("response", response);
    const details = response.data;
    dispatch(profile(details));
  } catch (error) {
    console.log(error.message);
  }
}


