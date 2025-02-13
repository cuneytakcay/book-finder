import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import booksReducer from '../features/books/booksSlice';
import bookDetailReducer from '../features/bookDetail/bookDetailSlice';
import modalReducer from '../features/modal/modalSlice';
import libraryReducer from '../features/library/librarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    bookDetail: bookDetailReducer,
    modal: modalReducer,
    library: libraryReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {books: BooksState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
