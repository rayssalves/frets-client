import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  profile: null,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    usersFetched: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    profile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    }
  },
});

export const { loginSuccess, logOut, tokenStillValid,startLoading,usersFetched,profile } = userSlice.actions;

export default userSlice.reducer;
