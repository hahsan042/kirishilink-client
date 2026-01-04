// import React, { useContext, useState } from "react";
// import {
//   FaHome,
//   FaUser,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaSeedling,
// } from "react-icons/fa";
// import { Link, NavLink } from "react-router-dom";
// import { Authcontext } from "../../context/Authcontext";

// const SideBar = () => {
//   const [open, setOpen] = useState(false);
//   const { LogOut , user} = useContext(Authcontext);

//   const handleLogout = () => {
//     LogOut()
//       .then(() => {
//         console.log("Logged out");
//         setOpen(false); // Close sidebar on mobile
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleLinkClick = () => {
//     if (open) setOpen(false); // close sidebar on mobile after clicking any link
//   };

//   return (
//     <>
//       {/* Mobile Top Bar */}
//       <div className="md:hidden fixed top-0 left-0 w-full bg-green-700 text-white flex items-center justify-between px-4 py-3 z-50 shadow">
//         <NavLink to="/" className="font-bold text-xl">
//           Krishi🌱Link
//         </NavLink>
//         <button onClick={() => setOpen(!open)}>
//           {open ? <FaTimes size={22} /> : <FaBars size={22} />}
//         </button>
//       </div>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-700 to-green-700 text-white shadow-xl z-50 transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* Sidebar Logo */}
//         <div className="p-6 text-center border-b border-white/20 mt-10 md:mt-0">
//           <NavLink to="/" className="text-xl font-bold flex items-center justify-center gap-2">
//             Krishi🌱Link
//           </NavLink>
//         </div>

//         {/* Menu */}
//         <ul className="mt-6 space-y-2 px-4">
//       <NavLink
//   to="/dashboard"
//   end
//   onClick={handleLinkClick}
//   className={({ isActive }) =>
//     `flex items-center gap-3 p-3 rounded-lg transition ${
//       isActive ? "bg-white/30" : "hover:bg-white/20"
//     }`
//   }
// >
//   <FaHome />
//   <span>Statistics</span>
// </NavLink>


//           <li>
//             <NavLink
//               to="/dashboard/addcrop"
//               onClick={handleLinkClick}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-lg transition ${
//                   isActive ? "bg-white/30" : "hover:bg-white/20"
//                 }`
//               }
//             >
//               <FaSeedling />
//               <span>Add Crop</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/myposts"
//               onClick={handleLinkClick}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-lg transition ${
//                   isActive ? "bg-white/30" : "hover:bg-white/20"
//                 }`
//               }
//             >
//               <FaUser />
//               <span>My Posts</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/dashboard/myinterests"
//               onClick={handleLinkClick}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-lg transition ${
//                   isActive ? "bg-white/30" : "hover:bg-white/20"
//                 }`
//               }
//             >
//               <FaCog />
//               <span>My Interests</span>
//             </NavLink>
//           </li>
//             <li>
//             <NavLink
//               to="/dashboard/updateprofile"
//               onClick={handleLinkClick}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-lg transition ${
//                   isActive ? "bg-white/30" : "hover:bg-white/20"
//                 }`
//               }
//             >
//               <FaCog />
//               <span> My Profile</span>
//             </NavLink>
//           </li>
//           {user && (
//   <li>
//    <Link
//               to="/dashboard/managenews"
//               onClick={handleLinkClick}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-3 rounded-lg transition ${
//                   isActive ? "bg-white/30" : "hover:bg-white/20"
//                 }`
//               }
//             >
//       + Create News
//     </Link>
//   </li>
// )}

//         </ul>

//         {/* Logout */}
//         <div className="absolute bottom-6 w-full px-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-between w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
//           >
//             <span>Logout</span>
//             <FaSignOutAlt />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideBar;


import React, { useContext, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSeedling,
  FaNewspaper,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { LogOut, user } = useContext(Authcontext);

  const handleLogout = () => {
    LogOut()
      .then(() => {
        console.log("Logged out");
        setOpen(false); // Close sidebar on mobile
      })
      .catch((err) => console.error(err));
  };

  const handleLinkClick = () => {
    if (open) setOpen(false); // Close sidebar on mobile after clicking any link
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-green-700 text-white flex items-center justify-between px-4 py-3 z-50 shadow">
        <NavLink to="/" className="font-bold text-xl">
          Krishi🌱Link
        </NavLink>
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-700 to-green-700 text-white shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Logo */}
        <div className="p-6 text-center border-b border-white/20 mt-10 md:mt-0">
          <NavLink
            to="/"
            className="text-xl font-bold flex items-center justify-center gap-2"
          >
            Krishi🌱Link
          </NavLink>
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2 px-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-white/30" : "hover:bg-white/20"
                }`
              }
            >
              <FaHome />
              <span>Statistics</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/addcrop"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-white/30" : "hover:bg-white/20"
                }`
              }
            >
              <FaSeedling />
              <span>Add Crop</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myposts"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-white/30" : "hover:bg-white/20"
                }`
              }
            >
              <FaUser />
              <span>My Posts</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myinterests"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-white/30" : "hover:bg-white/20"
                }`
              }
            >
              <FaCog />
              <span>My Interests</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/updateprofile"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? "bg-white/30" : "hover:bg-white/20"
                }`
              }
            >
              <FaCog />
              <span>My Profile</span>
            </NavLink>
          </li>

          {/* Conditional user menu */}
          {user && (
            <li>
              <NavLink
                to="/dashboard/managenews"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive ? "bg-white/30" : "hover:bg-white/20"
                  }`
                }
              >
                <FaNewspaper />
                <span>Create News</span>
              </NavLink>
            </li>
          )}
        </ul>

        {/* Logout */}
        <div className="absolute bottom-6 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
