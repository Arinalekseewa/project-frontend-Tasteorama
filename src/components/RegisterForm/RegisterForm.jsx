import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../redux/auth/operations";
import styles from "./RegisterForm.module.css";
import { toast } from "react-toastify";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(16, "Name must be no longer than 16 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .max(128, "Email must be no longer than 128 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be no longer than 128 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // локальна перевірка confirmPassword
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      setSubmitting(false);
      return;
    }

    // бекенд приймає тільки name, email, password
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then(() => {
        resetForm();
        navigate("/auth/login"); // редірект після успішної реєстрації
      })
      .catch((error) => {
        // детальна обробка помилок
        if (error?.status === 409 || error?.message?.includes("Conflict")) {
          toast.error(
            "A user with this email already exists. Please login or use another email."
          );
        } else if (error?.status === 400) {
          toast.error("Invalid data. Please check the form.");
        } else {
          toast.error(
            error?.message || "Registration failed. Please try again."
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">Enter your name</label>
              <Field
                type="text"
                name="name"
                placeholder="Max"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Enter your email address</label>
              <Field
                type="email"
                name="email"
                placeholder="email@gmail.com"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Create a password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="*********"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.error}
              />
            </div>
            <label className={styles.containerCheckbox}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.customCheckbox}>
                <svg className={styles.checkIcon} width="16" height="16">
                  <use href="/public/sprite.svg#checkbox_icon" />
                </svg>
              </span>
              <span className={styles.labelText}>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Create account"}
            </button>

            <p className={styles.registerText}>
              Already have an account?{" "}
              <Link to="/auth/login" className={styles.registerLink}>
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
