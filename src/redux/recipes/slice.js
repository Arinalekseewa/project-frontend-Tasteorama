import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  createRecipe,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
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
  own: {
    items: [],
    total: 0,
    hasNextPage: false,
  },
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
        state.currentRecipe = action.payload.data || action.payload;
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
        const updatedRecipe = action.payload.data || action.payload;

        // Оновлюємо рецепт у списку
        const index = state.items.findIndex((r) => r._id === updatedRecipe._id);
        if (index !== -1) {
          state.items[index] = updatedRecipe;
        }

        // Оновлюємо поточний рецепт
        if (state.currentRecipe?._id === updatedRecipe._id) {
          state.currentRecipe = updatedRecipe;
          state.currentRecipe.isFavorite = true;
        }

        // Оновлюємо список улюблених
        if (!state.favoriteItems.some((r) => r._id === updatedRecipe._id)) {
          state.favoriteItems.push(updatedRecipe);
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
        state.favoriteItems = action.payload.data || action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyError(action.payload);
      })
      // =======================
      // FETCH OWN RECIPES
      // =======================
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        const { recipes, page, total, limit } = action.payload;
        state.isLoading = false;
        state.own.total = total;
        state.own.hasNextPage = page * limit < total;
        if (page === 1) {
          state.own.items = recipes;
        } else {
          state.own.items = [...state.own.items, ...recipes];
        }
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export const { clearCurrentRecipe, clearError } = recipesSlice.actions;
export default recipesSlice.reducer;
