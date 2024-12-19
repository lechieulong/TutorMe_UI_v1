// src/components/LockedNotifyModal.js
import React from "react";
import { Link } from "react-router-dom";

const LockedNotifyModal = ({ isOpen, onLogout, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
                <h2 className="text-xl font-semibold text-center text-red-500">Your Account is Locked</h2>
                <p className="mt-4 text-center">{message || "Your account has been locked. Please contact support if you need assistance."}</p>
                <div className="mt-6 flex justify-center gap-x-4">
                    <button
                        onClick={onLogout}
                        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
                <div className="mt-4 text-center">
                    Report issue: <Link to="https://mail.google.com/" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">aienhancedieltsprep@gmail.com</Link>.
                </div>
            </div>
        </div>
    );
};

export default LockedNotifyModal;
