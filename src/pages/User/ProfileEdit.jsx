import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from '../../redux/users/UserSlice';
import { uploadFile } from '../../redux/testExam/TestSlice';

const ProfileEditSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfor, updateResponse, updateStatus, updateError } = useSelector((state) => state.user);

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Khởi tạo formData với giá trị mặc định từ userInfor
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        dob: '',
        imageURL: '',
    });

    // Cập nhật formData khi userInfor thay đổi
    useEffect(() => {
        if (userInfor) {
            setFormData({
                name: userInfor.name || '',
                phoneNumber: userInfor.phoneNumber || '',
                dob: userInfor.dob?.split('T')[0] || '', // Định dạng ngày
                imageURL: userInfor.imageURL || '',
            });
        }
    }, [userInfor]);

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resultAction = await dispatch(uploadFile(file));
                if (uploadFile.fulfilled.match(resultAction)) {
                    const fileUrl = resultAction.payload.fileUrl;
                    setFormData((prevData) => ({ ...prevData, imageURL: fileUrl }));
                } else {
                    console.error("Upload failed:", resultAction.error.message);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/; // Chỉ cho phép số có đúng 10 chữ số
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.dob) errors.dob = 'Date of birth is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updateData = {
            ...formData,
        };
        dispatch(UpdateProfile(updateData));
    };

    return (
        <MainLayout>
            <div className="flex w-full">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="bg-gray-100 p-6 border-2 border-gray-500 rounded-lg">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <img
                                src={formData.imageURL || defaultAvatar}
                                alt="Avatar"
                                className="size-24 bg-gray-200 mx-8 rounded-full flex items-center justify-center mb-4 lg:mb-0"
                            />
                            <div className="flex-1 lg:ml-4">
                                <h4 className="text-xl font-semibold">{formData.name}</h4>
                                <p className="text-gray-600 text-sm">@{userInfor?.email}</p>
                                <div className="my-1">
                                    <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-xs">{userInfor?.userName}</span>
                                    <p className="text-gray-500 text-xs mt-1">Joined 09 Dec 2017</p>
                                </div>
                                <label className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs cursor-pointer">
                                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e)} accept="image/*"/>
                                    Change Photo
                                </label>
                            </div>
                        </div>
                        <ul className="mt-2 flex space-x-4 border-b border-gray-300">
                            <li>
                                <p className="py-3 px-6 text-blue-800 border-b-2 border-blue-800 font-bold text-lg">Edit Profile</p>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm">Full Name</label>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                                type="text"
                                                placeholder="Full Name"
                                            />
                                            {formErrors.name && <p className="text-red-600 text-xs">{formErrors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm">Date Of Birth</label>
                                            <input
                                                name="dob"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                                type="date"
                                            />
                                            {formErrors.dob && <p className="text-red-600 text-xs">{formErrors.dob}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm">Phone Number</label>
                                        <input
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            type="text"
                                            placeholder="Phone Number"
                                        />
                                        {formErrors.phoneNumber && <p className="text-red-600 text-xs">{formErrors.phoneNumber}</p>}
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save Changes</button>
                                    </div>
                                    {updateStatus === "success" && (
                                        <p className="font-mono text-xs text-green-500 text-center mt-2">
                                            Profile updated successfully!
                                        </p>
                                    )}
                                    {updateStatus === "pending" && (
                                        <p className="font-mono text-xs text-yellow-500 text-center mt-2">Updating profile...</p>
                                    )}
                                    {updateStatus === "failed" && (
                                        <p className="font-mono text-xs text-red-500 text-center mt-2">{updateError}</p>
                                    )}
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
