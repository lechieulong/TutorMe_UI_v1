import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MainLayout from '../../layout/MainLayout';
import { FaCalendarAlt, FaExternalLinkSquareAlt, FaBuffer, FaHourglassEnd, FaPeopleArrows } from "react-icons/fa";
import { getUser } from '../../service/GetUser';
import { Roles } from '../../utils/config';
import { useNavigate, Link } from "react-router-dom";
import { GetScheduleSessionByUserId, GetIsBookedScheduleSessionByUserId } from '../../redux/Schedule/BookedScheduleSessionSlice';
import { formatDateTime } from '../../utils/Validator';
import Cookies from "js-cookie";

const CoachingSchedule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userFromToken, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('booked'); // state to manage active tab
    const [sortConfig, setSortConfig] = useState({ key: 'startTime', direction: 'asc' });

    const { scheduleSessions, getScheduleSessionStatus, isBookedScheduleSessions, getIsbookedScheduleSessionStatus } = useSelector((state) => state.bookedScheduleSession);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token) {
            navigate("/"); // Redirect to Landing Page if no token
        }
    }, [navigate]);

    useEffect(() => {
        dispatch(GetScheduleSessionByUserId());
        dispatch(GetIsBookedScheduleSessionByUserId()); // Fetch data for 'isBooked' as well
    }, [dispatch]);

    const tableData = useMemo(() => {
        const schedulesToUse = activeTab === 'booked' ? scheduleSessions : isBookedScheduleSessions;
        return schedulesToUse.map(session => {
            const { startTime, endTime } = session.teacherAvailableSchedule;
            const start = new Date(startTime);
            const end = new Date(endTime);
            const now = new Date();
            const bookedTime = new Date(session.bookedDate);

            let status;
            if (now < start) {
                status = 'Not yet';
            } else if (now >= start && now <= end) {
                status = 'On Going';
            } else {
                status = 'Done';
            }

            return {
                id: session.id,
                teacherName: session.teacherAvailableSchedule.teacher.name,
                learnerName: session.learner.name,
                startTime: start.toLocaleString(),
                endTime: end.toLocaleString(),
                price: session.teacherAvailableSchedule.price,
                duration: session.teacherAvailableSchedule.minutes,
                status,
                link: session.teacherAvailableSchedule.link,
                bookedDate: bookedTime.toLocaleString()
            };
        });
    }, [scheduleSessions, isBookedScheduleSessions, activeTab]);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    const filteredTableData = useMemo(() => {
        return tableData.filter(task => {
            const teacherNameMatches = task.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
            const learnerNameMatches = task.learnerName.toLowerCase().includes(searchQuery.toLowerCase());
            const durationMatches = task.duration.toString().includes(searchQuery);

            return teacherNameMatches || learnerNameMatches || durationMatches;
        });
    }, [tableData, searchQuery]);

    const sortData = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const sortedTableData = useMemo(() => {
        const sorted = [...filteredTableData]; // Make a copy of filteredTableData to sort
        const { key, direction } = sortConfig;
    
        return sorted.sort((a, b) => {
            const aValue = key === 'bookedDate' ? new Date(a[key]) : a[key];
            const bValue = key === 'bookedDate' ? new Date(b[key]) : b[key];
    
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredTableData, sortConfig]);

    return (
        <MainLayout>
            <div className="bg-slate-100 min-h-screen">
                <div className="max-w-5xl mx-auto p-4">
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">CONNECTION BETWEEN TEACHERS AND STUDENTS</h1>
                            <p className="text-gray-600">Coaching 1:1 <Link to="/coachingschedule" className="text-blue-500"> - Set more schudule</Link></p>
                        </div>
                    </header>

                    {/* Tabs */}
                    <div className="flex mb-4">
                        <button
                            className={`text-sm font-medium px-4 py-2 w-full text-center rounded-t-lg transition-all duration-300 ${activeTab === 'booked' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                            onClick={() => setActiveTab('booked')}
                        >
                            The session you booked
                        </button>
                        {userFromToken?.role?.includes(Roles.TEACHER) && (
                            <button
                                className={`text-sm font-medium px-4 py-2 w-full text-center rounded-t-lg transition-all duration-300 ${activeTab === 'isBooked' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                onClick={() => setActiveTab('isBooked')}
                            >
                                Your session is booked
                            </button>
                        )}
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {/* Schedule Table */}
                        <div className="p-2 bg-gray-100">
                            <div className="flex justify-between items-center mb-1">
                                <input
                                    type="text"
                                    placeholder="Search by teacher name or duration"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border border-gray-300 px-2 py-1 rounded-md w-1/4 text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-96">
                            <table className="min-w-full bg-white text-left border">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700 border-b">
                                        <th className="p-3 font-semibold text-sm cursor-pointer"
                                            onClick={() => sortData(activeTab === 'booked' ? 'teacherName' : 'learnerName')}
                                        >
                                            <FaPeopleArrows className="inline mr-1" /> Coaching with
                                        </th>
                                        <th className="p-3 font-semibold text-sm cursor-pointer" onClick={() => sortData('status')}>
                                            <FaBuffer className="inline mr-1" /> Status
                                        </th>
                                        <th className="p-3 font-semibold text-sm cursor-pointer" onClick={() => sortData('startTime')}>
                                            <FaCalendarAlt className="inline mr-1" /> Coaching Time
                                        </th>
                                        <th className="p-3 font-semibold text-sm cursor-pointer" onClick={() => sortData('duration')}>
                                            <FaHourglassEnd className="inline mr-1" /> Duration
                                        </th>
                                        <th className="p-3 font-semibold text-sm">
                                            <FaExternalLinkSquareAlt className="inline mr-1" /> Link
                                        </th>
                                        <th className="p-3 font-semibold text-sm cursor-pointer" onClick={() => sortData('bookedDate')}>
                                            <FaCalendarAlt className="inline mr-1" /> Booked date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm">
                                    {sortedTableData.map((task, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition duration-200">
                                            <td className="p-2 pl-4">{activeTab === 'booked' ? task.teacherName : task.learnerName}</td>
                                            <td className="p-2">{task.status}</td>
                                            <td className="p-2">{formatDateTime(task.startTime)} - {formatDateTime(task.endTime)}</td>
                                            <td className="p-2">{task.duration} min</td>
                                            <td className="p-2">
                                                <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                                    View Link
                                                </a>
                                            </td>
                                            <td className="p-2">{formatDateTime(task.bookedDate)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CoachingSchedule;
