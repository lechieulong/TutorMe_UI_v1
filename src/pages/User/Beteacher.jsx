import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAPI } from "../../redux/auth/AuthSlice";

const ProfileSection = () => {
    const location = useLocation();
    const userInfor = location.state?.userInfor;
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize dispatch
    const { error, changePasswordStatus } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/"); // Redirect to Landing Page if no token
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newpassword: "",
        confirmPassword: "",
        yearsOfExperience: "",
        ieltsGrade: "",
        specialization: {
            listening: false,
            speaking: false,
            reading: false,
            writing: false
        }
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        currentPassword: "",
        newpassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                specialization: {
                    ...formData.specialization,
                    [name]: checked
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!formData.email) errors.email = "Email is required";
        if (!formData.currentPassword) {
            errors.currentPassword = "Current password is required";
        }
        if (!formData.newpassword) {
            errors.newpassword = "New password is required";
        } else if (!passwordRegex.test(formData.newpassword)) {
            errors.newpassword = "Password must be at least 8 characters long and contain at least one uppercase letter and one special character";
        }
        if (formData.newpassword == formData.currentPassword) {
            errors.newpassword = "Current password is the same as old password";
        }
        if (formData.newpassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({
                email: "",
                currentPassword: "",
                newpassword: "",
                confirmPassword: ""
            });

            // Remove confirmPassword before dispatching
            const { confirmPassword, ...userData } = formData;

            dispatch(changePasswordAPI(userData)); // Call your Redux action
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <MainLayout>
            <div className="flex h-screen w-full">
                <Sidebar userInfor={userInfor} />
                <div className="flex-1 p-12">
                    <div className="flex gap-8 bg-gray-100 p-6 px-12">
                        <div className="hidden md:flex md:w-1/3 flex-col items-start">
                            <div className="mb-6 text-base text-red-600 shadow-sm italic">
                                <p>Make sure all information you provide is true.</p>
                            </div>
                            <label className="text-sm">
                                <input type="checkbox" /> Accept our <Link>terms and policies</Link>
                            </label>
                        </div>
                        <div className="flex-1 border-2 border-gray-500 rounded-lg p-6">
                            <ul className="mt-2 flex space-x-4 border-b border-gray-300">
                                <li>
                                    <p className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">
                                        MORE INFORMATION ABOUT YOU
                                    </p>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <form noValidate onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-gray-700">Bio</label>
                                                    <textarea
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your Bio"
                                                    />
                                                    {formErrors.email && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                                </div>

                                                {/* Current career and Ielts Certificate */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-gray-700">Current career</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="text"
                                                            name="yearsOfExperience"
                                                            value={formData.yearsOfExperience}
                                                            onChange={handleChange}
                                                            placeholder="Your current career..."
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">Ielts Certificate</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="file"
                                                            name="ieltsGrade"
                                                            value={formData.ieltsGrade}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Number of Year Experience and IELTS grade on one row */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-gray-700">Number of Years Experience</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="text"
                                                            name="yearsOfExperience"
                                                            value={formData.yearsOfExperience}
                                                            onChange={handleChange}
                                                            placeholder="Number of years experience..."
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">IELTS Grade</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="text"
                                                            name="ieltsGrade"
                                                            value={formData.ieltsGrade}
                                                            onChange={handleChange}
                                                            placeholder="Your IELTS grade..."
                                                        />
                                                    </div>
                                                </div>

                                                {/* Specialization checkboxes */}
                                                <div>
                                                    <label className="block text-gray-700">Specialization</label>
                                                    <div className="flex space-x-4">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="listening"
                                                                checked={formData.specialization.listening}
                                                                onChange={handleChange}
                                                            />
                                                            <span className="ml-2">Listening</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="speaking"
                                                                checked={formData.specialization.speaking}
                                                                onChange={handleChange}
                                                            />
                                                            <span className="ml-2">Speaking</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="reading"
                                                                checked={formData.specialization.reading}
                                                                onChange={handleChange}
                                                            />
                                                            <span className="ml-2">Reading</span>
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                name="writing"
                                                                checked={formData.specialization.writing}
                                                                onChange={handleChange}
                                                            />
                                                            <span className="ml-2">Writing</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                            >
                                                Save Changes
                                            </button>
                                            {/* Success, Pending, and Error messages */}
                                            {changePasswordStatus === "success" && (
                                                <p className="font-mono text-xs text-green-500 text-center mt-2">
                                                    Change password successful!
                                                </p>
                                            )}
                                            {changePasswordStatus === "pending" && (
                                                <p className="font-mono text-xs text-yellow-500 text-center mt-2">Changing...</p>
                                            )}
                                            {changePasswordStatus === "failed" && (
                                                <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfileSection;
