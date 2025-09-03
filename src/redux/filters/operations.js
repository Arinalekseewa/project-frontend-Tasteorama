import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../../api/api";

export const fetchCategories = createAsyncThunk(
  'filters/fetchCategories',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    if (state.filters.categories && state.filters.categories.length > 0) {
      return state.filters.categories;
    }
    try {
      const response = await api.get('/categories');
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, { getState }) {
      if (getState().filters.categories.length > 0)
        return false;
      return true;
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  'filters/fetchIngredients',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    if (state.filters.ingredients && state.filters.ingredients.length > 0) {
      return state.filters.ingredients;
    }
    try {
      const response = await api.get('/ingredients');
      return response.data.ingredients;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }, 
  {
    condition(_, { getState }) {
      if (getState().filters.ingredients.length > 0)
        return false;
      return true;
    }
  }
);
