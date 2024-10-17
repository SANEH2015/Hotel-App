// src/features/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: 'user', // Default role
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.role = 'user';
    },
  },
});

export const { setUser, setRole, resetAuth } = authSlice.actions;

export default authSlice.reducer;
