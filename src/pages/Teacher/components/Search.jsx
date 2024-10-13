import React, { useState, useEffect } from 'react';
import { SearchTeacher } from '../../../redux/users/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import debounce from 'lodash.debounce';

const Search = ({ onSearch }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const teachers = useSelector(state => state.user.searchTeacher); // Adjust according to your state structure

    // Debounce function to reduce the frequency of API calls
    const debouncedSearch = debounce((searchTerm) => {
        if (searchTerm) {
            dispatch(SearchTeacher(searchTerm));
        }
    }, 300); // 300ms debounce delay

    // Handle side effect when searchTerm changes
    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            debouncedSearch.cancel(); // Cleanup debounce on unmount
        };
    }, [searchTerm, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm); // Optional callback if needed
    };

    return (
        <div className="absolute top-16 right-0 mt-20 transform -translate-x-1/2 w-full max-w-md">
            <div className="relative">
                <form onSubmit={handleSubmit} className="flex items-center mt-6">
                    <input
                        type="text"
                        name="searchTerm"
                        className="w-[90%] border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm"
                        placeholder="Search...(Sorry! Not available now)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fas fa-search absolute right-3 top-2.5 text-gray-500"></i>
                </form>
            </div>

            {teachers && teachers.length > 0 && (
                <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="px-4 py-2 text-gray-500">Teachers</div>
                    <ul className="py-2">
                        {teachers.map((teacher) => (
                            <li key={teacher.userName} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <img src={teacher.imageURL || "https://placehold.co/40"} alt={`Profile of ${teacher.userName}`} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <div className="font-semibold">{teacher.userName}</div>
                                    <div className="text-sm text-gray-500">{teacher.name}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">View all results for "{searchTerm}"</div>
                </div>
            )}
        </div>
    );
};

export default Search;
