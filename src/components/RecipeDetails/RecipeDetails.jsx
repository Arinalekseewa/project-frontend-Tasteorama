// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./RecipeDetails.module.css";
import IngredientsList from "./IngredientsList";
import StepsList from "./StepsList";
import FavoriteButton from "../RecipeCard/FavoriteButton/FavoriteButton.jsx";

export default function RecipeDetails({ recipe }) {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  // if (!recipe) return null;
  const ingredients = [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.blockwrapper}>
        {/* Заголовок */}
        <h1 className={styles.title}>{recipe.title}</h1>

        {/* Зображення страви */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageBackground}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <div className={styles.desctopinfo}>
        {/* Загальна інформація */}
        <div className={styles.metaRow}>
          <section className={styles.infoBox}>
            <h2 className={styles.subtitle}>General informations</h2>
            <p>
              <b>Category:</b> {recipe.category}
            </p>
            <p>
              <b>Cooking time:</b> {recipe.time}
            </p>
            <p>
              <b>Calories:</b> {recipe.calories}
            </p>
          </section>
          {/* Save / Unsave */}
          <FavoriteButton recipeId={recipe._id} /> {/* інтегрована кнопка */}
        </div>

        {/* Опис */}
        <div className={styles.infocomtainer}>
          <section>
            <h2 className={styles.subtitle}>About recipe</h2>
            <p>{recipe.description}</p>
          </section>

          {/* Інгредієнти */}
          <section>
            <h2 className={styles.subtitle}>Ingredients</h2>
            <IngredientsList ingredients={recipe.ingredients} />
          </section>

          {/* Кроки приготування */}
          <section>
            <h2 className={styles.subtitle}>Preparation Steps</h2>
            <StepsList steps={recipe.instructions} />
          </section>
        </div>
      </div>
    </div>
  );
}
