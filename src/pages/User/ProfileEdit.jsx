import React from 'react';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';

const ProfileSection = () => {
    return (
        <MainLayout>
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="bg-gray-100 p-6 border-2 border-gray-500 rounded-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <img
                                src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=wm6OeX9ql34Q7kNvgHsTvJz&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AQGdO7WmKUtsTwEVtkQRJ-Z&oh=00_AYC8qWbax88dXtVjKAxEhfTil54Au2-PaLTPdS-1qeKvzw&oe=66E158B0"
                                alt="Profile"
                                className="size-24 bg-gray-200 mx-8 rounded-full flex items-center justify-center mb-4 lg:mb-0"
                            />
                            <div className="flex-1 lg:ml-4">
                                <h4 className="text-xl font-semibold">Nguyen Van Sy</h4>
                                <p className="text-gray-600 text-sm">@nguyensy23112311@gmail.com</p>
                                <div className="my-1">
                                    <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs">Learner</span>
                                    <p className="text-gray-500 text-xs mt-1">Joined 09 Dec 2017</p>
                                </div>
                                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs">
                                    Change Photo
                                </button>
                            </div>
                        </div>
                        <ul className="mt-2 flex space-x-4 border-b border-gray-300">
                            <li>
                                <p
                                    className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">
                                    Edit Profile
                                </p>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <form noValidate>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm">Full Name</label>
                                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm">Username</label>
                                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" type="text" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm">Email</label>
                                        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm">About</label>
                                        <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" rows="5" placeholder="My Bio"></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Changes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfileSection;
