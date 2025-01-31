import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IAuth, IError } from '../../types/Auth.type';
import { registerUser, loginUser } from './authActions';

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoading = false;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status.success = false;
        state.status.message = action.payload as string;
      });
  },
});

export default authSlice.reducer;

export const { clearState } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectErrors = (state: RootState) => state.auth.errors;
export const selectUser = (state: RootState) => state.auth.user;
