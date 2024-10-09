import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { FaSearch } from "react-icons/fa";
import About from './components/About';
import Certification from './components/Certification';
import AvailableTime from './components/AvailableTime';
import { GetTopTeachers } from '../../redux/users/UserSlice';
import { getUser } from '../../service/GetUser';
import { Roles } from '../../utils/config';

const CoachingSchedule = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTab') || 'about';
    });
    const { teachername } = useParams();

    const [userFromToken, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        dispatch(GetTopTeachers());
    }, [dispatch]);

    const { teachers, status, error } = useSelector((state) => state.user);

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    return (
        <MainLayout>
            <div className="pt-5 bg-slate-100">
                <div className="max-w-5xl mx-auto p-4">
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">CONNECTION BETWEEN TEACHERS AND STUDENTS</h1>
                            <p className="text-gray-600">Coaching 1:1 · 145.2K members</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {userFromToken?.role?.includes(Roles.TEACHER) &&
                                <button className="bg-green-400 text-white px-4 py-2 rounded">Set Schedule</button>
                            }
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Teacher</button>
                            <button className="bg-yellow-300 text-white px-4 py-2 rounded">Scheduled</button>
                        </div>
                    </header>

                    <div className="flex items-center space-x-2 mb-4">
                        {teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <a href={`/coachingschedule/${teacher.userName}`} className="inline-block" key={teacher.userName}>
                                    <img
                                        src={teacher.imageURL || `https://placehold.co/40x40`}
                                        alt={`Profile of ${teacher.name}`}
                                        className="rounded-full w-10 h-10"
                                    />
                                </a>
                            ))
                        ) : (
                            <p className="text-gray-600">No teachers available.</p>
                        )}

                        <div className="flex items-center">
                            <button className="bg-slate-100 text-blue-500 px-4 py-2 ml-2 rounded">
                                <FaSearch className="text-2xl" />
                            </button>
                        </div>
                    </div>

                    {teachername ? (
                        <>
                            <nav className="flex space-x-4 mb-2">
                                <button
                                    onClick={() => handleTabChange('about')}
                                    className={`pb-1 ${activeTab === 'about' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Information
                                </button>
                                <button
                                    onClick={() => handleTabChange('certification')}
                                    className={`pb-1 ${activeTab === 'certification' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Certification
                                </button>
                                <button
                                    onClick={() => handleTabChange('availableTime')}
                                    className={`pb-1 ${activeTab === 'availableTime' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Available time
                                </button>
                            </nav>

                            {/* Conditionally render components based on activeTab */}
                            {activeTab === 'about' && <About />}
                            {activeTab === 'certification' && <Certification />}
                            {activeTab === 'availableTime' && <AvailableTime />}
                        </>
                    ) : (
                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1">
                                <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                                    <p className="text-gray-700 font-semibold">
                                        Select a teacher you want to connect with...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default CoachingSchedule;
