// src/components/Pagination.js
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between items-center mt-6 px-4">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:text-gray-700 disabled:opacity-50 flex items-center"
            >
                <FaAngleLeft className="mr-2" />
                Prev
            </button>
            <span className="text-gray-700 text-lg">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:text-gray-700 disabled:opacity-50 flex items-center"
            >
                Next
                <FaAngleRight className="ml-2" />
            </button>
        </div>
    );
};

export default Pagination;
