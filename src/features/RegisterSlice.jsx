import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user', // Default to 'user'
  companyName: '',
  companyAddress: '',
  phoneNumber: '',
  adminEmail: '',
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setCompanyAddress: (state, action) => {
      state.companyAddress = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAdminEmail: (state, action) => {
      state.adminEmail = action.payload;
    },
    resetForm: () => initialState,  // Reset the form to initial state
  },
});

// Export the actions to be used in components
export const { 
  setUsername, 
  setEmail, 
  setPassword, 
  setConfirmPassword, 
  setRole, 
  setCompanyName, 
  setCompanyAddress, 
  setPhoneNumber, 
  setAdminEmail, 
  resetForm 
} = registerSlice.actions;

// Export the reducer
export default registerSlice.reducer;
