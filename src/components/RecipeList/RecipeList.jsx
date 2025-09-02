import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import { selectRecipesLoading } from "../../redux/recipes/selectors.js";
import css from "./RecipeList.module.css";
import Loader from "../Loader/Loader.jsx";

// export default function RecipeList({ recipes }) {
//    const loading = useSelector(selectRecipesLoading);

//     if (loading) return <Loader/>;

//     return (
//         <div>
//             {/* <p className={css.recipesCount}></p> */}

//             <ul className={css.recipeList}>
//                 {recipes.map((recipe) => (
//                     <li key={recipe._id} className={css.recipeListItem}>
//                         <RecipeCard recipe={recipe} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
export default function RecipeList({ recipes = [] }) {
  const loading = useSelector(selectRecipesLoading);

  if (loading) return <Loader />;

  return (
    <div>
      <ul className={css.recipeList}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={css.recipeListItem}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
