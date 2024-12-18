import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Admin_GetTeacherRequests } from '../../redux/ADMIN/TeacherSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleLeft, FaAngleRight, FaExternalLinkAlt } from "react-icons/fa";
import Pagination from './Pagination';
import { formatDateTime } from '../../utils/Validator';
import { Link } from 'react-router-dom';

const TeacherRequests = () => {
    const dispatch = useDispatch();
    const { requests, getRequestsStatus, getRequestsError, totalPages } = useSelector((state) => state.ADMIN_teachers);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(0); // 0 for Pending, 1 for Accepted, 2 for Rejected
    const pageSize = 20;
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const truncateText = (text, maxLength) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

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
        setCurrentPage(1);
    };

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
                        className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-lightGreen"
                    />
                    {["Pending", "Accepted", "Rejected"].map((status, index) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(index)}
                            className={`${statusFilter === index ? "bg-mainColor" : "bg-gray-400"
                                } text-white px-4 py-2 rounded-lg shadow hover:bg-accentGreen transition`}
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
            ) : requests && requests.length > 0 ? (
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600">
                            {/* <th className="py-1 px-3">ID</th> */}
                            <th className="py-1 px-3">Name</th>
                            <th className="py-1 px-3">Email</th>
                            <th className="py-1 px-3">Description</th>
                            <th className="py-1 px-3">Created at</th>
                            <th className="py-1 px-3">Last update</th>
                            <th className="py-1 px-3"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {requests.map((request) => (
                            <tr
                                key={request.id}
                                className="border-b border-gray-200"
                                onMouseEnter={() => setHoveredRowId(request.id)} // Set hover state
                                onMouseLeave={() => setHoveredRowId(null)} // Reset hover state
                            >
                                {/* <td className="py-3 px-4">{request.id}</td> */}
                                <td className="py-3 px-4">{request.user.name}</td>
                                <td className="py-3 px-4">{request.user.email}</td>
                                <td className="py-3 px-4 relative">
                                    {/* Truncated text */}
                                    <span>{truncateText(request.description, 50)}</span>

                                    {/* Tooltip - only show if this row is hovered */}
                                    {hoveredRowId === request.id && request.description.length > 50 && (
                                        <div className="absolute bg-gray-700 text-white text-xs rounded-lg p-2 top-full left-0 mt-1 w-64 z-10">
                                            {request.description}
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 px-4">{formatDateTime(request.createAt)}</td>
                                <td className="py-3 px-4">{request.updateAt ? formatDateTime(request.updateAt) : 'N/A'}</td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <Link to={`${request.id}`}>
                                        <FaExternalLinkAlt className="text-green-500 cursor-pointer hover:text-green-400" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-600 py-4">No teacher requests found.</div>
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
