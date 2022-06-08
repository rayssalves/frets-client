import axios from "axios";


import {
  messagesFetched,
} from "./slice";

export const fetchMessages = () => async (dispatch,getState)=> {
  try {
    const { token } = getState().user;
    const response = await axios.get("http://localhost:4000/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log("response", response);
    const messages = response.data;
    dispatch(messagesFetched(messages));
  } catch (error) {
    console.log(error.message);
  }
}