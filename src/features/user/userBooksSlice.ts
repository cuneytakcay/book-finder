import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { AppBook } from '../../types/Book.type';
import { getBooksByIds } from './userBooksAction';

// Define a type for the slice state
export interface UserBooksState {
  data: AppBook[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: UserBooksState = {
  data: [],
  loading: false,
  error: null,
};

export const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksByIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooksByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.books;
      })
      .addCase(getBooksByIds.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to get books';
      });
  },
});

export default userBooksSlice.reducer;

// Selectors
export const selectUserBooks = (state: RootState) => state.userBooks.data;
export const selectBooksLoading = (state: RootState) => state.userBooks.loading;
export const selectBooksError = (state: RootState) => state.userBooks.error;
