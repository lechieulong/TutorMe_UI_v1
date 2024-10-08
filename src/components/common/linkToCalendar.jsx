import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPeopleArrows } from "react-icons/fa";
import { useState } from "react";

const MainLayout = () => {
    const [showTextPeople, setShowTextPeople] = useState(false);
    const [showTextCalendar, setShowTextCalendar] = useState(false);

    return (
        <div>
            {/* Button cho icon FaPeopleArrows */}
            <Link to="/coachingschedule">
                <button
                    className="fixed bottom-20 right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                    onMouseEnter={() => setShowTextPeople(true)}
                    onMouseLeave={() => setShowTextPeople(false)}
                >
                    <FaPeopleArrows />
                </button>
            </Link>
            {showTextPeople && (
                <span className="font-mono fixed text-sm bottom-28 right-16 bg-gray-500 bg-opacity-90 text-gray-100 p-1 rounded shadow-lg">
                    Coaching Schedule
                </span>
            )}

            {/* Button cho icon FaCalendarAlt */}
            <Link to="/calendar">
                <button
                    className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                    onMouseEnter={() => setShowTextCalendar(true)}
                    onMouseLeave={() => setShowTextCalendar(false)}
                >
                    <FaCalendarAlt />
                </button>
            </Link>
            {showTextCalendar && (
                <span className="font-mono fixed text-sm bottom-14 right-16 bg-gray-500 bg-opacity-90 text-gray-100 p-1 rounded shadow-lg">
                    Calendar
                </span>
            )}
        </div>
    );
};

export default MainLayout;
