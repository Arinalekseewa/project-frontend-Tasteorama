export const selectRecipes = (state) => state.recipes.items;

export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;

export const selectRecipesLoading = (state) => state.recipes.loading;

export const selectRecipesError = (state) => state.recipes.error;

export const selectRecipesPage = (state) => state.recipes.page;

export const selectRecipesPerPage = (state) => state.recipes.perPage;

export const selectRecipesTotalPages = (state) => state.recipes.totalPages;

export const selectRecipesPagination = (state) => ({
  page: state.recipes.page,
  perPage: state.recipes.perPage,
  totalPages: state.recipes.totalPages,
});

export const selectFavoriteRecipes = (state) => state.recipes.favoriteItems;

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