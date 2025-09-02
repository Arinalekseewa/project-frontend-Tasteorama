import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeById } from "../../redux/recipes/operations";
import { clearCurrentRecipe } from "../../redux/recipes/slice";

import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import NotFound from "../../components/NotFound/NotFound";
import styles from "./RecipeViewPage.module.css";

export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const {
    currentRecipe: recipe,
    loading,
    error,
  } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }

    return () => {
      dispatch(clearCurrentRecipe());
    };
  }, [dispatch, recipeId]);

  if (loading) {
    return <p className={styles.loading}>Loading recipe...</p>;
  }

  if (error) {
    return <NotFound />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className={styles.page}>
      <RecipeDetails recipe={recipe} />
    </div>
  );
}
