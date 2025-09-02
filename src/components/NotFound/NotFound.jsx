import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import notFoundImg from '../../assets/img/default-recipe.webp';
import iconSprite from '../../../public/sprite.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <img src={notFoundImg} alt="Not found" className={styles.image} />
      <img src={notFoundImg} alt="Not found" className={styles.image} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Recipe not found</p>
      <button className={styles.button} onClick={handleBackHome}>
        <svg className={styles.icon} height={24} width={24}>
          <use href={`${iconSprite}#back_arrow_icon`}></use>
        </svg>
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
