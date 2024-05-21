"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./features/auth";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  }
});
// export const store = () => {
//   return configureStore({
//     reducer: {}
//   });
// };
