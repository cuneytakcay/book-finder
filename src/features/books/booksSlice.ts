import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { AppBook } from '../../types/Book.type';
import { fetchBooks, saveBook, addBookToLibrary } from './bookActions';

// Define a type for the slice state
export interface BooksState {
  data: AppBook[];
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
        state.error = null;
        state.data = action.payload.items;
        // state.totalItems = action.payload.totalItems;
        state.totalItems = 50; // Google books API does not provide a consistent value for totalItems, so we hardcode it
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to get books';
      })
      .addCase(saveBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBook.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveBook.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to save book';
      })
      .addCase(addBookToLibrary.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookToLibrary.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addBookToLibrary.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to add book to library';
      });
  },
});

export default booksSlice.reducer;

// Selectors
export const selectAllBooks = (state: RootState) => state.books.data;
export const selectTotalItems = (state: RootState) => state.books.totalItems;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
