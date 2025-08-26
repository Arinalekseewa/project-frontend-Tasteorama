import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { registerThunk } from "../../redux/auth/operations";

function RegisterForm() {
  //   const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(16, "Максимум 16 символів")
      .required("Ім’я є обов’язковим"),
    email: Yup.string()
      .email("Невірний формат email")
      .max(128, "Максимум 128 символів")
      .required("Email є обов’язковим"),
    password: Yup.string()
      .min(8, "Пароль має містити мінімум 8 символів")
      .max(128, "Максимум 128 символів")
      .required("Пароль є обов’язковим"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролі не співпадають")
      .required("Підтвердження пароля є обов’язковим"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
  };

  //   const handleSubmit = (values) => {
  //     dispatch(registerThunk(values));
  //   };

  return (
    <div>
      <div>
        <h2>Register</h2>
        <p>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations
        </p>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          //   onSubmit={handleSubmit}
        >
          <Form>
            <fieldset>
              <label className="label">Enter your email address</label>
              <Field
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="span" />
              <label className="label">Enter your name</label>
              <Field
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <ErrorMessage name="name" component="span" />
              <label className="label">Create a strong password</label>
              <Field
                name="password"
                type="password"
                className="input"
                placeholder="*********"
              />
              <label className="label">Repeat your password</label>
              <Field
                name="password"
                type="password"
                className="input"
                placeholder="*********"
              />
              <ErrorMessage name="password" component="span" />
              <button type="submit">Register</button>
              {/* <Link to="/login">You already have an account? Sign in!</Link>
              <Link to="/">Back to Home</Link> */}
            </fieldset>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
