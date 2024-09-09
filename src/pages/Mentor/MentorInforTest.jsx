import React from 'react';
import Header from '../../components/common/Header';
import './css/style.css';
import { FaAlignRight, FaBook, FaRegCaretSquareRight } from 'react-icons/fa'

const UserInfo = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6">

                {/* User Profile Section */}
                <div className="bg-white rounded-lg shadow-lg p-12 lg:w-1/4 flex flex-col items-center border border-blue-200">
                    <img
                        src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=wm6OeX9ql34Q7kNvgHsTvJz&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AQGdO7WmKUtsTwEVtkQRJ-Z&oh=00_AYC8qWbax88dXtVjKAxEhfTil54Au2-PaLTPdS-1qeKvzw&oe=66E158B0"
                        alt="Avatar"
                        className="w-32 h-32 rounded-full mb-4 border-4 border-blue-300"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-blue-700">Nguyen Van Sy</h2>
                        <p className="text-blue-600">Total Number of Classes: 12</p>
                        <p className="mt-4 text-gray-600"><p className='font-black'>Description:</p>A passionate developer with experience in building web applications.</p>
                    </div>
                </div>

                {/* Flex container for Courses and Career History */}
                <div className="flex-1 flex flex-col lg:w-3/4 lg:flex-row gap-6">
                    {/* Courses Section */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg p-10 overflow-y-auto border border-green-200">
                        <h3 className="text-xl font-semibold text-green-700 mb-4">Courses</h3>
                        <Courses />
                    </div>

                    {/* Career History Section */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg p-10 overflow-y-auto border border-yellow-200">
                        <h3 className="text-xl font-semibold text-yellow-700 mb-4">Career History</h3>
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-2">
                                <p className="font-semibold text-gray-800">Tech Company A</p>
                                <p className="text-gray-700">Software Engineer | Jan 2020 - Present</p>
                            </div>
                            <div className="border-b border-gray-200 pb-2">
                                <p className="font-semibold text-gray-800">Tech Company B</p>
                                <p className="text-gray-700">Junior Developer | Jun 2017 - Dec 2019</p>
                            </div>
                            {/* Add more career history items here if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CourseItem = ({ icon, text, tooltip }) => (
    <div className="relative flex items-center">
        <div className="flex items-center">
            {icon}
            <span className="ml-2">{text}</span>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded tooltip-content hidden group-hover:block">
            {tooltip}
        </div>
    </div>
);

const Courses = () => (
    <div className="space-y-4">
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group">
            <CourseItem
                icon={<FaAlignRight className="text-gray-600" />}
                text="1: React Basics"
                tooltip="Course Name"
            />
            <CourseItem
                icon={<FaBook className="text-gray-600" />}
                text="A beginner’s guide to React."
                tooltip="Course Description"
            />
            <CourseItem
                icon={<FaRegCaretSquareRight className="text-gray-600" />}
                text="01/02/2024"
                tooltip="Start Date"
            />
        </div>
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow group">
            <CourseItem
                icon={<FaAlignRight className="text-gray-600" />}
                text="2: Advanced JavaScript"
                tooltip="Course Name"
            />
            <CourseItem
                icon={<FaBook className="text-gray-600" />}
                text="Deep dive into JavaScript ES6+ features."
                tooltip="Course Description"
            />
            <CourseItem
                icon={<FaRegCaretSquareRight className="text-gray-600" />}
                text="03/05/2024"
                tooltip="Start Date"
            />
        </div>

    </div>
);

export default UserInfo;
