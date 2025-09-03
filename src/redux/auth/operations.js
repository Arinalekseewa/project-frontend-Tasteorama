import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api"; 
import {logout} from './slice.js';

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Register error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      if (data.data?.accessToken)
        localStorage.setItem("accessToken", data.data.accessToken);
      if (data.data?.refreshToken)
        localStorage.setItem("refreshToken", data.data.refreshToken);
      if (data.data?.accessToken) {
        api.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
      }
      return {
        user: data.data?.user || data.data,
        token: data.data?.accessToken || null,
        refreshToken: data.data?.refreshToken || null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error.message);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common.Authorization;
    thunkAPI.dispatch(logout());
  }
});

export const refreshUser = createAsyncThunk(
  "users/me",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to fetch user");
    }
  }
);

export const autoLogin = () => async dispatch => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const user = await dispatch(fetchCurrentUser()).unwrap();
      dispatch({
        type: 'auth/login/fulfilled',
        payload: {
          user,
          token,
        },
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch(logoutUser());
    }
  }
};

export const fetchCurrentUser = createAsyncThunk(
  'users/me',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/users/me');
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);