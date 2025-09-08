import { Outlet } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My profile</h2>
      <ProfileNavigation />
      <Outlet />
    </div>
  );
}
