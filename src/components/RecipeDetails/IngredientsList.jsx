import { useSelector } from "react-redux";
import styles from "./IngredientsList.module.css";
import { selectIngredients } from "../../redux/filters/selectors";


export default function IngredientsList({ ingredients }) {
  const allIngredients = useSelector(selectIngredients);

  if (!ingredients || ingredients.length === 0) {
    return <p className={styles.empty}>No ingredients available</p>;
  }

  return (
    <ul className={styles.list}>
      {ingredients.map((item, index) => {
        const ing = allIngredients.find((el) => el._id === item.id);

        return (
          <li key={index} className={styles.item}>
            {ing ? ing.name : "Unknown ingredient"} — {item.measure}
          </li>
        );
      })}
    </ul>
  );
}
