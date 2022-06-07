import { apiUrl } from "../../config/constants";
import axios from "axios";

export const sendChatMessage = (room, author, receiver, message, time) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${apiUrl}/chat`, {
            room,
            author,
            receiver,
            message,
            time,
          });
      } catch (error) {
        if (error.response) {
          console.log(error.response.message);
        } else {
          console.log(error);
        }
      }
    };
  };