import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Authcontext } from "../context/Authcontext";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, LogOut } = useContext(Authcontext);

  const handleLogout = () => {
    LogOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="navbar bg-green-900 text-white font-bold shadow-sm px-4 relative">
      {/* Logo */}
      <div className="navbar-start flex items-center gap-2">
        <NavLink className="btn btn-ghost text-xl" to="/">
          Krishi🌱Link
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/allcrops">All Crops</NavLink></li>
          
          {user && (
            <>
              <li><NavLink to="/addcrop">Add Crop</NavLink></li>
              <li><NavLink to="/myposts">My Posts</NavLink></li>
              <li><NavLink to="/myinterests">My Interests</NavLink></li>
             
              
            </>
          )}
          {!user && (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </>
          )}
            <li><NavLink to="/blogs">Blog News</NavLink></li>
        </ul>
      </div>

      {/* Desktop Icons + Profile */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
       

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost flex items-center gap-2">
                <span className="font-semibold">{user.displayName || "User"}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-green-900 rounded-box w-40 text-white"
            >
              <li><NavLink to="/updateprofile">Update Profile</NavLink></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="navbar-end lg:hidden flex items-center gap-2">
      
        

        {user ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
             <span className="font-semibold text-white">{user.displayName || "User"}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
           
          </div>
        ) : (
          <button
            className="btn btn-ghost text-white text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Mobile Dropdown */}
        {isOpen && (
          <ul className="absolute right-2 top-14 w-56 bg-green-900 shadow-lg rounded-md p-4 flex flex-col gap-2 z-50">
            <li><NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/allcrops" onClick={() => setIsOpen(false)}>All Crops</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/addcrop" onClick={() => setIsOpen(false)}>Add Crop</NavLink></li>
                <li><NavLink to="/myposts" onClick={() => setIsOpen(false)}>My Posts</NavLink></li>
                <li><NavLink to="/myinterests" onClick={() => setIsOpen(false)}>My Interests</NavLink></li>
                
                <li><NavLink to="/updateprofile" onClick={() => setIsOpen(false)}>Update Profile</NavLink></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
            {!user && (
              <>
                <li><NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
                <li><NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink></li>
              </>
            )}
            <li><NavLink to="/blogs" onClick={() => setIsOpen(false)} >Blog News</NavLink></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Nav;
