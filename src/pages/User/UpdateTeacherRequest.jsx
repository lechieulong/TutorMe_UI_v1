import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainLayout from '../../layout/MainLayout';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { BeTeacher } from '../../redux/users/UserSlice';
import { GetSpecialization } from '../../redux/specialization/SpecializationSlice';
import { uploadFile } from '../../redux/testExam/TestSlice';
import { GetUserEducation } from '../../redux/users/UserSlice';;
import { GetTeacherRequestByUserId } from '../../redux/users/UserSlice';
import { UpdaterTeacherRequest } from '../../redux/users/UserSlice';

const EducationSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Extracting specializations and user data from Redux state
    const { specializations, getspecializationstatus } = useSelector((state) => state.specialization);
    const { updateTeacherResponse, updateTeacherRequestStatus, userEducation, updateTeacherRequestError } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(GetSpecialization());
        dispatch(GetUserEducation());
        dispatch(GetTeacherRequestByUserId());
    }, [dispatch]);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/"); // Redirect to Landing Page if no token
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        aboutMe: "",
        career: "",
        degreeURL: "",
        yearsOfExperience: "",
        grade: "",
        specialization: {},
        acceptedTerms: false,
    });

    const [formErrors, setFormErrors] = useState({});

    // Pre-fill formData if userEducation data is available
    useEffect(() => {
        if (userEducation) {
            setFormData((prevData) => ({
                ...prevData,
                aboutMe: userEducation.aboutMe || "",
                career: userEducation.career || "",
                degreeURL: userEducation.degreeURL || "",
                yearsOfExperience: userEducation.yearExperience || "",
                grade: userEducation.grade || "",
                specialization: userEducation.specializationIds?.reduce((acc, id) => {
                    acc[id] = true;
                    return acc;
                }, {}),
            }));
        }
    }, [userEducation]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resultAction = await dispatch(uploadFile(file));
                if (uploadFile.fulfilled.match(resultAction)) {
                    const fileUrl = resultAction.payload.fileUrl;
                    setFormData((prevData) => ({ ...prevData, degreeURL: fileUrl }));
                } else {
                    console.error("Upload failed:", resultAction.error.message);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));

        if (type === "checkbox" && specializations.find((spec) => spec.id === name)) {
            setFormData((prevData) => ({
                ...prevData,
                specialization: {
                    ...prevData.specialization,
                    [name]: checked
                }
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.aboutMe) errors.aboutMe = "Bio is required";
        if (!formData.career) errors.career = "Career is required";
        if (!formData.degreeURL) errors.degreeURL = "IELTS Certificate is required";
        if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0) {
            errors.yearsOfExperience = "Years of Experience must be a positive number";
        }
        if (!formData.grade || formData.grade <= 0) {
            errors.grade = "IELTS Grade must be a positive number";
        }
        if (!formData.acceptedTerms) errors.acceptedTerms = "You must accept the terms and policies";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const userData = {
                teacherId: userEducation?.teacherId || "",
                aboutMe: formData.aboutMe,
                grade: Number(formData.grade),
                degreeURL: formData.degreeURL,
                career: formData.career,
                yearExperience: Number(formData.yearsOfExperience),
                isApprove: false,
                isReject: false,
                specializationIds: Object.keys(formData.specialization)
                    .filter(key => formData.specialization[key]),
            };
            try {
                const resultAction = await dispatch(UpdaterTeacherRequest(userData));
                if (UpdaterTeacherRequest.fulfilled.match(resultAction)) {
                    navigate("/beteacher");
                } else {
                    setFormErrors({ server: 'Failed to submit. Please try again.' });
                }
            } catch (error) {
                console.error('Error during dispatch:', error);
                setFormErrors({ server: 'An unexpected error occurred.' });
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <MainLayout>
            <div className="flex w-full">
                <Sidebar />
                <div className="flex-1 p-6">
                    <div className="flex gap-8 bg-gray-100 p-6 px-12">
                        <div className="hidden md:flex md:w-1/3 flex-col items-start">
                            <div className="mb-3 text-base text-red-600 shadow-sm italic">
                                <p>Make sure all information you provide is true.</p>
                            </div>
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    name="acceptedTerms"
                                    required
                                    checked={formData.acceptedTerms}
                                    onChange={handleChange}
                                />
                                Accept our <Link to="/terms" target="_blank">terms and policies</Link>
                            </label>
                            {formErrors.acceptedTerms && (
                                <p className="font-mono text-red-500 text-xs mt-1">{formErrors.acceptedTerms}</p>
                            )}
                        </div>
                        <div className="flex-1 border-2 border-gray-500 rounded-lg p-6">
                            <ul className="flex space-x-4 border-b border-gray-300">
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
                                                        name="aboutMe"
                                                        value={formData.aboutMe}
                                                        onChange={handleChange}
                                                        placeholder="Enter your Bio"
                                                    />
                                                    {formErrors.aboutMe && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.aboutMe}</p>}
                                                </div>

                                                {/* Current career and IELTS Certificate */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-gray-700">Current career</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="text"
                                                            name="career"
                                                            value={formData.career}
                                                            onChange={handleChange}
                                                            placeholder="Your current career..."
                                                        />
                                                        {formErrors.career && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.career}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">IELTS Certificate</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="file"
                                                            name="degreeURL"
                                                            onChange={(e) => handleFileChange(e)} // Updated to handle file change separately
                                                        />
                                                        {formErrors.degreeURL && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.degreeURL}</p>}
                                                    </div>
                                                </div>

                                                {/* Number of Years Experience and IELTS grade on one row */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-gray-700">Number of Years Experience</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="number"
                                                            name="yearsOfExperience"
                                                            value={formData.yearsOfExperience}
                                                            onChange={handleChange}
                                                            placeholder="Number of years experience..."
                                                        />
                                                        {formErrors.yearsOfExperience && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.yearsOfExperience}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700">IELTS Grade</label>
                                                        <input
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            type="number"
                                                            name="grade"
                                                            value={formData.grade}
                                                            onChange={handleChange}
                                                            placeholder="Your IELTS grade..."
                                                        />
                                                        {formErrors.grade && <p className="font-mono text-red-500 text-xs mt-1">{formErrors.grade}</p>}
                                                    </div>
                                                </div>

                                                {/* Specialization checkboxes from Redux state */}
                                                <div>
                                                    <label className="block text-gray-700">Specialization</label>
                                                    <div className="flex space-x-4">
                                                        {getspecializationstatus === 'pending' ? (
                                                            <p>Loading specializations...</p>
                                                        ) : (
                                                            specializations?.map((specialization) => (
                                                                <label className="flex items-center" key={specialization.id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        name={specialization.id}
                                                                        checked={formData.specialization[specialization.id] || false}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <span className="ml-2">{specialization.name}</span>
                                                                </label>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            {/* Handling pending status */}
                                            {updateTeacherRequestStatus === "pending" && (
                                                <p className="font-mono px-4 py-2 text-xs text-yellow-500 text-center mt-2">Resubminting...</p>
                                            )}

                                            {/* Handling failed status */}
                                            {updateTeacherRequestStatus === "failed" && (
                                                <p className="font-mono px-4 py-2 text-xs text-red-500 text-center mt-2">{updateTeacherRequestError}</p>
                                            )}
                                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400">
                                                Resubmit
                                            </button>
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

export default EducationSection;
