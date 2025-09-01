import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  createRecipe,
  updateFavorite,
  fetchFavoriteRecipes,
} from "./recipesThunks";
import { notifyError, notifySuccess } from "../utils/notifications";

const initialState = {
  items: [],
  currentRecipe: null,
  favoriteItems: [],
  loading: false,
  error: null,
  page: 1,
  perPage: 10,
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
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
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
      // UPDATE FAVORITE STATUS
      // =======================
      .addCase(updateFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRecipe = action.payload;

        // Оновлюємо рецепт у списку
        const index = state.items.findIndex((r) => r._id === updatedRecipe._id);
        if (index !== -1) {
          state.items[index] = updatedRecipe;
        }

        // Оновлюємо поточний рецепт, якщо він відкритий
        if (state.currentRecipe?._id === updatedRecipe._id) {
          state.currentRecipe = updatedRecipe;
        }

        // Оновлюємо список улюблених рецептів
        const favIndex = state.favoriteItems.findIndex(
          (r) => r._id === updatedRecipe._id
        );
        if (updatedRecipe.isFavorite) {
          if (favIndex === -1) state.favoriteItems.push(updatedRecipe);
        } else {
          if (favIndex !== -1) state.favoriteItems.splice(favIndex, 1);
        }

        notifySuccess("Статус обраного оновлено!");
      })
      .addCase(updateFavorite.rejected, (state, action) => {
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
