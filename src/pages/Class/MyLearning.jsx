import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MainLayout from '../../layout/MainLayout';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getUser } from '../../service/GetUser';
import { ApiUrls, Roles } from '../../utils/config';

const MyLearning = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLink, setActiveLink] = useState('mylearning');
    const scrollContainerRef = useRef(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUser();
        if (userData) {
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(ApiUrls.MY_LEARNING);
                setClasses(response.data.result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const scroll = (direction) => {
        const scrollAmount = 300; // Adjust the scroll amount as needed
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (loading) return <p className="text-center py-4">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-4">Error: {error}</p>;

    return (
        <MainLayout>
            <>
                {/* Navigation Bar */}
                {user?.role === Roles.USER ? (
                    <>
                        <nav className="bg-gray-800 text-white flex flex-col h-full">
                            <div className="px-24 pt-20 pb-2">
                                <h1 className="text-3xl font-bold">My Learning Platform</h1>
                            </div>
                            <ul className="flex space-x-10 px-24 pt-10 border-t border-gray-700">
                                <li>
                                    <Link
                                        to="/courses"
                                        className={`hover:text-gray-400 ${
                                            activeLink === 'courses' ? 'text-gray-100 border-b-2 border-gray-400' : ''
                                        }`}
                                        onClick={() => setActiveLink('courses')}
                                    >
                                        All Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mylearning"
                                        className={`hover:text-gray-400 ${
                                            activeLink === 'mylearning' ? 'text-gray-100 border-b-2 border-gray-400' : ''
                                        }`}
                                        onClick={() => setActiveLink('mylearning')}
                                    >
                                        My Learning
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mylearning"
                                        className={`hover:text-gray-400 ${
                                            activeLink === 'wishlist' ? 'text-gray-100 border-b-2 border-gray-400' : ''
                                        }`}
                                        onClick={() => setActiveLink('wishlist')}
                                    >
                                        Wishlist
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/settings"
                                        className={`hover:text-gray-400 ${
                                            activeLink === 'settings' ? 'text-gray-400 border-b-2 border-gray-400' : ''
                                        }`}
                                        onClick={() => setActiveLink('settings')}
                                    >
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex-1 p-12">
                            <div className="relative flex items-center">
                                <button
                                    className="absolute left-0 z-10 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
                                    onClick={() => scroll('left')}
                                >
                                    <HiChevronLeft size={24} />
                                </button>
                                <div
                                    ref={scrollContainerRef}
                                    className="flex overflow-hidden space-x-4 px-12 py-2 scroll-smooth"
                                    style={{ scrollBehavior: 'smooth' }}
                                >
                                    {classes.map((cls) => (
                                        <div
                                            key={cls.id}
                                            className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg shadow-md p-4"
                                        >
                                            <img
                                                src={`https://via.placeholder.com/320x180?text=Class+${cls.id}`}
                                                alt={cls.className}
                                                className="w-full h-30 object-cover rounded-t-lg"
                                            />
                                            <div className="mt-2">
                                                <h2 className="text-lg font-semibold">{cls.className}</h2>
                                                <p className="text-gray-600">{cls.classDescription}</p>
                                                <p className="text-gray-500">Number of students: {cls.count}</p>
                                                <p className="text-gray-500">Course: {cls.courseId}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="absolute right-0 z-10 bg-gray-700 text-white p-2 rounded-full focus:outline-none"
                                    onClick={() => scroll('right')}
                                >
                                    <HiChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className='pt-20'>User không có quyền truy cập.</p> // Render if user doesn't have access
                )}
            </>
        </MainLayout>
    );
};

export default MyLearning;
