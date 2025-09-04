import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import styles from './AddRecipePage.module.css';

import {
  fetchCategories,
  fetchIngredients,
} from '../../redux/filters/operations.js';
import {
  selectCategories,
  selectIngredients,
} from '../../redux/filters/selectors.js';
import { createRecipe } from '../../redux/recipes/operations.js';
import { Toaster } from 'react-hot-toast';
import iconSprite from '../../../public/sprite.svg';

const initialValues = {
  title: '',
  description: '',
  cookingTime: '',
  calories: '',
  category: '',
  photo: null,
  ingredients: [],
  instructions: '',
  selectedIngredient: null,
  selectedAmount: '',
};

const feedbackSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Recipe title must be at least 2 characters')
    .max(64, 'Recipe title must be at most 64 characters')
    .required('Recipe title is required'),
  description: Yup.string().max(200).required('Description is required'),
  cookingTime: Yup.number()
    .typeError('Must be a number')
    .min(1)
    .max(360)
    .required('Cooking time in minutes is required'),
  calories: Yup.number().min(0).max(10000).notRequired(),
  category: Yup.string().required('Category is required'),
  instructions: Yup.string().max(1200).required('Instructions are required'),
  ingredients: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required(),
        amount: Yup.string().required('Ingredients are required'),
      })
    )
    .min(1, 'Add at least one ingredient'),
  photo: Yup.mixed().notRequired(),
});

