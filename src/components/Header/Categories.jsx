// import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Categories = () => {
//   return (
//     <div className="drawer  w-[7.3rem]">
//       <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         {/* Page content here */}
//         <label htmlFor="my-drawer" className="btn  drawer-button">
//           <GiHamburgerMenu />
//           <span>Category</span>
//         </label>
//       </div>
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu menu-horizontal bg-base-200 text-base-content min-h-full w-80 p-4">
//           {/* Sidebar content here */}
//           <li>
//             <ul className="menu bg-base-200 rounded-box w-56">
//               <li>
//                 <details open>
//                   <summary>Parent</summary>
//                   <ul>
//                     <li>
//                       <a>Submenu 1</a>
//                     </li>
//                     <li>
//                       <a>Submenu 2</a>
//                     </li>
//                   </ul>
//                 </details>
//               </li>
//               <li>
//                 <details open>
//                   <summary>Parent</summary>
//                   <ul>
//                     <li>
//                       <a>Submenu 1</a>
//                     </li>
//                     <li>
//                       <a>Submenu 2</a>
//                     </li>
//                   </ul>
//                 </details>
//               </li>
//               <li>
//                 <details open>
//                   <summary>Parent</summary>
//                   <ul>
//                     <li>
//                       <a>Submenu 1</a>
//                     </li>
//                     <li>
//                       <a>Submenu 2</a>
//                     </li>
//                   </ul>
//                 </details>
//               </li>
//               <li>
//                 <details open>
//                   <summary>Parent</summary>
//                   <ul>
//                     <li>
//                       <a>Submenu 1</a>
//                     </li>
//                     <li>
//                       <a>Submenu 2</a>
//                     </li>
//                   </ul>
//                 </details>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Categories;

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import allCategory from "./CategoryMenuData";
import Link from "next/link";

const Categories = () => {
  return (
    <div className="drawer  w-[7.3rem]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn  drawer-button">
          <GiHamburgerMenu />
          <span>Category</span>
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-horizontal bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <ul className="menu bg-base-200 rounded-box w-56">
              {allCategory.map((mapProp) => (
                <li key={mapProp.id}>
                  <details open>
                    <summary>{mapProp.name}</summary>
                    <ul>
                      {mapProp?.category?.map((categoryProp) => (
                        <li key={categoryProp.id}>
                          <Link href={`/category/${categoryProp.category}`}>
                            <span>{categoryProp?.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
