import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import bookDetailReducer from '../features/bookDetail/bookDetailSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetail: bookDetailReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {books: BooksState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
