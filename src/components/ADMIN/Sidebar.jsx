import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaGift,
  FaRegEye,
  FaAngleDown,
  FaThLarge,
  FaUserFriends,
  FaDollarSign,
  FaChartLine,
  FaCalendarAlt,
  FaFileAlt,
  FaCog,
  FaBook,
  FaSignInAlt,
  FaUserPlus,
  FaUnlockAlt,
  FaExclamationTriangle,
  FaExchangeAlt,
  FaPenNib,
  FaHeadset,
  FaBookOpen,
} from "react-icons/fa";
import { BackgroundColor } from "devextreme-react/cjs/chart";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false); // State for Documentation dropdown

  const togglePagesDropdown = () => {
    setIsPagesOpen((prevState) => !prevState);
  };

  const toggleReportsDropdown = () => {
    setIsReportsOpen((prevState) => !prevState);
  };

  const toggleDocsDropdown = () => {
    setIsDocsOpen((prevState) => !prevState); // Toggle the Documentation dropdown
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen">
      <div className="flex items-center p-4">
        <img
          src="https://hydra13.blob.core.windows.net/63a5630a-687a-4c38-98e2-f5ce440f3f09/Your paragraph text.png"
          alt="Logo"
          className="w-10 h-10 text-white flex items-center justify-center rounded-full"
        />
        <span className="ml-3 text-xl font-semibold">AIILs</span>
      </div>
      <nav className="max-h-screen overflow-y-auto transition-width duration-300">
        <ul>
          <li>
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaChartLine />
              <span className="hidden md:block ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaUserFriends />
              <span className="ml-3">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaDollarSign />
              <span className="ml-3">Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="liveStreams"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaRegEye />
              <span className="ml-3">LiveStreams</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="gifts"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaGift />
              <span className="ml-3">Gifts</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="test"
              className={({ isActive }) =>
                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                }`
              }
            >
              <FaPenNib />
              <span className="ml-3">Test Source</span>
            </NavLink>
          </li>
          <li
            className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out"
            onClick={toggleDocsDropdown}
          >
            <div className="flex items-center">
              <FaBook />
              <span className="ml-3">Document & Request</span>
            </div>
            <FaAngleDown
              className={`transform transition-transform ${isDocsOpen ? "rotate-180" : ""
                }`}
            />
          </li>
          {isDocsOpen && (
            <ul className="ml-6">
              <li>
                <NavLink
                  to="docs/importuser"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  <span className="ml-3">File import user</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="docs/teacherrequest"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-gray-200" : ""
                    }`
                  }
                >
                  <span className="ml-3">Register teacher request</span>
                </NavLink>
              </li>
              {/* Add more documentation links as needed */}
            </ul>
          )}
          <li
            className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out"
            onClick={toggleReportsDropdown}
          >
            <div className="flex items-center">
              <FaFileAlt />
              <span className="ml-3">Report & Complaint</span>
            </div>
            <FaAngleDown
              className={`transform transition-transform ${isReportsOpen ? "rotate-180" : ""
                }`}
            />
          </li>
          {isReportsOpen && (
            <ul className="ml-6">
              <li>
                <NavLink
                  to="courseReport"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                    }`
                  }
                >
                  <FaBookOpen />
                  <span className="ml-3">Course report</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                    }`
                  }
                >
                  <FaHeadset />
                  <span className="ml-3">Livestream report</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="forgot-password"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                    }`
                  }
                >
                  <FaUnlockAlt />
                  <span className="ml-3">User Complaint</span>
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="blank-page"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                    }`
                  }
                >
                  <FaFileAlt />
                  <span className="ml-3">Blank Page</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="404"
                  className={({ isActive }) =>
                    `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? "bg-lightGreen" : ""
                    }`
                  }
                >
                  <FaExclamationTriangle />
                  <span className="ml-3">404</span>
                </NavLink>
              </li> */}
            </ul>
          )}
          <li
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out"
            onClick={handleLogout}
          >
            <FaCog />
            <span className="ml-3">Logout</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
