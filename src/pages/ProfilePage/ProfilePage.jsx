// import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
// import s from "./ProfilePage.module.css";
// import { Outlet } from "react-router-dom";

// export default function ProfilePage() {
//   return (
//     <div className={s.wrapper}>
//       <aside className={s.sidebar}>
//         <ProfileNavigation />
//       </aside>
//       <main className={s.content}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default function ProfilePage() {
//   return (
//     <div className={s.container}>
//       <h2 className={s.title}>My profile</h2>
//       <ProfileNavigation />
//       <Outlet />
//     </div>
//   );
// }

import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import s from "./ProfilePage.module.css";
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className={s.wrapper}>
      <aside className={s.sidebar}>
        <ProfileNavigation />
      </aside>
      <main className={s.content}>
        <Outlet />
      </main>
    </div>
  );
}
