import React from 'react';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';
import defaulAvatar from "../../assets/images/defaul-avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

const ProfileEditSection = () => {
    const { userInfor, status, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/login"); // Nếu ko có token, chuyển hướng đến Landing Page
        }
    }, [navigate]);

    const [formData, setFormData] = useState({

    });

    const [formErrors, setFormErrors] = useState({

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {

    }

    const handleSubmit = async (e) => {

    }

    return (
        <MainLayout>
            <div className="flex h-screen w-full">
                <Sidebar userInfor={userInfor} />
                <div className="flex-1 p-8">
                    <div className="bg-gray-100 p-6 border-2 border-gray-500 rounded-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <img
                                src={userInfor?.imageURL || defaulAvatar}
                                alt="Avatar"
                                className="size-24 bg-gray-200 mx-8 rounded-full flex items-center justify-center mb-4 lg:mb-0"
                            />
                            <div className="flex-1 lg:ml-4">
                                <h4 className="text-xl font-semibold">{userInfor?.name}</h4>
                                <p className="text-gray-600 text-sm">@{userInfor?.email}</p>
                                <div className="my-1">
                                    <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs">{userInfor?.userName}</span>
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
                                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                                type="text"
                                                placeholder={userInfor?.name} />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm">Date Of Birth</label>
                                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                                type="date"
                                                placeholder={userInfor?.DOB} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm">Phone Number</label>
                                        <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            type="text"
                                            placeholder={userInfor?.phoneNumber} />
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

export default ProfileEditSection;
