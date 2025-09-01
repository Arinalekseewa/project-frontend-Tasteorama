import {  lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {  useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
// import { refreshUser } from "../../redux/auth/operations.js";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("../../pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() =>
  import("../../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage"));
const RegisterPage = lazy(() => import("../../pages/AuthPage/RegisterPage"));
const NotFound = lazy(() => import("../../components/NotFound/NotFound"));

function App() {
  // const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // перевіряємо, чи є токен
  //   if (token) {
  //     dispatch(refreshUser());
  //   }
  // }, [dispatch]);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Layout />}>
          
          {/* Public routes */}
          <Route
            path="/"
            index
            element={
              <PublicRoute restricted={false}>
                <MainPage />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/recipes"
            element={
              <PublicRoute restricted={false}>
                <RecipeViewPage />
              </PublicRoute>
            }
          /> */}
          <Route
            path="/recipes/:recipeId"
            element={
              <PublicRoute restricted={false}>
                <RecipeViewPage />
              </PublicRoute>
            }
          />

          {/* Auth */}
          <Route
            path="/auth/login"
            element={
              <PublicRoute restricted={true}>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute restricted={true}>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Private routes */}
          <Route
            path="/auth/logout"
            element={
              <PrivateRoute redirectTo="/auth/login" component={<AuthPage />} />
            }
          />
          <Route
            path="/users/me"
            element={
              <PrivateRoute
                component={<ProfilePage />}
                redirectTo="/auth/login"
              />
            }
          />
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute
                component={<AddRecipePage />}
                redirectTo="/auth/login"
              />
            }
          />

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
