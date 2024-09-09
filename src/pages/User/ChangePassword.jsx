import React from 'react';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';

const ProfileSection = () => {
    return (
        <MainLayout>
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-12">
                    <div className="flex gap-8 bg-gray-100 p-6 px-12">
                        <div className="flex-1 border-2 border-gray-500 rounded-lg p-6">
                            <ul className="mt-2 flex space-x-4 border-b border-gray-300">
                                <li>
                                    <p className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">
                                        Change Password
                                    </p>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <form noValidate>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-gray-700">Current Password</label>
                                                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" type="password" placeholder="••••••" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">New Password</label>
                                                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" type="password" placeholder="••••••" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Confirm Password</label>
                                                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" type="password" placeholder="••••••" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save Change</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="hidden md:flex md:w-1/3 flex-col items-start">
                            <div className="mb-6 text-base text-red-600 bg-white p-4 border border-gray-300 rounded-lg shadow-sm italic">
                                <p>Make sure your new password is strong and unique. Avoid using common passwords and include a mix of letters, numbers, and special characters.</p>
                            </div>
                            <img 
                                src="src/assets/images/security.png" 
                                alt="Security Illustration"
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfileSection;
