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
<<<<<<< HEAD
  total: 0,
=======
  own: {
    items: [],
    total: 0,
    hasNextPage: false,
  },
>>>>>>> refs/remotes/origin/main
};

// const recipesSlice = createSlice({
//   name: "recipes",
//   initialState,
//   reducers: {
//     clearCurrentRecipe(state) {
//       state.currentRecipe = null;
//       state.error = null;
//     },
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // =======================
//       // FETCH ALL RECIPES
//       // =======================
//       .addCase(fetchRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.data || action.payload;

//         if (action.payload.page) {
//           state.page = action.payload.page;
//           state.perPage = action.payload.perPage;
//         }
//       })
//       .addCase(fetchRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         notifyError(action.payload);
//       })

//       // =======================
//       // FETCH RECIPE BY ID
//       // =======================
//       .addCase(fetchRecipeById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchRecipeById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentRecipe = action.payload;
//       })
//       .addCase(fetchRecipeById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         notifyError(action.payload);
//       })

//       // =======================
//       // CREATE NEW RECIPE
//       // =======================
//       .addCase(createRecipe.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createRecipe.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.unshift(action.payload);
//         notifySuccess("Рецепт успішно створений!");
//       })
//       .addCase(createRecipe.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         notifyError(action.payload);
//       })

//       // =======================
//       // UPDATE FAVORITE STATUS
//       // =======================
//       .addCase(updateFavorite.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateFavorite.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedRecipe = action.payload;

//         // Оновлюємо рецепт у списку
//         const index = state.items.findIndex((r) => r._id === updatedRecipe._id);
//         if (index !== -1) {
//           state.items[index] = updatedRecipe;
//         }

//         // Оновлюємо поточний рецепт, якщо він відкритий
//         if (state.currentRecipe?._id === updatedRecipe._id) {
//           state.currentRecipe = updatedRecipe;
//         }

//         // Оновлюємо список улюблених рецептів
//         const favIndex = state.favoriteItems.findIndex(
//           (r) => r._id === updatedRecipe._id
//         );
//         if (updatedRecipe.isFavorite) {
//           if (favIndex === -1) state.favoriteItems.push(updatedRecipe);
//         } else {
//           if (favIndex !== -1) state.favoriteItems.splice(favIndex, 1);
//         }

//         notifySuccess("Статус обраного оновлено!");
//       })
//       .addCase(updateFavorite.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         notifyError(action.payload);
//       })

//       // =======================
//       // FETCH FAVORITE RECIPES
//       // =======================
//       .addCase(fetchFavoriteRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.favoriteItems = action.payload;
//       })
//       .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         notifyError(action.payload);
//       })
//       .addCase(fetchOwnRecipes.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
//         const { recipes, page, total } = action.payload;
//         state.isLoading = false;
//         state.own.total = total;
//         state.own.hasNextPage = page * 12 < total;

//         if (page === 1) {
//           // якщо перша сторінка → перезаписуємо
//           state.own.items = recipes;
//         } else {
//           // якщо load more → додаємо
//           state.own.items = [...state.own.items, ...recipes];
//         }
//       })
//       .addCase(fetchOwnRecipes.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(fetchOwnRecipes.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
//         const { recipes, page, total, limit } = action.payload;

//         state.isLoading = false;
//         state.own.total = total;
//         state.own.hasNextPage = page * limit < total;

//         if (page === 1) {
//           // перша сторінка → заміна
//           state.own.items = recipes;
//         } else {
//           // load more → додавання
//           state.own.items = [...state.own.items, ...recipes];
//         }
//       })
//       .addCase(fetchOwnRecipes.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

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
<<<<<<< HEAD

        if (action.payload.total) {
    state.total = action.payload.total;
  }
=======
>>>>>>> refs/remotes/origin/main
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
        const updatedRecipe = action.payload;
        // Оновлюємо рецепт у списку
        const index = state.items.findIndex((r) => r._id === updatedRecipe._id);
        if (index !== -1) {
          state.items[index] = updatedRecipe;
        }
        // Оновлюємо поточний рецепт
        if (state.currentRecipe?._id === updatedRecipe._id) {
          state.currentRecipe = updatedRecipe;
        }
        // Оновлюємо список улюблених
        const favIndex = state.favoriteItems.findIndex(
          (r) => r._id === updatedRecipe._id
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
