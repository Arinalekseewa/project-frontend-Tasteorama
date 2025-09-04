import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import css from "./FavoriteButtonFull.module.css";
import { useFavorite } from "../../hooks/useFavorite";

const FavoriteButtonFull = ({ recipeId }) => {
  const { isFavorite, toggleFavorite } = useFavorite(recipeId);

  return (
    <button onClick={toggleFavorite} className={css.saveBtn}>
      {isFavorite ? (
        <>
          <span className={css.label}>Unsave</span>
          <FaBookmark className={css.iconActive} />
        </>
      ) : (
        <>
          <span className={css.label}>Save</span>
          <FaRegBookmark className={css.icon} />
        </>
      )}
    </button>
  );
};

export default FavoriteButtonFull;
