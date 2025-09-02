import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddRecipePage.module.css";
import { createRecipe } from "../../api/api";
import { fetchOwnRecipes } from "../../redux/recipes/operations.js";
import {
  selectCategories,
  selectIngredients,
} from "../../redux/filters/selectors.js";

const AddRecipePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookingTime: 10,
    calories: 150,
    category: "Soup",
    photo: null,
    ingredients: [],
    instructions: "",
  });

  const [selectedIngredient, setSelectedIngredient] = useState({
    name: "Broccoli",
    amount: "100g",
  });

  const [headerText, setHeaderText] = useState("Name:");
  const [secondHeaderText, setSecondHeaderText] = useState("Amount:");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (field, value) => {
    setSelectedIngredient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addIngredient = () => {
    if (selectedIngredient.name && selectedIngredient.amount) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...selectedIngredient }],
      }));
      setSelectedIngredient({ name: "Broccoli", amount: "100g" });
      setHeaderText("Amount:");
      setSecondHeaderText("");
    }
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Здесь будет логика отправки данных на сервер

    // После успешной отправки перенаправляем на главную страницу
    // или на страницу с рецептами
    navigate("/");

    // Альтернативно можно перенаправить на страницу с рецептами:
    // navigate("/recipes");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Add Recipe</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            <div className={styles.mainContent}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>General Information</h2>

                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={styles.inputRecipe}
                    placeholder="Enter the name of your recipe"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>
                    Recipe Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.textareaRecipe}
                    placeholder="Enter a brief description of your recipe"
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cookingTime" className={styles.label}>
                    Cooking time in minutes
                  </label>
                  <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                    className={styles.inputMinutes}
                    min="1"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroupr + styles.caloriesGroup}>
                    <label htmlFor="calories" className={styles.label}>
                      Calories
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      value={formData.calories}
                      onChange={handleInputChange}
                      className={styles.inputCalories}
                      min="0"
                    />
                  </div>
                  <div className={styles.formGroup + styles.caloriesGroup}>
                    <label htmlFor="category" className={styles.label}>
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={styles.selectCategory}
                    >
                      <option value="Soup">Soup</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Salad">Salad</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Ingredients</h2>

                <div className={styles.ingredientSelector}>
                  <div className={styles.ingredientInputs}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Name</label>
                      <select
                        value={selectedIngredient.name}
                        onChange={(e) =>
                          handleIngredientChange("name", e.target.value)
                        }
                        className={styles.selectName}
                      >
                        <option value="Broccoli">Broccoli</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Rice">Rice</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Onion">Onion</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Amount</label>
                      <input
                        type="text"
                        value={selectedIngredient.amount}
                        onChange={(e) =>
                          handleIngredientChange("amount", e.target.value)
                        }
                        className={styles.inputAmount}
                        placeholder="100g"
                      />
                      <button
                        type="button"
                        onClick={addIngredient}
                        className={styles.addIngredientBtn}
                      >
                        Add new ingredient
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.ingredientsTable}>
                  <div className={styles.tableHeaders}>
                    <div className={styles.headerName}>{headerText}</div>
                    <div className={styles.headerAmount}>
                      {secondHeaderText}
                    </div>
                  </div>

                  {formData.ingredients.length > 0 && (
                    <div className={styles.tableRows}>
                      {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className={styles.tableRow}>
                          <div className={styles.cellName}>
                            {ingredient.name}
                          </div>
                          <div className={styles.cellAmount}>
                            {ingredient.amount}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className={styles.deleteBtn}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.formSection + styles.instructionsGroup}>
                <h2 className={styles.sectionTitleInstructions}>
                  Instructions
                </h2>
                <div className={styles.formGroup + styles.instructionsGroup}>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    className={styles.textareaInstructions}
                    placeholder="Enter a text"
                    rows="6"
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  Publish Recipe
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className={styles.photoSection}>
              <h2 className={styles.sectionTitlePhoto}>Upload Photo</h2>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.fileInput}
              />
              <label htmlFor="photo" className={styles.photoUpload}>
                <svg
                  width="99"
                  height="82"
                  viewBox="0 0 99 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M67.9741 47.2115C67.9741 55.7879 59.703 62.7404 49.5001 62.7404C39.2972 62.7404 31.0261 55.7879 31.0261 47.2115C31.0261 38.6352 39.2972 31.6827 49.5001 31.6827C59.703 31.6827 67.9741 38.6352 67.9741 47.2115Z"
                    stroke="#070707"
                  />
                  <path
                    d="M1.46777 68.625L1.46778 30.7764C1.46778 24.4158 7.60195 19.2596 15.1688 19.2596C20.3584 19.2596 25.1026 16.7949 27.4234 12.8932L30.5286 7.67302C33.0979 3.35351 38.3501 0.624982 44.0954 0.625L54.9049 0.625035C60.6502 0.625053 65.9023 3.35359 68.4716 7.67307L71.5768 12.8933C73.8976 16.7951 78.6418 19.2597 83.8314 19.2597C91.3983 19.2597 97.5324 24.4159 97.5324 30.7765V68.625C97.5324 75.6666 90.7414 81.375 82.3643 81.375H16.6359C8.25876 81.375 1.46777 75.6666 1.46777 68.625Z"
                    stroke="#070707"
                  />
                </svg>
                {formData.photo && (
                  <div className={styles.photoPreview}>
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Recipe preview"
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
