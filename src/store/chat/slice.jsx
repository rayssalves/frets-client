import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: null,
  author: null,
  receiverId: null,
  receiverName: null,
  messages: null
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    joinRoom: (state, action) => {
        state.room = action.payload;
    },
    setReceiver: (state, action) => {
        state.receiverId = action.payload.receiverId;
        state.receiverName = action.payload.receiverName;
    },
    resetChat: (state, action) => {
        state.messages = null;
    },
    messagesFetched: (state, action) => {
        state.room = action.payload[action.payload.length-1].room
        state.messages = action.payload;
      },
  },
});

export const { joinRoom, setReceiver, messagesFetched, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
