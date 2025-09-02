import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  createRecipe,
  fetchFavoriteRecipes,
  addFavorite,
  removeFavorite,
} from "./operations";
import { notifyError, notifySuccess } from "../utils/notifications";

const initialState = {
  items: [],
  currentRecipe: null,
  favoriteItems: [],
  loading: false,
  error: null,
  page: 1,
  limit: 12,
  total: 0,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearCurrentRecipe(state) {
      state.currentRecipe = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =======================
      // FETCH ALL RECIPES
      // =======================
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || action.payload;

        if (action.payload.total) {
    state.total = action.payload.total;
  }
        if (action.payload.page) {
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })

      // =======================
      // FETCH RECIPE BY ID
      // =======================
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload.data;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Recipe not found";
        notifyError(state.error);
      })

      // =======================
      // CREATE NEW RECIPE
      // =======================
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        notifySuccess("Рецепт успішно створений!");
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })

      // =======================
      // ADD TO FAVORITES
      // =======================
      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const addedRecipe = action.payload.data;

        // Додаємо рецепт до favoriteItems
        if (!state.favoriteItems.some((r) => r._id === addedRecipe._id)) {
          state.favoriteItems.push(addedRecipe);
        }

        // Якщо цей рецепт відкритий → позначаємо як обраний
        if (state.currentRecipe?._id === addedRecipe._id) {
          state.currentRecipe.isFavorite = true;
        }

        notifySuccess("Рецепт додано до обраного!");
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })

      // =======================
      // REMOVE FROM FAVORITES
      // =======================
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const recipeId = action.meta.arg;

        // Видаляємо з favoriteItems
        state.favoriteItems = state.favoriteItems.filter(
          (r) => r._id !== recipeId
        );

        // Якщо цей рецепт відкритий → знімаємо позначку
        if (state.currentRecipe?._id === recipeId) {
          state.currentRecipe.isFavorite = false;
        }

        notifySuccess("Рецепт видалено з обраного!");
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })

      // =======================
      // FETCH FAVORITE RECIPES
      // =======================
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteItems = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      });
  },
});

export const { clearCurrentRecipe, clearError } = recipesSlice.actions;
export default recipesSlice.reducer;
