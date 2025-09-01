import { api } from './api.js';

export async function fetchRecipes({ page = 1, limit = 12, query, category } = {}) {
  const base = import.meta.env.VITE_API_URL || ''; 
  const url = new URL('/recipes', base);       
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);
  if (query) url.searchParams.set('query', query);
  if (category) url.searchParams.set('category', category);

export const getRecipeByIdAPI = async id => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const addFavoriteAPI = async id => {
  const response = await api.post(`/recipes/favorites/${id}`);
  return response.data;
};

export const removeFavoriteAPI = async id => {
  const response = await api.delete(`/recipes/favorites/${id}`);
  return response.data;
};