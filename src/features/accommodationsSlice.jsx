import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig'; // Import firebase config
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Import Firestore methods

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

// Define an async thunk to post a new accommodation to Firestore
export const postAccommodation = createAsyncThunk(
  'accommodations/postAccommodation',
  async (accommodationData, { rejectWithValue }) => {
    try {
      const accommodationsRef = collection(db, 'accommodations');
      // Add the new accommodation to the collection
      const docRef = await addDoc(accommodationsRef, accommodationData);
      return { id: docRef.id, ...accommodationData };
    } catch (error) {
      return rejectWithValue('Failed to post accommodation: ' + error.message);
    }
  }
);

// Slice definition
const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    items: [], // Stores fetched accommodations
    isLoading: false, // Tracks loading state
    error: null, // Holds any errors encountered during async actions
  },
  reducers: {}, // No synchronous reducers
  extraReducers: (builder) => {
    // Fetch accommodations case reducers
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Post accommodation case reducers
    builder
      .addCase(postAccommodation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postAccommodation.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the newly created accommodation to the state
        state.items.push(action.payload);
      })
      .addCase(postAccommodation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Use rejectWithValue payload for errors
      });
  },
});

export default accommodationsSlice.reducer;
