import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { Book } from '../../types/Book';

// Define a type for the slice state
export interface BookDetailState {
  data: Book | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: BookDetailState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for fetching a single book by ID
export const fetchBookById = createAsyncThunk(
  'bookDetail/fetchBookById',
  async (id: string) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    return res.data;
  }
);

export const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookById.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to get book';
      });
  },
});

export default bookDetailSlice.reducer;

// Selectors
export const selectBook = (state: RootState) => state.bookDetail.data;
export const selectBookLoading = (state: RootState) => state.bookDetail.loading;
export const selectBookError = (state: RootState) => state.bookDetail.error;
