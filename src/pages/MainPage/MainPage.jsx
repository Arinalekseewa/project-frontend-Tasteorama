import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeList from "../../components/RecipeList/RecipeList";
import Filters from "../../components/Filters/Filters.jsx";
import FiltersModal from "../../components/FiltersModal/FiltersModal.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import { toast } from "react-toastify";
import styles from "./MainPage.module.css";
import { fetchRecipes } from "../../redux/recipes/operations.js";
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesLoading,
  selectTotalRecipes,
} from "../../redux/recipes/selectors.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import { selectFiltersError } from "../../redux/filters/selectors.js";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations.js";

const RECIPES_PER_PAGE = 12;

export default function MainPage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const recipesLoading = useSelector(selectRecipesLoading);
  const recipesError = useSelector(selectRecipesError);
  const filtersError = useSelector(selectFiltersError);
  const totalRecipes = useSelector(selectTotalRecipes);

  const [currentFilters, setCurrentFilters] = useState({
    category: "",
    ingredient: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const openFiltersModal = () => setIsFiltersModalOpen(true);
  const closeFiltersModal = () => setIsFiltersModalOpen(false);

  const handleApplyFilters = ({ category, ingredient }) => {
    setCurrentFilters({ category, ingredient });
    setPage(1);
  };

  const handleResetAndCloseFilters = () => {
    setCurrentFilters({ category: "", ingredient: "" });
    setSearchQuery("");
    setPage(1);
    closeFiltersModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const loadRecipes = useCallback(() => {
    dispatch(
      fetchRecipes({
        category: currentFilters.category,
        ingredient: currentFilters.ingredient,
        search: searchQuery,
        page,
        limit: RECIPES_PER_PAGE,
      })
    );
  }, [
    dispatch,
    currentFilters.category,
    currentFilters.ingredient,
    searchQuery,
    page,
  ]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  useEffect(() => {
    if (recipesError) {
      toast.error(
        `Error loading recipes: ${recipesError.message || "Unknown error"}`,
        {
          position: "top-right",
        }
      );
    }
  }, [recipesError]);

  useEffect(() => {
    if (filtersError) {
      toast.error(
        `Error loading filters: ${filtersError.message || "Unknown error"}`,
        {
          position: "top-right",
        }
      );
    }
  }, [filtersError]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <div className={styles.mainPageContainer}>
        <Hero onSearch={handleSearch} searchQuery={searchQuery} />

        {searchQuery ? (
          <h1
            className={styles.pageTitle}
          >{`Search Results for “${searchQuery}”`}</h1>
        ) : (
          <h1 className={styles.pageTitle}>Recipes</h1>
        )}

        <div className={styles.filtersAndCountWrapper}>
          {!recipesLoading && !recipesError && (
            <>
              {totalRecipes > 0 ? (
                <p className={styles.recipeCount}>
                  {totalRecipes} {totalRecipes === 1 ? "recipe" : "recipes"}
                </p>
              ) : (
                <p>Sorry, no recipes match your search.</p>
              )}
            </>
          )}
          <Filters
            onApplyFilters={handleApplyFilters}
            currentFilters={currentFilters}
            onResetAndCloseFilters={handleResetAndCloseFilters}
            openFiltersModal={openFiltersModal}
          />
        </div>

        <FiltersModal
          isOpen={isFiltersModalOpen}
          onClose={closeFiltersModal}
          onApplyFilters={handleApplyFilters}
          currentFilters={currentFilters}
          onResetAndCloseFilters={handleResetAndCloseFilters}
        />

        <RecipeList recipes={recipes} />

        <LoadMoreBtn
          onClick={() => setPage((prev) => prev + 1)}
          isLoading={recipesLoading}
          hidden={recipes.length >= totalRecipes}
        />
      </div>
    </section>
  );
}
