import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { Book } from '../../types/Book';

// Define a type for the slice state
export interface BooksState {
  data: Book[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: BooksState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk for fetching books with query
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query: string) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10&langRestrict=en`
    );

    return res.data.items;
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to get books';
      });
  },
});

export default booksSlice.reducer;

// Selectors
export const selectAllBooks = (state: RootState) => state.books.data;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
