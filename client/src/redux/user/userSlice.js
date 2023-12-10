// yaha pe actual me hm apna dukan set up krrhe hai, jaha pe sab kch hai(naam, initialThing, and the functions jo ki sbhi initial values ko change kr skta hai)
// kch v chchaiye hoga to dukan se leke jana pdega us component me jaha pe dukan k saman k jarurat hai...

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
