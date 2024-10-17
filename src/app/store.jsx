import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/RegisterSlice'; 
import authReducer from '../features/authSlice';
import accommodationsReducer from '../features/accommodationsSlice';
// Create the store
export const store = configureStore({
  reducer: {
    register: registerReducer, 
    auth: authReducer,
    accommodations: accommodationsReducer ,
  },
});
