import React from 'react';
import Sidebar from './components/Sidebar';
import Header from '../../components/common/Header';

const ProfileSection = () => {
    return (
        <div className="relative flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <img
                                src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/428608379_1107729527084945_699601624333735778_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyVNuzP4Hc8Dbdt9fO1j7gqcEP5iSFCnKpwQ_mJIUKckbEXT7w3bFwY3fwedmZXiSmhLJmd69z1YqhZFIY0buO&_nc_ohc=t5-ILYynI4sQ7kNvgEVAn1R&_nc_ht=scontent.fsgn2-8.fna&oh=00_AYAdUovwGr0lybglbgHvhpqXWkxTQjvmgOKiciPetgkOqQ&oe=66C7DBB0"
                                alt="Profile"
                                className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 lg:mb-0"
                            />
                            <div className="flex-1 lg:ml-4">
                                <h4 className="text-lg font-semibold">Full name</h4>
                                <p className="text-gray-600 text-sm">@email</p>
                                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs">
                                    Change Photo
                                </button>
                                <div className="mt-2">
                                    <span className="bg-gray-200 text-gray-700 py-1 px-1 rounded-full text-xs">Leaner</span>
                                    <p className="text-gray-500 text-xs mt-1">Joined 09 Dec 2017</p>
                                </div>
                            </div>
                        </div>
                        <ul className="mt-6 flex space-x-4 border-b border-gray-300">
                            <li>
                                <a href="#" className="py-2 px-4 text-blue-600 border-b-2 border-blue-600 text-sm">Profile Edit</a>
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
        </div>
    );
};

export default ProfileSection;
