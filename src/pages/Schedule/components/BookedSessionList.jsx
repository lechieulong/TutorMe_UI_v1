import React from 'react';
import { FaBuffer, FaCalendarAlt, FaHourglassEnd, FaExternalLinkSquareAlt } from "react-icons/fa";

const BookedSessionList = ({ sortedTableData, sortData, getScheduleSessionStatus }) => {
    return (
        <div className="rounded-lg shadow-md">
            <div className="p-2 bg-gray-100">
                <div className="flex justify-between items-center mb-1">
                    <input
                        type="text"
                        placeholder="Search list"
                        className="border border-gray-300 px-2 py-1 rounded-md w-1/4 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="overflow-y-auto max-h-96">
                <table className="min-w-full bg-white text-left border">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 border-b">
                            <th
                                className="p-3 font-semibold text-sm cursor-pointer"
                                onClick={() => sortData('assignee')}
                            >
                                <FaBuffer className="inline mr-1" /> Coaching with
                            </th>
                            <th
                                className="p-3 font-semibold text-sm cursor-pointer"
                                onClick={() => sortData('status')}
                            >
                                <FaBuffer className="inline mr-1" /> Status
                            </th>
                            <th
                                className="p-3 font-semibold text-sm cursor-pointer"
                                onClick={() => sortData('startTime')}
                            >
                                <FaCalendarAlt className="inline mr-1" /> Coaching Time
                            </th>
                            <th
                                className="p-3 font-semibold text-sm cursor-pointer"
                                onClick={() => sortData('duration')}
                            >
                                <FaHourglassEnd className="inline mr-1" /> Duration
                            </th>
                            <th className="p-3 font-semibold text-sm">
                                <FaExternalLinkSquareAlt className="inline mr-1" /> Link
                            </th>
                            <th className="p-3 font-semibold text-sm cursor-pointer"
                                onClick={() => sortData('bookedDate')}
                            >
                                <FaCalendarAlt className="inline mr-1" /> Booked date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {getScheduleSessionStatus === "pending" && (
                            <p className="font-mono text-xs text-yellow-500 text-center mt-2">Loading...</p>
                        )}
                        {sortedTableData.map((task, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition duration-200">
                                <td className="p-2 pl-4">{task.teacherName}</td>
                                <td className="p-2 pl-4">{task.status}</td>
                                <td className="p-2 pl-4">{task.startTime} - {task.endTime}</td>
                                <td className="p-2 pl-4">{task.duration} minutes</td>
                                <td className="p-2 pl-4">
                                    <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        Link Meet
                                    </a>
                                </td>
                                <td className="p-2 pl-4">{task.bookedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookedSessionList;
