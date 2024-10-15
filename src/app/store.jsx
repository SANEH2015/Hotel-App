import { configureStore } from '@reduxjs/toolkit';
import registerReducer from '../features/RegisterSlice'; 

// Create the store
export const store = configureStore({
  reducer: {
    register: registerReducer,  
  },
});
