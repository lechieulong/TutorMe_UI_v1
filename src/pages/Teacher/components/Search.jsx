import React, { useState, useEffect } from 'react';
import { SearchTeacher } from '../../../redux/users/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import debounce from 'lodash.debounce';
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const teachers = useSelector(state => state.user.searchTeachers);

    const debouncedSearch = debounce((searchTerm) => {
        if (searchTerm) {
            dispatch(SearchTeacher(searchTerm));
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="relative w-full max-w-md inline-block mx-auto">
            <div className="relative">
                <form onSubmit={handleSubmit} className="flex items-center relative">
                    <input
                        type="text"
                        name="searchTerm"
                        className="w-[90%] border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute p-1 right-12 top-1/2 transform opacity-50 -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none rounded-full"
                        >
                            &times;
                        </button>
                    )}
                    <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </form>
            </div>

            {searchTerm && teachers && teachers.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-50 w-[90%]">
                    <ul className="py-1">
                        {teachers.map((teacher) => (
                            <a
                                href={`/coachingschedule/${teacher?.userName}`}
                                key={teacher.userName}
                                className="block"
                            >
                                <li className="flex items-center px-3 py-1 hover:bg-gray-100 cursor-pointer">
                                    <div className="p-1 bg-gray-300 opacity-50 rounded-full mr-2">
                                        <FaSearch className="text-sm" />
                                    </div>
                                    <img
                                        src={teacher.imageURL || "https://placehold.co/30"}
                                        alt={`Profile of ${teacher.userName}`}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <div>
                                        <div className="text-sm font-medium">{teacher.userName}</div>
                                        <div className="text-xs text-gray-500">{teacher.name}</div>
                                    </div>
                                </li>
                            </a>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;
