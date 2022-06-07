import axios from "axios";


import {
  startLoading,
  usersFetched,
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
