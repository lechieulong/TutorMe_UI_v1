import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';

const UserInformationPage = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* User Profile Section */}
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                        <img src="" alt="User Avatar" className="w-full h-48 object-cover rounded-full" />
                        <h2 className="text-2xl font-bold mt-4">Nguyen Van Sy</h2>
                        <p className="text-gray-700">Description: Nguyen Van Sy dep trai</p>
                    </div>

                    <div className="md:w-3/4 ml-auto">
                        {/* User Details Section */}
                        <div className="mb-4">
                            <p className="text-gray-700">Total Number of Classes: 2</p>
                        </div>

                        {/* Career History Section */}
                        <div className="mb-4">
                            <h2>Career History</h2>
                            <ul className="list-disc pl-4">
                                <li className="mb-2">
                                    <h3 className="text-lg font-semibold">"companyName"</h3>
                                    <p className="text-gray-700">"jobTitle"</p>
                                    <p className="text-gray-700">"startDate - endDate"</p>
                                </li>
                                <li className="mb-2">
                                    <h3 className="text-lg font-semibold">"companyName"</h3>
                                    <p className="text-gray-700">"jobTitle"</p>
                                    <p className="text-gray-700">"startDate - endDate"</p>
                                </li>
                            </ul>
                        </div>

                        {/* Courses Section */}
                        <h2>Courses</h2>
                        <ul className="list-disc pl-4">
                            <li className="mb-2">
                                <h3 className="text-lg font-semibold">name</h3>
                                <p className="text-gray-700">description</p>
                                <p className="text-gray-700">completionDate</p>
                            </li>
                            <li className="mb-2">
                                <h3 className="text-lg font-semibold">name</h3>
                                <p className="text-gray-700">description</p>
                                <p className="text-gray-700">completionDate</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformationPage;