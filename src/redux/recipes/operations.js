import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import {
  getRecipeByIdAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from "../../api/recipes.js";

// =======================
// FETCH ALL RECIPES
// =======================
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (
    { category, ingredient, search, page = 1, perPage = 12 },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (ingredient) params.append("ingredient", ingredient);
      if (search) params.append("query", search);
      params.append("page", page);
      params.append("perPage", perPage);

      const response = await api.get(`/recipes?${params.toString()}`);
      return response.data.recipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// =======================
// FETCH RECIPE BY ID
// =======================
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (recipeId, { rejectWithValue }) => {
    try {
      return await getRecipeByIdAPI(recipeId);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch recipe failed");
    }
  }
);

// =======================
// FETCH FAVORITE RECIPES
// =======================
export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavorites",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await api.get(
        `/recipes/favorites?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// =======================
// FETCH OWN RECIPES
// =======================
export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwn",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await api.get(
        `/recipes/own?page=${page}&limit=${limit}`
      );
      const { data } = response.data;

      return {
        recipes: data.data,
        page: data.page,
        totalItems: data.totalItems,
        hasNextPage: data.hasNextPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// =======================
// CREATE NEW RECIPE
// =======================
export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/recipes/add-recipe", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create recipe failed");
    }
  }
);

// =======================
// ADD TO FAVORITES
// =======================
export const addFavorite = createAsyncThunk(
  "recipes/addFavorite",
  async (recipeId, { rejectWithValue }) => {
    try {
      return await addFavoriteAPI(recipeId);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add favorite failed");
    }
  }
);

// =======================
// REMOVE FROM FAVORITES
// =======================
export const removeFavorite = createAsyncThunk(
  "recipes/removeFavorite",
  async (recipeId, { rejectWithValue }) => {
    try {
      return await removeFavoriteAPI(recipeId);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Remove favorite failed");
    }
  }
);


export const fetchAddRecipesToFavorite = createAsyncThunk(
  "recipes/fetchAddRecipesToFavorite",
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add to favorites"
      );
    }
  }
);

export const fetchDeleteRecipesFromFavorite = createAsyncThunk(
  "recipes/fetchDeleteRecipesFromFavorite",
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Added to favorites"
      );
    }
  }
);