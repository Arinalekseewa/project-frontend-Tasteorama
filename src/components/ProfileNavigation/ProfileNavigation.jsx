// import { NavLink } from "react-router-dom";
// import s from "./ProfileNavigation.module.css";
// import React, { useState } from "react";
// import OwnRecipes from "../OwnRecipes/OwnRecipes";
// import FavoriteRecipes from "../FavoriteRecipes/FavoriteRecipes";

// export default function ProfileNavigation() {
//   const [activePage, setActivePage] = useState("My Recipes");
//   return (
//     <div className={s.container}>
//       <h2 className={s.title}>My Profile</h2>
//       <div>
//         {/* Навігація */}
//         <nav>
//           <button onClick={() => setActivePage("My Recipes")}>
//             My Recipes
//           </button>
//           <button onClick={() => setActivePage("Saved Recipes")}>
//             Saved Recipes
//           </button>
//         </nav>

//         {/* Відображення компонентів */}
//         <div>
//           {activePage === "My Recipes" && <OwnRecipes />}
//           {activePage === "Saved Recipes" && <FavoriteRecipes />}
//         </div>
//       </div>
//     </div>
//   );
// }

import { NavLink, Outlet } from "react-router-dom";
import s from "./ProfileNavigation.module.css";

export default function ProfileNavigation() {
  return (
    <div className={s.container}>
      <h2 className={s.title}>My Profile</h2>
      <nav className={s.nav}>
        <NavLink
          to="own"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          My Recipes
        </NavLink>
        <NavLink
          to="favorite"
          className={({ isActive }) => (isActive ? s.active : "")}
        >
          Saved Recipes
        </NavLink>
      </nav>

      {/* Тут підставляться OwnRecipes або FavoriteRecipes */}
    </div>
  );
}
