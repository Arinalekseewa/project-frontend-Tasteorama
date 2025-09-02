import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../../api/api";
// import { getAllIngredientsAPI } from '../../api/ingredients.js';

// =======================
// FETCH ALL RECIPES
// =======================
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (
    { category, ingredient, search, page = 1, perPage = 12 },
    thunkAPI
  ) => {
    try {
      const params = new URLSearchParams();
      if (category) {
        params.append('category', category);
      }
      if (ingredient) {
        params.append('ingredient', ingredient);
      }
      if (search) {
        params.append('search', search);
      }
      params.append('page', page);
      params.append('perPage', perPage);
      const response = await api.get(`/recipes?${params.toString()}`);
      console.log(response.data.recipes);
      return response.data.recipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchAllIngredients = createAsyncThunk(
//   'recipe/fetchAllIngredients',
//   async (_, thunkAPI) => {
//     try {
//       const res = await getAllIngredientsAPI();
//       return res.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// =======================
// FETCH RECIPE BY ID
// =======================
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipes/${recipeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch recipe failed");
    }
  }
);

// =======================
// FETCH FAVORITE RECIPES
// =======================
export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/fetchFavorites',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await api.get(
        `/recipes/favorites?page=${page}&limit=${limit}`
      );

      const {
        data,
        page: currentPage,
        hasNextPage,
        totalItems,
      } = response.data;

      return {
        recipes: data,
        page: currentPage,
        hasNextPage,
        totalItems,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/fetchOwn',
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
  async (newRecipeData, { rejectWithValue }) => {
    try {
      const response = await api.post("/recipes", newRecipeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create recipe failed");
    }
  }
);

// =======================
// UPDATE FAVORITE STATUS
// =======================
export const updateFavorite = createAsyncThunk(
  "recipes/updateFavorite",
  async ({ recipeId, isFavorite }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/recipes/${recipeId}/favorite`, {
        isFavorite,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update favorite failed");
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