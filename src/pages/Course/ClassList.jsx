import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorHeader from "../../components/Mentor/MentorHeader";
import MentorSidebar from "../../components/Mentor/MentorSideBar";
import { fetchClasses } from "../../redux/courses/CourseSlice";
import { useDispatch, useSelector } from "react-redux";

const ClassOfCourseList = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams(); // Get courseId from the URL parameters

    // Select classes, loading, and error from the Redux store
    const { classes, status, error } = useSelector((state) => state.courses);

    useEffect(() => {
        if (courseId) {
            dispatch(fetchClasses(courseId)); // Fetch classes based on courseId
        }
    }, [dispatch, courseId]);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <MentorHeader />
            <div className="flex flex-1 mt-16 w-full">
                <MentorSidebar />
                <div className="flex-1 p-4">
                    <h1 className="text-xl font-bold mb-4">Class List</h1>
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
                                            {/* Add actions like Edit/Delete buttons here if needed */}
                                            <button className="text-blue-600 hover:underline">Edit</button>
                                            <button className="text-red-600 hover:underline ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassOfCourseList;
