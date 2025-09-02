import styles from './AuthModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modal/slice';
import { selectModal } from '../../redux/modal/selectors';
import iconSprite from '../../../public/sprite.svg';

export default function AuthModal() {
  const { isModalOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeModal());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = e => e.key === 'Escape' && dispatch(closeModal());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleLogIn = () => {
    dispatch(closeModal());
    navigate('/auth/login');
  };

  const handleRegister = () => {
    dispatch(closeModal());
    navigate('/auth/register');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          className={styles.modalCloseBtn}
          type="button"
          onClick={onClose}
        >
          <svg className={styles.modalIcon} width={24} height={24}>
            <use href={`${iconSprite}#close_icon`}></use>
          </svg>
        </button>
        <h2 className={styles.modalTitle}>Interaction Error </h2>
        <p className={styles.modalText}>
          To do any action, you need to <br /> authorize first
        </p>
        <div className={styles.btnsWrapper}>
          <button
            className={styles.modalLogInBtn}
            type="button"
            onClick={handleLogIn}
          >
            Log in
          </button>
          <button
            className={styles.modalRegisterBtn}
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
