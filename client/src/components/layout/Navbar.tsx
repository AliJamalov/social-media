import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-0 left-1/2">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <AiOutlineHome size={25} />
          <span className="sr-only">Home</span>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <IoSearchOutline size={25} />
          <span className="sr-only">Search</span>
        </NavLink>

        <div className="flex items-center justify-center">
          <NavLink
            to="/new-post"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <GoPlus size={25} color="white" />
            <span className="sr-only">New item</span>
          </NavLink>
        </div>

        <NavLink
          to="/saved-post"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <BsBookmark size={25} />
          <span className="sr-only">Saved posts</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <CgProfile size={25} />
          <span className="sr-only">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
