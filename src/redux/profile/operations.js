import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../../api/api.js";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await api.get("/profile/own", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load profile");
    }
  }
);
