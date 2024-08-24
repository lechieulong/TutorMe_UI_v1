import React from 'react';
import { FaEye, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="w-60 bg-white shadow-lg lg:w-60 md:w-48 sm:w-24">
            <div className="p-2 sm:p-4"> {/* Adjust padding for different screen sizes */}
                <div className="space-y-2 sm:space-y-4"> {/* Adjust spacing for different screen sizes */}
                    <Link to="/userdetail" 
                        className="flex items-center p-2 sm:p-3 bg-green-500 text-white rounded-lg text-xs sm:text-sm">
                        <FaRegUser className="mr-2 text-lg sm:text-xl" />
                        <span className="hidden sm:inline">Your profile</span>
                    </Link>
                    <Link to="/changepassword" 
                        className="flex items-center p-2 sm:p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-xs sm:text-sm">
                        <FaEye className="mr-2 text-lg sm:text-xl" />
                        <span className="hidden sm:inline">Change password</span>
                    </Link>
                    <Link to="/logout" 
                        className="flex items-center p-2 sm:p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-xs sm:text-sm">
                        <FaSignOutAlt className="mr-2 text-lg sm:text-xl" />
                        <span className="hidden sm:inline">Logout</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
