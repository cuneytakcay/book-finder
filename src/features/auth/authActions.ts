import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IRegisterUser } from '../../types/Auth.type';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterUser, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/user/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data.errors || [];
        return thunkAPI.rejectWithValue(errorData);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
