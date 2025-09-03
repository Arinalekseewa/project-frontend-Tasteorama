import { NavLink } from 'react-router-dom';
import LogoutBtn from '../LogoutButton/LogoutButton';
import styles from './Navigation.module.css';
import UserInfo from '../UserInfo/UserInfo';

export default function Navigation({ isLoggedIn }) {
  return (
    <nav className={styles.desktopMenu}>
      <NavLink
        to="/"
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
      >
        Recipes
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Log in
          </NavLink>
          <NavLink to="/auth/register" className={styles.registerBtn}>
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/recipes/own"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            My Profile
          </NavLink>
          <NavLink to="/add-recipe" className={styles.registerBtn}>
            Add Recipe
          </NavLink>
          <div className={styles.userSection}>
            <UserInfo />
            <LogoutBtn />
          </div>
        </>
      )}
    </nav>
  );
}
