import { useSelector, useDispatch } from 'react-redux';
import css from "./FavoriteButton.module.css"
import { fetchAddRecipesToFavorite, fetchDeleteRecipesFromFavorite } from '../../../redux/recipes/operations.js';
import { selectIsLoggedIn } from '../../../redux/auth/selectors.js';
import { openModal } from '../../../redux/modal/slice.js';
import { selectIsRecipeFavorite } from '../../../redux/recipes/selectors.js';

const FavoriteButton = ({ recipeId }) => {
    
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    const isFavorite = useSelector(selectIsRecipeFavorite(recipeId));

    const handleAddToFavorites = () => {
        dispatch(fetchAddRecipesToFavorite(recipeId));
    };

    const handleRemoveFromFavorites = () => {
        dispatch(fetchDeleteRecipesFromFavorite(recipeId));
    };

    const handleClick = () => {
        if (!isLoggedIn) {
            dispatch(openModal({ type: 'login' }));
            return;
        }

        if (isFavorite) {
            handleRemoveFromFavorites();
        } else {
            handleAddToFavorites();
        }
    };

    return (
        <button onClick={handleClick} className={isFavorite ? css.favoriteButtonOn : css.favoriteButtonOff}>
            <svg className={isFavorite ? css.on : css.off}
                width="24" height="24">
                <use xlinkHref="/sprite.svg#add_recipe"></use>
            </svg>
        </button>
    );
}

export default FavoriteButton;