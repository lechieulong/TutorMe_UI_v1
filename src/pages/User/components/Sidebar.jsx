import React from "react";
import { FaEye, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../service/GetUser";
import { Profile } from "../../../redux/users/UserSlice";
import { useEffect } from "react";

const Sidebar = () => {
  const userFromToken = getUser();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userFromToken?.userName) {
      dispatch(Profile(userFromToken.userName)); // Fetch profile based on the username from token
    }
  }, [dispatch]);

  // Get user information and status from the Redux store
  const { userInfor, status, error } = useSelector((state) => state.user);

  return (
    <nav className="w-60 bg-white shadow-lg lg:w-60 md:w-48 sm:w-24">
      <div className="p-4 pt-8">
        <div className="space-y-3">
          <Link
            to={`/user/${userInfor?.userName}`}
            className="flex items-center p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm"
          >
            <FaRegUser className="mr-3 text-lg text-gray-500" />{" "}
            {/* Smaller icon */}
            <span className="hidden sm:inline">Your profile</span>
          </Link>
          <Link
            to="/changepassword"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm"
          >
            <FaEye className="mr-3 text-lg text-gray-500" />{" "}
            {/* Smaller icon */}
            <span className="hidden sm:inline">Change password</span>
          </Link>
          <Link
            to="/logout"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm"
          >
            <FaSignOutAlt className="mr-3 text-lg text-gray-500" />{" "}
            {/* Smaller icon */}
            <span className="hidden sm:inline">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
