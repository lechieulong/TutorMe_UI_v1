import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const MainLayout = () => {
    return (
        <div>
            <Link to="/calendar">
                <button
                    className="fixed bottom-20 right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300"
                >
                    <FaCalendarAlt />
                </button>
            </Link>
            <Link to="/calendar">
                <button
                    className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-2xl hover:bg-blue-700 transition-all duration-300"
                >
                    <FaCalendarAlt />
                </button>
            </Link>
        </div>
    );
};
export default MainLayout;