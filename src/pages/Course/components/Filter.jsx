import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Filter = ({ categories, selectedCategory, onCategorySelect, searchTerm, onSearchChange }) => {
    return (
        <div className="mb-6 flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-wrap justify-center md:ml-4 mb-4 md:mb-0">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategorySelect(category)}
                        className={`px-3 py-1.5 mx-1 text-sm font-medium rounded-lg 
                            ${selectedCategory === category 
                            ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} 
                            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="relative w-full md:w-1/2 lg:w-1/3">
                <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="px-3 py-1.5 pl-10 border border-gray-300 rounded-lg w-full text-sm"
                />
            </div>
        </div>
    );
};

export default Filter;