import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';

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
