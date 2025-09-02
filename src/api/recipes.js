import { api } from "./api.js";

export async function fetchRecipes({
  page = 1,
  limit = 12,
  query,
  category,
} = {}) {
  const base = import.meta.env.VITE_API_URL || "";
  const url = new URL("/recipes", base);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (query) url.searchParams.set("query", query);
  if (category) url.searchParams.set("category", category);

  const response = await api.get(url.toString());
  return response.data;
}

// Отримати рецепт за ID
export const getRecipeByIdAPI = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

// Додати в обране
export const addFavoriteAPI = async (id) => {
  const response = await api.post(`/recipes/favorites/${id}`);
  return response.data;
};

// Видалити з обраного
export const removeFavoriteAPI = async (id) => {
  const response = await api.delete(`/recipes/favorites/${id}`);
  return response.data;
};
