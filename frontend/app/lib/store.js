"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./features/auth";
import ticketReducer from './features/ticket'
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    tickets: ticketReducer
  }
});
// export const store = () => {
//   return configureStore({
//     reducer: {}
//   });
// };
