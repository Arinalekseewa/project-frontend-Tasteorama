import styles from './Footer.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import AuthModal from '../AuthModal/AuthModal';
import iconSprite from '../../../public/sprite.svg';

export default function Footer() {
  const loggedIn = useSelector(state =>
    Boolean(state?.auth?.isLoggedIn ?? state?.auth?.IsLoggedIn)
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthPage =
    location.pathname.includes('auth/login') ||
    location.pathname.includes('auth/register');

  const handleClick = e => {
    if (!loggedIn) {
      e.preventDefault();
      dispatch(openModal({ type: 'auth' }));
    }
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Link to="/" className={styles.footerHomeLink}>
            <svg className={styles.footerIcon} width={32} height={30}>
              <use href={`${iconSprite}#logo_icon`}></use>
            </svg>
            <span className={styles.logoSpan}>Tasteorama</span>
          </Link>
          <p className={styles.footerText}>
            &copy; 2025 CookingCompanion. All rights reserved.
          </p>
          <nav className={styles.footerNav}>
            <Link className={styles.links} to="/recipes">
              Recipes
            </Link>
            {!isAuthPage && (
              <Link
                className={styles.links}
                to="/recipes/own"
                onClick={handleClick}
              >
                Account
              </Link>
            )}
          </nav>
        </div>
      </footer>
      {!loggedIn && !isAuthPage && <AuthModal />}
    </>
  );
}
