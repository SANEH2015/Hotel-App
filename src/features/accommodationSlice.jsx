// src/features/accommodationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const accommodationSlice = createSlice({
  name: 'accommodations',
  initialState,
  reducers: {
    setAccommodations: (state, action) => {
      state.list = action.payload; // Sets the list of accommodations
    },
    addAccommodation: (state, action) => {
      state.list.push(action.payload); // Adds a new accommodation to the list
    },
  },
});

export const { setAccommodations, addAccommodation } = accommodationSlice.actions;

export default accommodationSlice.reducer;
