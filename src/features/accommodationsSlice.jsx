import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig'; // Import your firebase config
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

// Define an async thunk to fetch accommodations from Firestore
export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
  try {
    // Reference to the "accommodations" collection in Firestore
    const accommodationsRef = collection(db, 'accommodations');
    const snapshot = await getDocs(accommodationsRef); // Fetch the documents
    const accommodationsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return accommodationsList; // Return the fetched accommodations
  } catch (error) {
    throw new Error('Failed to fetch accommodations: ' + error.message);
  }
});

// Slice definition
const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // Set the fetched accommodations in state
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default accommodationsSlice.reducer;
