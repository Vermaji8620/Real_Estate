// redux k bina v kaaam chal skta hai...but for large apps we use redux
// yaha pe configuration set up krrhe hai...aur sb reducers ko ek sath 'user' k andar me integrate krrhe hai

// in sb chiz ko redux-dev tools (edge browser )  pe dekh skte hai...but page refresh krne se information ud jata hai...to ek npm package use krnge 

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
