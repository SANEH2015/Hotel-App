import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig'; // Import firebase config
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Import Firestore methods

// Define an async thunk to fetch accommodations from Firestore
export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
  try {
    const accommodationsRef = collection(db, 'accommodations');
    const snapshot = await getDocs(accommodationsRef);
    const accommodationsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return accommodationsList;
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
      const docRef = await addDoc(accommodationsRef, accommodationData);
      return { id: docRef.id, ...accommodationData };
    } catch (error) {
      return rejectWithValue('Failed to post accommodation: ' + error.message);
    }
  }
);

// Define an async thunk to delete an accommodation by id from Firestore
export const deleteAccommodation = createAsyncThunk(
  'accommodations/deleteAccommodation',
  async (id, { rejectWithValue }) => {
    try {
      const accommodationRef = doc(db, 'accommodations', id);
      await deleteDoc(accommodationRef);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete accommodation: ' + error.message);
    }
  }
);

// Define an async thunk to update an accommodation by id in Firestore
export const updateAccommodation = createAsyncThunk(
  'accommodations/updateAccommodation',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const accommodationRef = doc(db, 'accommodations', id);
      await updateDoc(accommodationRef, updatedData);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue('Failed to update accommodation: ' + error.message);
    }
  }
);

// Define an async thunk to book an accommodation
export const bookAccommodation = createAsyncThunk(
  'accommodations/bookAccommodation',
  async (id, { rejectWithValue }) => {
    try {
      const accommodationRef = doc(db, 'accommodations', id);
      await updateDoc(accommodationRef, { booked: true });
      return id; // Return the ID of the booked accommodation
    } catch (error) {
      return rejectWithValue('Failed to book accommodation: ' + error.message);
    }
  }
);

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
        state.items = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postAccommodation.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteAccommodation.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedData };
        }
      })
      .addCase(bookAccommodation.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.items[index].booked = true; // Update the booked status in the state
        }
      });
  },
});

export default accommodationsSlice.reducer;
