import React from 'react';
import { FaBell } from "react-icons/fa";

const AdminHeader = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-purple-300 shadow-md"> {/* Increased padding */}
            <div className="flex items-center">
                <span className="ml-3 text-xl font-semibold">DashWind</span>
            </div>
            <div className="flex items-center">
                <i className="fas fa-sun text-xl mr-4"></i>
                <div className="relative">
                    <FaBell className="text-xl"/>
                    <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">15</span>
                </div>
                <div className="ml-4">
                    <img src="https://placehold.co/32x32" alt="profile" className="w-8 h-8 rounded-full"/>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
