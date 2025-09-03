import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "./operations";
import { notifyError, notifySuccess } from "../utils/notifications";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user && action.payload?.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        notifySuccess("Registration successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.IsLoggedIn = true;
        notifySuccess("Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;
        state.IsLoggedIn = false;
        notifySuccess("Logout successful");
      })
      //CurrentUser
      .addCase('auth/fetchCurrentUser/pending', state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase('auth/fetchCurrentUser/fulfilled', (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.favorites = action.payload.favorites || [];
      })
      .addCase('auth/fetchCurrentUser/rejected', (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});
export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;