import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { openModal } from "../redux/modal/slice.js";
import { addFavorite, removeFavorite } from "../redux/recipes/operations.js";

export const useFavorite = (recipeId) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteItems = useSelector((state) => state.recipes.favoriteItems);

  // Чи вже рецепт у вибраному?
  const isFavorite = favoriteItems.some((r) => r._id === recipeId);

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      dispatch(openModal({ type: "login" }));
      return;
    }

    if (isFavorite) {
      await dispatch(removeFavorite(recipeId));
    } else {
      await dispatch(addFavorite(recipeId));
    }
  };

  return { isFavorite, toggleFavorite };
};
