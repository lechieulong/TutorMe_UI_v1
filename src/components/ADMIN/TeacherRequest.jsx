import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Admin_GetTeacherRequests } from '../../redux/ADMIN/TeacherSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleLeft, FaAngleRight, FaExternalLinkAlt } from "react-icons/fa";
import Pagination from './Pagination';
import { formatDOB } from '../../utils/Validator';
import { Link } from 'react-router-dom';

const TeacherRequests = () => {
    const dispatch = useDispatch();
    const { requests, getRequestsStatus, getRequestsError, totalPages } = useSelector((state) => state.ADMIN_teachersReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(0); // 0 for Pending, 1 for Accepted, 2 for Rejected
    const pageSize = 2;

    // Fetch requests on component mount and when page or filters change
    useEffect(() => {
        dispatch(Admin_GetTeacherRequests({ page: currentPage, pageSize, status: statusFilter }));
    }, [dispatch, currentPage, statusFilter]);

    // Display success/failure notifications based on API status
    // useEffect(() => {
    //     if (getRequestsStatus === "failed") {
    //         toast.error(getRequestsError || "Failed to fetch requests.");
    //     }
    // }, [getRequestsStatus, getRequestsError]);

    // Handle status filter buttons
    const handleStatusChange = (status) => {
        setStatusFilter(status);
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Helper function to format dates
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    return (
        <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Teacher Requests</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-purple-300"
                    />
                    {["Pending", "Accepted", "Rejected"].map((status, index) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(index)}
                            className={`${statusFilter === index ? "bg-purple-700" : "bg-gray-400"
                                } text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display a loading spinner while data is being fetched */}
            {getRequestsStatus === "pending" ? (
                <div className="text-center text-sm text-yellow-300 py-4">Loading requests...</div>
            ) : getRequestsStatus === 'failed' ? (
                <div className="text-center text-sm text-red-500 py-4">An error occurred while fetching requests. Please try again later.</div>
            ) : (
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Description</th>
                            <th className="py-3 px-4">Created At</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {requests
                            .filter((request) =>
                                request.description.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((request) => (
                                <tr key={request.id} className="border-b border-gray-200">
                                    <td className="py-3 px-4">{request.id}</td>
                                    <td className="py-3 px-4">{request.user.name}</td>
                                    <td className="py-3 px-4">{request.user.email}</td>
                                    <td className="py-3 px-4">{request.description}</td>
                                    <td className="py-3 px-4">{formatDOB(formatDate(request.createAt))}</td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <Link to={`${request.id}`}>
                                            <FaExternalLinkAlt className="text-green-500 cursor-pointer hover:text-green-400" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
        </section>
    );
};

export default TeacherRequests;
