import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { apiBaseUrl } from '../../utils/apiUtils';

// Async thunk for getting books by an array of bookIds
export const getBooksByIds = createAsyncThunk(
  'books/getBooksByIds',
  async (bookIds: string[], thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const res = await axios.get(`${apiBaseUrl}/books/${bookIds.join(',')}`, {
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
