import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/common/Header";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import { fetchClasses } from "../../redux/courses/CourseSlice";
import { CreateClassAPI } from "../../redux/classes/ClassSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField";

const ClassOfCourseList = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams(); // Get courseId from the URL parameters

    // Select classes, loading, and error from the Redux store
    const { classes, status, error } = useSelector((state) => state.courses);
    const { createStatus } = useSelector((state) => state.classes);

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for the new class form
    const [newClassData, setNewClassData] = useState({
        className: "",
        classDescription: "",
        courseId: courseId,
        startDate: new Date().toISOString().substring(0, 10), // Default to today
        imageUrl: null, // Initialize as null for file handling
    });

    // Fetch classes based on courseId
    useEffect(() => {
        if (courseId) {
            dispatch(fetchClasses(courseId));
        }
    }, [dispatch, courseId]);

    // Open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setNewClassData({
            className: "",
            classDescription: "",
            courseId: courseId,
            startDate: new Date().toISOString().substring(0, 10),
            imageUrl: null,
        });
    };

    useEffect(() => {
        if (createStatus === "success") {
            dispatch(fetchClasses(courseId)); // Tải lại danh sách lớp sau khi thêm thành công
            closeModal(); // Đóng modal sau khi tạo lớp thành công
        }
    }, [createStatus, dispatch, courseId]);

    // State for form errors
    const [formErrors, setFormErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewClassData({
            ...newClassData,
            [name]: value,
        });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewClassData({
            ...newClassData,
            imageUrl: file.name, // Store the file object itself
        });
    };

    // Form validation logic
    const validateForm = () => {
        const errors = {};
        if (!newClassData.className) errors.className = "Class Name is required";
        if (!newClassData.classDescription) errors.classDescription = "Description is required";
        if (!newClassData.startDate) errors.startDate = "Start Date is required";
        if (!newClassData.imageUrl) errors.imageUrl = "Image is required";
        return errors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            dispatch(CreateClassAPI(newClassData)); // Dispatch the API call
        } else {
            setFormErrors(errors);
        }
    };

    // Close modal when the class is successfully created
    // useEffect(() => {
    //     if (createStatus === "success") {
    //         closeModal(); // Close modal after successful class creation
    //     }
    // }, [createStatus]);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <MentorHeader />
            <div className="flex flex-1 mt-16 w-full">
                <MentorSidebar />
                <div className="flex-1 p-4">
                    <h1 className="text-xl font-bold mb-4">Class List</h1>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
                        onClick={openModal}
                    >
                        Create Class
                    </button>

                    {status === "pending" && <p>Loading classes...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!error && classes.length === 0 && status !== "pending" && (
                        <p>No classes available for this course.</p>
                    )}
                    {classes.length > 0 && status !== "pending" && (
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Class ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Class Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Description</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((classItem) => (
                                    <tr key={classItem.id}>
                                        <td className="border border-gray-300 px-4 py-2">{classItem.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{classItem.className}</td>
                                        <td className="border border-gray-300 px-4 py-2">{classItem.classDescription}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button className="text-blue-600 hover:underline">Edit</button>
                                            <button className="text-red-600 hover:underline ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Modal for creating a class */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-2xl font-bold mb-4">Create New Class</h2>
                                <form onSubmit={handleSubmit}>
                                    <InputField
                                        label="Class Name"
                                        id="className"
                                        type="text"
                                        name="className"
                                        value={newClassData.className}
                                        onChange={handleChange}
                                        placeholder="Enter class name"
                                        error={formErrors.className}
                                    />
                                    <InputField
                                        label="Class Description"
                                        id="classDescription"
                                        type="textarea"
                                        name="classDescription"
                                        value={newClassData.classDescription}
                                        onChange={handleChange}
                                        placeholder="Enter class description"
                                        error={formErrors.classDescription}
                                    />
                                    <div className="mb-4">
                                        <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={newClassData.startDate}
                                            min={new Date().toISOString().substring(0, 10)} // Restrict to today and future dates
                                            onChange={handleChange}
                                            className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                                            required
                                        />
                                        {formErrors.startDate && (
                                            <p className="font-mono text-red-500 text-xs mt-1">{formErrors.startDate}</p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="imageUrl" className="block text-gray-700 font-semibold mb-1">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUrl"
                                            name="imageUrl"
                                            accept="image/*" // Restrict file selection to images only
                                            onChange={handleFileChange}
                                            className="block w-full h-12 px-4 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                                            required
                                        />
                                        {formErrors.imageUrl && (
                                            <p className="font-mono text-red-500 text-xs mt-1">{formErrors.imageUrl}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Create Class
                                        </button>
                                    </div>
                                </form>

                                {createStatus === "loading" && <p>Submitting...</p>}
                                {createStatus === "success" && (
                                    <p className="text-green-600">Class created successfully!</p>
                                )}
                                {createStatus === "error" && <p className="text-red-600">Error creating class.</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassOfCourseList;
