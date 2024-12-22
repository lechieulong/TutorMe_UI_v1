import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaRegUser,
  FaSignOutAlt,
  FaUserGraduate,
  FaHistory,
  FaPenNib,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../service/GetUser";
import { Profile } from "../../../redux/users/UserSlice";
import { Roles } from "../../../utils/config";

const Sidebar = () => {
  const [userFromToken, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userFromToken?.userName) {
      dispatch(Profile(userFromToken.userName));
    }
  }, [dispatch, userFromToken]);

  // Get user information and status from the Redux store
  const { userInfor } = useSelector((state) => state.user);

  return (
    <nav className="w-60 bg-white shadow-lg lg:w-60 md:w-48 sm:w-24">
      <div className="p-4 pt-6">
        <div className="space-y-3">
          <NavLink
            to={`/user/${userInfor?.userName}`}
            className={({ isActive }) =>
              `flex items-center p-3 ${
                isActive
                  ? "bg-lightGreen text-gray-700 hover:bg-gray-200"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded-lg transition-colors duration-300 text-sm`
            }
          >
            <FaRegUser className="mr-3 text-lg text-gray-500" />
            <span className="hidden sm:inline">Your Profile</span>
          </NavLink>

          {!userFromToken?.role?.includes(Roles.TEACHER) ? (
            <NavLink
              to="/beteacher"
              className={({ isActive }) =>
                `flex items-center p-3 ${
                  isActive
                    ? "bg-lightGreen text-gray-700 hover:bg-gray-200"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-lg transition-colors duration-300 text-sm`
              }
            >
              <FaUserGraduate className="mr-3 text-lg text-gray-500" />
              <span className="hidden sm:inline">Be Teacher</span>
            </NavLink>
          ) : (
            <NavLink
              to="/teacherprofile"
              className={({ isActive }) =>
                `flex items-center p-3 ${
                  isActive
                    ? "bg-lightGreen text-gray-700 hover:bg-gray-200"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-lg transition-colors duration-300 text-sm`
              }
            >
              <FaUserGraduate className="mr-3 text-lg text-gray-500" />
              <span className="hidden sm:inline">Teacher Profile</span>
            </NavLink>
          )}

          <NavLink
            to="/changepassword"
            className={({ isActive }) =>
              `flex items-center p-3 ${
                isActive
                  ? "bg-lightGreen text-gray-700 hover:bg-gray-200"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded-lg transition-colors duration-300 text-sm`
            }
          >
            <FaEye className="mr-3 text-lg text-gray-500" />
            <span className="hidden sm:inline">Change Password</span>
          </NavLink>

          <NavLink
            to="/purchase-history"
            className={({ isActive }) =>
              `flex items-center p-3 ${
                isActive
                  ? "bg-lightGreen text-gray-700 hover:bg-gray-200"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded-lg transition-colors duration-300 text-sm`
            }
          >
            <FaHistory className="mr-3 text-lg text-gray-500" />
            <span className="hidden sm:inline">Purchase History</span>
          </NavLink>

          {/* <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            `flex items-center p-3 ${isActive ? 'g-gray-100 text-gray-700 hover:bg-gray-200' : 'text-gray-700 hover:bg-gray-200'} rounded-lg transition-colors duration-300 text-sm`
                        }>
                        <FaSignOutAlt className="mr-3 text-lg text-gray-500" />
                        <span className="hidden sm:inline">Logout</span>
                    </NavLink> */}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
