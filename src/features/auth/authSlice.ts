import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IAuth, IRegisterUser } from '../../types/Auth.type';

const initialState: IAuth = {
  token: '',
  isAuthenticated: false,
  isLoading: false,
  status: {
    success: false,
    message: null,
  },
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
  reducers: {
    clearStatus: (state) => {
      state.status.success = false;
      state.status.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
        state.status.success = true;
        state.status.message = 'Registration successful!';
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.status.success = false;
        state.status.message = 'Registration failed!'; // Use a more specific error handling
      });
  },
});

export default authSlice.reducer;

export const { clearStatus } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectUser = (state: RootState) => state.auth.user;
