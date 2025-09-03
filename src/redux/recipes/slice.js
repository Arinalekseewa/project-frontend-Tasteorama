import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  createRecipe,
  fetchFavoriteRecipes,
  fetchAddRecipesToFavorite,
  fetchOwnRecipes,
  addFavorite,
  removeFavorite,
} from "./operations.js";

import { notifyError, notifySuccess } from "../utils/notifications";

const initialState = {
  items: [],
  currentRecipe: null,
  favoriteItems: [],
  loading: false,     // загальний лоадер для основних запитів
  isLoading: false,   // окремий для власних рецептів (infinite scroll та ін.)
  error: null,
  page: 1,
  perPage: 12,        // зберігаємо, якщо бекенд повертає пагінацію
  limit: 12,          // локальний ліміт
  total: 0,
  own: {
    items: [],
    total: 0,
    hasNextPage: false,
  },
};

const getErrorMessage = (payload, fallback = "Something went wrong") =>
  typeof payload === "string"
    ? payload
    : payload?.message || fallback;

const getData = (payload) => payload?.data ?? payload;

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
        const data = getData(action.payload);
        // Якщо бекенд повертає об'єкт із { data, page, perPage }:
        if (Array.isArray(data)) {
          state.items = data;
        } else if (data?.data && Array.isArray(data.data)) {
          state.items = data.data;
        } else {
          state.items = [];
          state.items = action.payload.data || action.payload;
        }
        if (action.payload.total) {
          state.total = action.payload.total;
        }
        if (action.payload.page) {
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
        }

        if (action.payload?.page) state.page = action.payload.page;
        if (action.payload?.perPage) state.perPage = action.payload.perPage;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        notifyError(state.error);
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
        state.currentRecipe = getData(action.payload) ?? null;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload, "Recipe not found");
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
        const created = getData(action.payload);
        if (created) state.items.unshift(created);
        notifySuccess("Рецепт успішно створений!");
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        notifyError(state.error);
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

        const recipe = getData(action.payload);
        if (!recipe?._id) return;

        // оновлюємо у загальному списку
        const idx = state.items.findIndex((r) => r._id === recipe._id);
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...recipe, isFavorite: true };

        // оновлюємо currentRecipe
        if (state.currentRecipe?._id === recipe._id) {
          state.currentRecipe = { ...state.currentRecipe, ...recipe, isFavorite: true };
        }

        // додаємо до улюблених, якщо ще немає
        if (!state.favoriteItems.some((r) => r._id === recipe._id)) {
          state.favoriteItems.push({ ...recipe, isFavorite: true });
        }

        notifySuccess("Рецепт додано до обраного!");
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        notifyError(state.error);
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
        const recipeId = action.meta?.arg;

        // прибираємо зі списку улюблених
        state.favoriteItems = state.favoriteItems.filter((r) => r._id !== recipeId);

        // знімаємо прапорець у currentRecipe
        if (state.currentRecipe?._id === recipeId) {
          state.currentRecipe = { ...state.currentRecipe, isFavorite: false };
        }

        // і в загальному списку
        const idx = state.items.findIndex((r) => r._id === recipeId);
        if (idx !== -1) state.items[idx] = { ...state.items[idx], isFavorite: false };

        notifySuccess("Рецепт видалено з обраного!");
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        notifyError(state.error);
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
  const favorites = getData(action.payload);
  state.favoriteItems = Array.isArray(favorites) ? favorites : [];
})
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        notifyError(state.error);
      })
      .addCase(fetchAddRecipesToFavorite.pending, (state) => {
       
        state.error = null;
      })
      .addCase(fetchAddRecipesToFavorite.fulfilled, (state, action) => {
        console.log('Add to favorites payload:', action.payload);
        
        const recipeId = action.meta.arg;
        
        const recipe = state.items.find(r => r._id === recipeId);
        
        if (recipe) {
          const favIndex = state.favoriteItems.findIndex(r => r._id === recipeId);
          if (favIndex === -1) {
            state.favoriteItems.push({ ...recipe, isFavorite: true });
          }
        
          const index = state.items.findIndex(r => r._id === recipeId);
          if (index !== -1) {
            state.items[index] = { ...state.items[index], isFavorite: true };
          }
          
          if (state.currentRecipe?._id === recipeId) {
            state.currentRecipe = { ...state.currentRecipe, isFavorite: true };
          }
        }
        
        notifySuccess("Рецепт додано до улюблених!");
      })
      .addCase(fetchAddRecipesToFavorite.rejected, (state, action) => {
        state.error = action.payload;
        notifyError(action.payload);
      })

      // =======================
      // FETCH OWN RECIPES (кабінет користувача)
      // =======================
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;

        const { recipes = [], page = 1, total = 0, limit = state.limit } = action.payload || {};

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
        state.error = action.error?.message || getErrorMessage(action.payload);
      });
  },
});

export const { clearCurrentRecipe, clearError } = recipesSlice.actions;
export default recipesSlice.reducer;