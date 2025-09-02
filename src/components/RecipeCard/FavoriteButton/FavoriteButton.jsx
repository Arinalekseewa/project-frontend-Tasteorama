import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./FavoriteButton.module.css";
import { selectIsLoggedIn } from "../../../redux/auth/selectors.js";
import { openModal } from "../../../redux/modal/slice.js";
import {
  addFavorite,
  removeFavorite,
} from "../../../redux/recipes/operations.js";

const FavoriteButton = ({ recipeId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteItems = useSelector((state) => state.recipes.favoriteItems);

  // Чи вже рецепт у вибраному?
  const isFavorite = favoriteItems.some((r) => r._id === recipeId);

  const handleClick = async () => {
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

  return (
    <button
      onClick={handleClick}
      className={isFavorite ? css.favoriteButtonOn : css.favoriteButtonOff}
    >
      <svg className={isFavorite ? css.on : css.off} width="24" height="24">
        <use xlinkHref="/sprite.svg#add_recipe"></use>
      </svg>
    </button>
  );
};

export default FavoriteButton;
