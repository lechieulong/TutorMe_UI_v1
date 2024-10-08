import React, { useState, useEffect } from 'react';
import { FaEye, FaRegUser, FaSignOutAlt, FaUserGraduate } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../../service/GetUser';
import { Profile } from "../../../redux/users/UserSlice";
import { Roles } from "../../../utils/config";

const Sidebar = () => {
    const [userFromToken, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser(); // Wait for the user to be fetched
            setUser(fetchedUser); // Set user data in state
        };
        fetchUser();
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userFromToken?.userName) {
            dispatch(Profile(userFromToken.userName)); // Fetch profile based on the username from token
        }
    }, [dispatch, userFromToken]);

    // Get user information and status from the Redux store
    const { userInfor, status, error } = useSelector((state) => state.user);
    
    return (
        <nav className="w-60 bg-white shadow-lg lg:w-60 md:w-48 sm:w-24">
            <div className="p-4 pt-8">
                <div className="space-y-3">
                    <Link to={`/user/${userInfor?.userName}`}
                        className="flex items-center p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm">
                        <FaRegUser className="mr-3 text-lg text-gray-500" /> {/* Smaller icon */}
                        <span className="hidden sm:inline">Your Profile</span>
                    </Link>
                    {/* Only show "Be Teacher" link if role is not TEACHER */}
                    {userFromToken?.role !== Roles.TEACHER && (
                        <Link
                            to="/changepassword"
                            className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm">
                            <FaUserGraduate className="mr-3 text-lg text-gray-500" /> {/* Smaller icon */}
                            <span className="hidden sm:inline">Be Teacher</span>
                        </Link>
                    )}
                    <Link
                        to="/changepassword"
                        className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm">
                        <FaEye className="mr-3 text-lg text-gray-500" /> {/* Smaller icon */}
                        <span className="hidden sm:inline">Change Password</span>
                    </Link>
                    <button
                        to="/logout"
                        className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm">
                        <FaSignOutAlt className="mr-3 text-lg text-gray-500" /> {/* Smaller icon */}
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
