import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { AppBook, GoogleBook } from '../../types/Book.type';
import { serverToClientBook } from '../../utils/bookFactory';

// Async thunk for fetching books with query
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex }: { query: string; startIndex: number }) => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=newest&maxResults=10&langRestrict=en&startIndex=${startIndex}`
    );

    const items = res.data.items.map((item: GoogleBook) =>
      serverToClientBook(item)
    );

    return { items, totalItems: res.data.totalItems };
  }
);

// Async thunk for saving a book to the collection
export const saveBook = createAsyncThunk(
  'books/saveBook',
  async (book: AppBook, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const res = await axios.post('/api/books', book, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for adding a book id to the user library
export const addBookToLibrary = createAsyncThunk(
  'books/addBookToLibrary',
  async (
    { bookId, selectedOption }: { bookId: string; selectedOption: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const res = await axios.post(
        '/api/library',
        { bookId, selectedOption },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
