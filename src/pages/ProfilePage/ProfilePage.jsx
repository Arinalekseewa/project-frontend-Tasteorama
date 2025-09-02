import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";

import RecipeList from "../../components/RecipeList/RecipeList";

import s from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <div className={s.wrapper}>
      <aside className={s.sidebar}>
        <ProfileNavigation />
      </aside>
      <main className={s.content}>
        <RecipesList />
      </main>
    </div>
  );
}
