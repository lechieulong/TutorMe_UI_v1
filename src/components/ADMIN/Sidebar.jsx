import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaAngleDown, FaThLarge, FaUserFriends, FaDollarSign, FaChartLine, FaCalendarAlt,
    FaFileAlt, FaCog, FaBook, FaSignInAlt, FaUserPlus, FaUnlockAlt, FaExclamationTriangle, FaExchangeAlt 
} from 'react-icons/fa';

const Sidebar = () => {
    const [isPagesOpen, setIsPagesOpen] = useState(false);
    const [isDocsOpen, setIsDocsOpen] = useState(false); // State for Documentation dropdown

    const togglePagesDropdown = () => {
        setIsPagesOpen(prevState => !prevState);
    };

    const toggleDocsDropdown = () => {
        setIsDocsOpen(prevState => !prevState); // Toggle the Documentation dropdown
    };

    return (
        <aside className="w-64 bg-fuchsia-400 shadow-lg h-screen">
            <div className="flex items-center p-4 border-b border-gray-300">
                <img
                    src="/src/assets/images/aiillogo.ico"
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
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-blue-200' : ''}`
                            }
                        >
                            <FaThLarge />
                            <span className="hidden md:block ml-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="users"
                            className={({ isActive }) =>
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-blue-200' : ''}`
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
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-blue-200' : ''}`
                            }
                        >
                            <FaDollarSign />
                            <span className="ml-3">Transactions</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="analytics"
                            className={({ isActive }) =>
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-blue-200' : ''}`
                            }
                        >
                            <FaChartLine />
                            <span className="ml-3">Analytics</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="calendar"
                            className={({ isActive }) =>
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-blue-200' : ''}`
                            }
                        >
                            <FaCalendarAlt />
                            <span className="ml-3">Calendar</span>
                        </NavLink>
                    </li>
                    <li className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out" onClick={togglePagesDropdown}>
                        <div className="flex items-center">
                            <FaFileAlt />
                            <span className="ml-3">Pages</span>
                        </div>
                        <FaAngleDown className={`transform transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} />
                    </li>
                    {isPagesOpen && (
                        <ul className="ml-6">
                            <li>
                                <NavLink
                                    to="login"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <FaSignInAlt />
                                    <span className="ml-3">Login</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="register"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <FaUserPlus />
                                    <span className="ml-3">Register</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="forgot-password"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <FaUnlockAlt />
                                    <span className="ml-3">Forgot Password</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="blank-page"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
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
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <FaExclamationTriangle />
                                    <span className="ml-3">404</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    <li className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out" onClick={toggleDocsDropdown}>
                        <div className="flex items-center">
                            <FaBook />
                            <span className="ml-3">Document & Request</span>
                        </div>
                        <FaAngleDown className={`transform transition-transform ${isDocsOpen ? 'rotate-180' : ''}`} />
                    </li>
                    {isDocsOpen && (
                        <ul className="ml-6">
                            <li>
                                <NavLink
                                    to="docs/importuser"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <span className="ml-3">File import user</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="docs/getting-started"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <span className="ml-3">Request register course</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="docs/api-reference"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                                    }
                                >
                                    <span className="ml-3">Request register teacher</span>
                                </NavLink>
                            </li>
                            {/* Add more documentation links as needed */}
                        </ul>
                    )}
                    <li>
                        <NavLink
                            to="settings"
                            className={({ isActive }) =>
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                            }
                        >
                            <FaCog />
                            <span className="ml-3">Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center p-3 text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out ${isActive ? 'bg-gray-200' : ''}`
                            }
                        >
                            <FaExchangeAlt  />
                            <span className="ml-3">Back to user page</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
