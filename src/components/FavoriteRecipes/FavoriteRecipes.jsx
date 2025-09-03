import RecipeList from "../RecipeList/RecipeList.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteRecipes } from "../../redux/recipes/operations.js";
import {
  selectFavoriteRecipes,
  selectFavoriteTotal,
  selectFavoriteRecipesLoading,
} from "../../redux/recipes/selectors.js";
import { useEffect, useRef, useState } from "react";
import s from "./FavoriteRecipes.module.css";
import Loader from "../Loader/Loader.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import NotFound from "../NotFound/NotFound.jsx"

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const totalSavedRecipes = useSelector(selectFavoriteTotal);
  const isLoading = useSelector(selectFavoriteRecipesLoading);
  const [page, setPage] = useState(1);

  const RECIPES_PER_PAGE = 12;
  const sectionRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFavoriteRecipes({ page, limit: RECIPES_PER_PAGE }));
  }, [page, dispatch]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleRemove = (id) => {
    dispatch(fetchFavoriteRecipes(id)).then(() => {
      dispatch(fetchFavoriteRecipes({ page: 1, limit: RECIPES_PER_PAGE }));
      setPage(1);
    });
  };

  const hasNextPage = recipes.length < totalSavedRecipes;

  return (
    <>
      <div ref={sectionRef}>
        {recipes.length > 0 && (
          <p className={s.totalItems}>{`${totalSavedRecipes} recipes`}</p>
        )}
      </div>

      {isLoading && <Loader />}

      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} type="favorites" onRemove={handleRemove} />
      ) : (
        !isLoading && <NotFound message="You have no saved recipes yet." />
      )}

      {hasNextPage && <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />}

      {recipes.length > 0 && !isLoading && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalSavedRecipes / RECIPES_PER_PAGE)}
          onPageChange={setPage}
        />
      )}
    </>
  );
}

