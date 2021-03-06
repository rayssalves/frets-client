import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import chatReducer from "./chat/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    chat: chatReducer
  },
});
