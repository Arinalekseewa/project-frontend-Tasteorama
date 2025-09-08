import css from "./FavoriteButton.module.css";
import { useFavorite } from "../../../hooks/useFavorite";

const FavoriteButton = ({ recipeId }) => {
  const { isFavorite, toggleFavorite } = useFavorite(recipeId);

  return (
    <button
      onClick={toggleFavorite}
      className={isFavorite ? css.favoriteButtonOn : css.favoriteButtonOff}
    >
      <svg className={isFavorite ? css.on : css.off} width="24" height="24">
        <use xlinkHref="/sprite.svg#add_recipe"></use>
      </svg>
    </button>
  );
};

export default FavoriteButton;
