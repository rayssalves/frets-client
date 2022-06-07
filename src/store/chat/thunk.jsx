import axios from "axios";


import {
  messagesFetched,
} from "./slice";

export const fetchMessages = userId => async dispatch => {
  try {
      console.log('USER ID: ', userId)
    const response = await axios.get("http://localhost:4000/chat", {
        params: {
          userId: userId
        }
      });
    console.log("response", response);
    const messages = response.data;
    dispatch(messagesFetched(messages));
  } catch (error) {
    console.log(error.message);
  }
}