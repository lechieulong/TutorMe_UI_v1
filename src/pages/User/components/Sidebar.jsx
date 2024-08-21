import React from 'react';
import { CiLogout } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="w-60 bg-white shadow-lg h-screen">
            <div className="p-4">
                <div className="space-y-2">
                    <Link to="/userdetail" className="flex items-center p-3 text-gray-700 bg-gray-200 rounded-lg"> <i className="fas fa-chart-area fa-fw me-3"></i>Your profile</Link>
                    <Link to="/changepassword" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300"> <i className="fas fa-chart-area fa-fw me-3"></i>Change password</Link>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
