import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IRegisterUser, ILoginUser, ILibraryItem } from '../../types/Auth.type';
import { apiBaseUrl } from '../../utils/apiUtils';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterUser, thunkAPI) => {
    try {
      const res = await axios.post(
        `${apiBaseUrl}/auth/user/register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Set the user in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Set the token in localStorage
      localStorage.setItem('token', res.data.token);

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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginUser, thunkAPI) => {
    try {
      const res = await axios.post(
        `${apiBaseUrl}/auth/user/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Set the user in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Set the token in localStorage
      localStorage.setItem('token', res.data.token);

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

// Async thunk for updating user library
export const updateUserLibrary = createAsyncThunk(
  'auth/updateUserLibrary',
  async (
    { userId, library }: { userId: string; library: ILibraryItem[] },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const res = await axios.patch(
        `${apiBaseUrl}/api/auth/user/${userId}`,
        { library },
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
