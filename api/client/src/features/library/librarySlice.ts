import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { addBookToLibrary } from './libraryActions';

// Define a type for the slice state
type LibraryState = {
  libraryId: string | null;
  error: string | null;
};

const initialState: LibraryState = {
  libraryId: null,
  error: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookToLibrary.pending, (state) => {
        state.libraryId = null;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.libraryId = action.payload.libraryItem._id;
      })
      .addCase(addBookToLibrary.rejected, (state) => {
        state.libraryId = null;
        state.error = 'Failed to add book to library';
      });
  },
});

export default booksSlice.reducer;

// Selectors
export const selectLibraryId = (state: RootState) => state.library.libraryId;
export const selectLibraryError = (state: RootState) => state.library.error;
