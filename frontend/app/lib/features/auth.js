import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      token: localStorage.getItem("token") || null,
      userId: localStorage.getItem("userId") || null,
      isLoggedIn: !!localStorage.getItem("token")
    };
  }

  return {
    token: null,
    userId: null,
    isLoggedIn: false
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload.userId);
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    }
  }
});

export const { setLogin, setUserId, setLogout, token } = authSlice.actions;
export default authSlice.reducer;
