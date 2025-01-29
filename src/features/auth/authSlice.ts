import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IAuth, IRegisterUser } from '../../types/Auth.types';

const initialState: IAuth = {
  token: '',
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectUser = (state: RootState) => state.auth.user;
