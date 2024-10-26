import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBan } from "react-icons/fa";

const NotAuthorizedPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/"); // Redirect to login page or home page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-6">
                    <FaBan className="text-red-600 text-6xl" />
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-lg text-gray-700 mb-8">
                    You do not have permission to access this page.
                </p>
                <button
                    onClick={handleRedirect}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    Go to Main Page
                </button>
            </div>
        </div>
    );
};

export default NotAuthorizedPage;
