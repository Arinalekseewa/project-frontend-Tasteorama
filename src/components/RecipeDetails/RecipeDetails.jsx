import styles from "./RecipeDetails.module.css";
import IngredientsList from "./IngredientsList";
import StepsList from "./StepsList";
import FavoriteButtonFull from "./FavoriteButtonFull.jsx";

export default function RecipeDetails({ recipe }) {
  if (!recipe) return null;

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
            <h3 className={styles.unsubtitle}>General informations</h3>
            <div className={styles.infoBoxItem}>
              <p>
                <b>Category:</b> {recipe.category}
              </p>
              <p>
                <b>Cooking time:</b> {recipe.time}
              </p>
              <p>
                <b>Calories:</b> {recipe.calories}
              </p>
            </div>
          </section>
          {/* Save / Unsave */}
          <FavoriteButtonFull recipeId={recipe._id} />
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
