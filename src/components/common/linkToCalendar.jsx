import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPeopleArrows } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { getUser } from "../../service/GetUser";
import { Roles } from "../../utils/config";

const LinkTo = () => {
    const [showTextPeople, setShowTextPeople] = useState(false);
    const [showTextCalendar, setShowTextCalendar] = useState(false);
    const [userFromToken, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    return (
        <div>
            {/* Coaching Schedule Button */}
            <Link to="/coachingschedule">
                <button
                    className={`fixed ${userFromToken?.role?.length > 0 ? 'bottom-20' : 'bottom-5'} right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110`}
                    onMouseEnter={() => setShowTextPeople(true)}
                    onMouseLeave={() => setShowTextPeople(false)}
                >
                    <FaPeopleArrows />
                </button>
            </Link>
            {showTextPeople && (
                <span className={`font-mono fixed text-sm ${userFromToken?.role?.length > 0 ? 'bottom-28' : 'bottom-14'} right-16 bg-gray-500 bg-opacity-90 text-gray-100 p-1 rounded shadow-lg`}>
                    Coaching Schedule
                </span>
            )}

            {/* Calendar Button */}
            {userFromToken?.role?.length > 0 && (
                <Link to="/calendar">
                    <button
                        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                        onMouseEnter={() => setShowTextCalendar(true)}
                        onMouseLeave={() => setShowTextCalendar(false)}
                    >
                        <FaCalendarAlt />
                    </button>
                </Link>
            )}
            {showTextCalendar && (
                <span className="font-mono fixed text-sm bottom-14 right-16 bg-gray-500 bg-opacity-90 text-gray-100 p-1 rounded shadow-lg">
                    Calendar
                </span>
            )}
        </div>
    );
};

export default LinkTo;
