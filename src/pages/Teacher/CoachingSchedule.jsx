import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { FaSearch, FaCaretDown } from "react-icons/fa";
import About from './components/About';
import Certification from './components/Certification';
import AvailableTime from './components/AvailableTime';

const CoachingSchedule = () => {
    const [activeTab, setActiveTab] = useState('about'); // Default tab
    const { teachername } = useParams(); // Get teachername from URL params

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
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Teacher</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Scheduled</button>
                        </div>
                    </header>

                    <div className="flex items-center space-x-2 mb-4">
                        {[...Array(12)].map((_, index) => (
                            <img
                                key={index}
                                src={`https://placehold.co/40x40`}
                                alt={`Profile ${index + 1}`}
                                className="rounded-full"
                            />
                        ))}

                        <div className="flex items-center">
                            <button className="bg-slate-100 text-blue-500 px-4 py-2 ml-2 rounded">
                                <FaSearch className="text-2xl" />
                            </button>
                        </div>
                    </div>

                    {/* If teachername exists, show tabs and content */}
                    {teachername ? (
                        <>
                            <nav className="flex space-x-4 mb-2">
                                <button
                                    onClick={() => setActiveTab('about')}
                                    className={`pb-1 ${activeTab === 'about' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('certification')}
                                    className={`pb-1 ${activeTab === 'certification' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Certification
                                </button>
                                <button
                                    onClick={() => setActiveTab('availableTime')}
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
                        // If no teachername, show this placeholder message
                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1">
                                <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                                    {/* <FaCaretDown className="text-gray-600 text-2xl" /> */}
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
