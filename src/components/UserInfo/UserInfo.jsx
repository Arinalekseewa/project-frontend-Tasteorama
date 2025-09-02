import styles from './UserInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors.js';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../../redux/auth/operations.js';

export default function UserInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const user = useSelector(selectAuthUser);
  const name = user?.name || 'Guest';
  const avatarLetter = name[0]?.toUpperCase() || '?';

  return (
    <div className={styles.container}>
      <span className={styles.avatar}>{avatarLetter}</span>
      <span className={styles.username}>{name}</span>
    </div>
  );
}