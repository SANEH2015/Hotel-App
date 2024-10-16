// src/features/accommodationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const accommodationSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: []
  },
  reducers: {
    setAccommodations: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setAccommodations } = accommodationSlice.actions;
export default accommodationSlice.reducer;
