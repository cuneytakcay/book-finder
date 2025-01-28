import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IAuth, IRegisterUser } from '../../types/Auth.types';

const initialState: IAuth = {
  isAuthenticated: false,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterUser, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/user/register', userData);

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
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
