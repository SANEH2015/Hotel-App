import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    resetForm: () => initialState,  
  },
});

// Export the actions to be used in components
export const { setUsername, setEmail, setPassword, setConfirmPassword, resetForm } = registerSlice.actions;

// Export the reducer
export default registerSlice.reducer;
