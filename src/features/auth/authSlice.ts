import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IAuth, IRegisterUser, IError } from '../../types/Auth.type';

const initialState: IAuth = {
  token: '',
  isAuthenticated: false,
  isLoading: false,
  status: {
    success: false,
    message: null,
  },
  errors: [],
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
      if (axios.isAxiosError(error)) {
        const errorData: IError[] = error.response?.data.errors || [];
        return thunkAPI.rejectWithValue(errorData);
      }
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
      state.errors = [];
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
        state.status.success = true;
        state.status.message = action.payload.message;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status.success = false;
        state.status.message = 'Registration failed!';
        state.errors = [...(action.payload as IError[])];
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
export const selectErrors = (state: RootState) => state.auth.errors;
export const selectUser = (state: RootState) => state.auth.user;