export default function AddRecipePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const [headerText] = useState('Name:');
  const [secondHeaderText] = useState('Amount:');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const categoryOptions = useMemo(
    () =>
      categories.map(category => ({
        value: category.name,
        label: category.name,
      })),
    [categories]
  );

  const ingredientOptions = useMemo(
    () =>
      ingredients.map(ingredient => ({
        value: ingredient.name,
        label: ingredient.name,
      })),
    [ingredients]
  );

  const addIngredient = (values, setFieldValue) => {
    const selectedIngredient = values.selectedIngredient;
    const amount = values.selectedAmount.trim();
    if (!selectedIngredient || !amount) return;

    if (
      values.ingredients.some(
        x => x.name.toLowerCase() === selectedIngredient.label.toLowerCase()
      )
    )
      return;

    setFieldValue('ingredients', [
      ...values.ingredients,
      { name: selectedIngredient.label, amount },
    ]);
    setFieldValue('selectedIngredient', null);
    setFieldValue('selectedAmount', '');
  };

  const removeIngredient = (name, values, setFieldValue) => {
    setFieldValue(
      'ingredients',
      values.ingredients.filter(ingredient => ingredient.name !== name)
    );
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePhotoChange = (e, setFieldValue) => {
    const file = e.currentTarget.files?.[0] || null;
    setFieldValue('photo', file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl]
  );

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form values:', values);
      const form = new FormData();
      form.append('title', values.title.trim());
      form.append('category', values.category);
      form.append('area', 'DefaultArea');
      form.append('instructions', values.instructions.trim());
      form.append('description', values.description.trim());
      form.append('time', values.cookingTime);
      console.log(form);
      if (values.calories) form.append('cals', values.calories);

      const toNumber = v => {
        const n = parseFloat(String(v).replace(',', '.'));
        return Number.isFinite(n) ? n : null;
      };

      const ingredientsPayload = values.ingredients.map(ing => ({
        ingredient: ing.name,
        ingredientAmount: toNumber(ing.amount),
      }));
      form.append('ingredients', JSON.stringify(ingredientsPayload));
      if (values.photo) form.append('thumb', values.photo);
    
      const created = await dispatch(createRecipe(form)).unwrap();
      const id =
        created?.data?._id || created?.data?.id || created?._id || created?.id;
      console.log('Recipe created successfully ✅');
      resetForm();
      navigate(id ? `/recipes/${id}` : '/recipes');
    } catch (e) {
      console.log('Failed to create recipe');
    } finally {
      setSubmitting(false);
    }
  };

  const initialCategory = categoryOptions[0]?.value ?? '';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Add Recipe</h1>

        <Formik
          initialValues={{ ...initialValues, category: initialCategory }}
          validationSchema={feedbackSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form
              className={styles.form}
              //               onKeyDown={e => {
              //   if (e.key === 'Enter') {
              //     e.preventDefault();
              //     submitForm();
              //   }
              // }}
            >
              <div className={styles.formContent}>
                <div className={styles.mainContent}>
                  <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>General Information</h2>

                    <div className={styles.formGroup}>
                      <label htmlFor="title" className={styles.label}>
                        Recipe Title
                      </label>
                      <Field
                        id="title"
                        name="title"
                        className={styles.inputRecipe}
                        placeholder="Enter the name of your recipe"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className={styles.error}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="description" className={styles.label}>
                        Recipe Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        rows="3"
                        className={styles.textareaRecipe}
                        placeholder="Short description"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className={styles.error}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="cookingTime" className={styles.label}>
                        Cooking time in minutes
                      </label>
                      <Field
                        type="number"
                        id="cookingTime"
                        name="cookingTime"
                        min="1"
                        placeholder="10"
                        className={styles.inputMinutes}
                      />
                      <ErrorMessage
                        name="cookingTime"
                        component="div"
                        className={styles.error}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div
                        className={`${styles.formGroup} ${styles.caloriesGroup}`}
                      >
                        <label htmlFor="calories" className={styles.label}>
                          Calories
                        </label>
                        <Field
                          type="number"
                          id="calories"
                          name="calories"
                          min="0"
                          placeholder="0"
                          className={styles.inputCalories}
                        />
                        <ErrorMessage
                          name="calories"
                          component="div"
                          className={styles.error}
                        />
                      </div>

                      <div
                        className={`${styles.formGroup} ${styles.caloriesGroup}`}
                      >
                        <label className={styles.label}>Category</label>
                        <Select
                          className={styles.selectCategory}
                          classNamePrefix="rs"
                          options={categoryOptions}
                          isSearchable
                          value={
                            categoryOptions.find(
                              option => option.value === values.category
                            ) || null
                          }
                          onChange={option =>
                            setFieldValue('category', option?.value || '')
                          }
                          placeholder="Type to search category…"
                        />
                        <ErrorMessage
                          name="category"
                          component="div"
                          className={styles.error}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Ingredients</h2>

                    <div className={styles.ingredientSelector}>
                      <div className={styles.ingredientInputs}>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Name</label>
                          <Select
                            className={styles.selectIngredient}
                            classNamePrefix="rs"
                            options={ingredientOptions}
                            isSearchable
                            value={values.selectedIngredient}
                            onChange={opt =>
                              setFieldValue('selectedIngredient', opt)
                            }
                            placeholder="Type to search ingredient…"
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.label}>Amount</label>
                          <Field
                            type="text"
                            name="selectedAmount"
                            className={styles.inputAmount}
                            placeholder="100 g"
                          />
                          <button
                            type="button"
                            onClick={() => addIngredient(values, setFieldValue)}
                            className={styles.addIngredientBtn}
                          >
                            Add ingredient
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

                      {values.ingredients.length > 0 && (
                        <div className={styles.tableRows}>
                          {values.ingredients.map(ingredient => (
                            <div
                              key={ingredient.name}
                              className={styles.tableRow}
                            >
                              <div className={styles.cellName}>
                                {ingredient.name}
                              </div>
                              <div className={styles.cellAmount}>
                                {ingredient.amount}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeIngredient(
                                    ingredient.name,
                                    values,
                                    setFieldValue
                                  )
                                }
                                className={styles.deleteBtn}
                                aria-label={`Remove ${ingredient.name}`}
                              >
                                <svg
                                  className={styles.icon}
                                  width={24}
                                  height={24}
                                >
                                  <use href={`${iconSprite}#delete_icon`}></use>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <ErrorMessage
                      name="ingredients"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formSection}>
                    <h2 className={styles.sectionTitleInstructions}>
                      Instructions
                    </h2>
                    <div className={styles.formGroup}>
                      <Field
                        as="textarea"
                        name="instructions"
                        rows="6"
                        className={styles.textareaInstructions}
                        placeholder="Enter a text"
                      />
                      <ErrorMessage
                        name="instructions"
                        component="div"
                        className={styles.error}
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
                  <label htmlFor="photo" className={styles.photoUpload}>
                    {values.photo ? (
                      <img
                        src={URL.createObjectURL(values.photo)}
                        alt="Recipe preview"
                        className={styles.photoFill}
                      />
                    ) : (
                      <svg className={styles.deleteIcon} width={96} height={82}>
                        <use href={`${iconSprite}#photo_icon`}></use>
                      </svg>
                    )}
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={e => handlePhotoChange(e, setFieldValue)}
                    className={styles.fileInput}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster
        position="bottom-right"
        duration={5000}
        toastOptions={{
          style: {
            border: '2px solid #d21313',
            padding: '18px',
            color: 'rgb(26, 30, 32)',
            background: '#f5c0bb',
            fontSize: '18px',
          },
        }}
      />
    </div>
  );
}
