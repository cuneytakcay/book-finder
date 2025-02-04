import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { Book } from '../../types/Book.type';

// Define a type for the slice state
export interface BooksState {
  data: Book[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: BooksState = {
  data: [],
  totalItems: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching books with query
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex }: { query: string; startIndex: number }) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10&langRestrict=en&startIndex=${startIndex}`
    );

    return res.data;
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
        state.data = action.payload.items;
        // state.totalItems = action.payload.totalItems;
        state.totalItems = 50; // Google books API does not provide a consistent value for totalItems, so we hardcode it
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
export const selectTotalItems = (state: RootState) => state.books.totalItems;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
