import { Link, NavLink } from 'react-router-dom';
import sprite from '../../../public/sprite.svg';
import styles from './BurgerModal.module.css';
import UserInfo from '../UserInfo/UserInfo';
import LogoutButton from '../LogoutButton/LogoutButton';

export default function BurgerModal({ onClose, isLoggedIn }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <Link to="/" className={styles.logo} onClick={onClose}>
              <svg className={styles.logoImg}>
                <use href={`${sprite}#logo_icon`} />
              </svg>
              <p className={styles.title}>Tasteorama</p>
            </Link>

            <button className={styles.closeBtn} onClick={onClose}>
              <svg className={styles.close}>
                <use href={`${sprite}#icon-close-with-circle`} />
              </svg>
            </button>
          </div>

          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={styles.link} onClick={onClose}>
                Recipes
              </NavLink>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className={styles.link}
                    onClick={onClose}
                  >
                    Log in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className={styles.registerButton}
                    onClick={onClose}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/recipes/own"
                    className={styles.link}
                    onClick={onClose}
                  >
                    My Profile
                  </NavLink>
                </li>
                <li className={styles.userSection}>
                  <UserInfo />
                  <LogoutButton onBurgerModalClose={onClose} />
                </li>
                <li>
                  <NavLink
                    to="/add-recipe"
                    className={styles.registerButton}
                    onClick={onClose}
                  >
                    Add Recipe
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}