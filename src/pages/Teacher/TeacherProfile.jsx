import React from "react";
import Sidebar from "../User/components/Sidebar";
import MainLayout from "../../layout/MainLayout";
import {
    FaLocationArrow,
    FaEnvelope,
    FaPhone,
    FaRegUser,
    FaCalendarDay,
} from "react-icons/fa";
import defaulAvatar from "../../assets/images/default-avatar.jpg";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formatDOB } from "../../utils/Validator";
import { GetUserEducation } from "../../redux/users/UserSlice";

const TeacherProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get user information and status from the Redux store
    const { user, userEducation } = useSelector((state) => state.user);

    // Check authentication token
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        dispatch(GetUserEducation());
    }, [dispatch]);

    function Certification() {
        return (
            <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Certification info</h1>
                {/* <p className="text-gray-600 mb-6">This is your IELTS certification</p> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Large Certification Image */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
                        <img
                            src={userEducation?.degreeURL || "https://placehold.co/600x800"}
                            alt="Certification Image"
                            className="max-w-full h-auto rounded-lg"
                        />
                    </div>

                    {/* Certification Details */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium mb-2">Some information of your education</h2>
                        <p className="text-gray-600 mb-4">This information cannot be changed as it is related to authentication.</p>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <i className="fas fa-globe text-gray-600 mr-2"></i>
                                <p className="text-gray-800">Current career</p>
                            </div>
                            <p className="text-gray-600">{userEducation?.career}</p>
                            <i className="fas fa-chevron-right text-gray-600"></i>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <i className="fas fa-keyboard text-gray-600 mr-2"></i>
                                <p className="text-gray-800">IELTS band score</p>
                            </div>
                            <p className="text-gray-600">{userEducation?.grade}</p>
                            <i className="fas fa-chevron-right text-gray-600"></i>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <i className="fas fa-universal-access text-gray-600 mr-2"></i>
                                <p className="text-gray-800">Experience year</p>
                            </div>
                            <p className="text-gray-600">{userEducation?.yearExperience}</p>
                            <i className="fas fa-chevron-right text-gray-600"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="flex w-full bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-5" style={{ maxHeight: 'calc(100vh - 65px)', overflowY: 'auto' }}>
                    <div className="mx-auto p-6 bg-white shadow-md rounded-md">
                        <h1 className="text-2xl font-bold mb-2">Teacher info</h1>
                        <p className="text-gray-600 mb-6">Bio: {userEducation?.aboutMe}</p>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h3 className="text-lg font-bold mb-2">Basic info</h3>
                            <p className="text-gray-600 mb-4">Basic information is subject to change. <a href="#" className="text-blue-500">Learn more <i className="fas fa-info-circle"></i></a></p>
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <img src={user?.imageURL || "https://placehold.co/64x64"}
                                        alt="Profile picture"
                                        className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-gray-600">A profile picture helps personalize your account</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 py-2">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-800">Name</span>
                                    <span className="text-gray-600">{user?.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-800">Birthday</span>
                                    <span className="text-gray-600">{formatDOB(user?.dob)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-800">Phone number</span>
                                    <span className="text-gray-600">{user?.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Certification />
                </main>
            </div>
        </MainLayout>
    );
};

export default TeacherProfile;
