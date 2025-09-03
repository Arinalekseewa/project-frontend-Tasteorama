export const selectRecipes = (state) => state.recipes.items ?? [];
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesLoading = (state) => state.recipes.loading;
export const selectRecipesError = (state) => state.recipes.error;

export const selectRecipesPage = (state) => state.recipes.page ?? 1;
export const selectRecipesPerPage = (state) => state.recipes.perPage ?? 12;
export const selectRecipesTotalPages = (state) => state.recipes.totalPages ?? 1;

export const selectRecipesPagination = (state) => ({
  page: state.recipes.page ?? 1,
  perPage: state.recipes.perPage ?? 12,
  totalPages: state.recipes.totalPages ?? 1,
});

// ==== Own recipes ====
export const selectOwnRecipes = (state) => state.recipes.own?.items ?? [];
export const selectOwnTotal = (state) => state.recipes.own?.total ?? 0;
export const selectHasNextPage = (state) =>
  state.recipes.own?.hasNextPage ?? false;

// ==== Favorite recipes ====
export const selectFavoriteRecipes = (state) =>
  state.recipes.favorite?.items ?? [];
export const selectFavoriteTotal = (state) =>
  state.recipes.favorite?.total ?? 0;
export const selectFavoriteRecipesLoading = (state) => state.recipes.loading;


export const selectFavoriteRecipesError = (state) => state.recipes.error;

export const selectIsRecipeFavorite = (recipeId) => (state) => {
  const favoriteRecipes = state.recipes.favoriteItems;
  const currentRecipes = state.recipes.items;
  
  const isInFavorites = Array.isArray(favoriteRecipes) && 
    favoriteRecipes.some(recipe => recipe._id === recipeId);
  
  const recipeInItems = currentRecipes.find(recipe => recipe._id === recipeId);
  const hasIsFavoriteProperty = recipeInItems?.isFavorite === true;
  
  return isInFavorites || hasIsFavoriteProperty;
};

export const selectFavoriteRecipesError = (state) => state.recipes.error;

