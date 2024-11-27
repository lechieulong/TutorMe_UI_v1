import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { FaFilter, FaPeopleArrows, FaHourglassEnd, FaExternalLinkSquareAlt, FaFeatherAlt, FaCalendarAlt, FaBuffer } from "react-icons/fa";
import { GetTopTeachers } from '../../redux/users/UserSlice';
import { getUser } from '../../service/GetUser';
import { Roles } from '../../utils/config';
import { SetSchedule } from '../../redux/Schedule/ScheduleSlice';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GetUserEducationByUsername } from '../../redux/users/UserSlice';
import BookedSchedule from '../Schedule/Scheduled';
import "react-toastify/dist/ReactToastify.css";

const CoachingSchedule = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'about');
    const { user } = useSelector((state) => state.user);
    const { teachername } = useParams();

    const [userFromToken, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();

    // Initialize schedules data
    const schedules = [
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023', duration: '10', link: '' },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023', duration: '10', link: ''  },
        { status: 'ON GOING', assignee: 'Nguyen Van Sy (K16 FPT)', dueDate: 'Oct 20, 2023', duration: '20', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 21, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 4, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 10, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 29, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 30, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023', duration: '10', link: '' },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023', duration: '30', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 21, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 4, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 10, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 29, 2023', duration: '10', link: ''  },
        { status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 30, 2023', duration: '10', link: ''  },
    ];

    // Sorting state initialization
    const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });

    // Sorting function
    const sortData = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    // Memoizing the sorted schedules
    const sortedSchedules = useMemo(() => {
        return [...schedules].sort((a, b) => {
            if (sortConfig.key === 'dueDate') {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortConfig.key === 'duration') {
                return sortConfig.direction === 'asc' ? a.duration - b.duration : b.duration - a.duration;
            }
            if (sortConfig.key === 'assignee' || sortConfig.key === 'status') {
                return sortConfig.direction === 'asc' ? a[sortConfig.key].localeCompare(b[sortConfig.key]) : b[sortConfig.key].localeCompare(a[sortConfig.key]);
            }
            return 0;
        });
    }, [schedules, sortConfig]); // Re-run when schedules or sortConfig change

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    const { setStatus, error } = useSelector((state) => state.schedule);

    return (
        <MainLayout>
            <div className="bg-slate-100 min-h-screen">
                <div className="max-w-5xl mx-auto p-4">
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">CONNECTION BETWEEN TEACHERS AND STUDENTS</h1>
                            <p className="text-gray-600">Coaching 1:1
                                <Link to="/coachingschedule" className="text-blue-500"> - Set more schudule</Link>
                            </p>
                        </div>
                    </header>

                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <div className="text-gray-700 font-semibold">
                                    {/* Tab Buttons */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex space-x-4">
                                            <button className="text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 text-sm rounded transition duration-150">
                                                The session you booked
                                            </button>
                                            {userFromToken?.role?.includes(Roles.TEACHER) && (
                                                <button className="bg-gray-100 hover:bg-gray-200 px-2 py-1 text-sm rounded transition duration-150">
                                                    Your session is booked
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <hr className="mb-2" />

                                    {/* Schedule Table */}
                                    <div className="rounded-lg shadow-md">
                                        <div className="p-2 bg-gray-100">
                                            <div className="flex justify-between items-center mb-1">
                                                <input
                                                    type="text"
                                                    placeholder="Search list"
                                                    className="border border-gray-300 px-2 py-1 rounded-md w-1/4 text-sm focus:outline-none focus:border-blue-500"
                                                />
                                                <div className="flex items-center space-x-1 text-gray-600 text-sm">
                                                    <FaFilter className="text-sm" />
                                                    <span className="font-medium">Filter</span>
                                                </div>
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
                                                            <FaPeopleArrows className="inline mr-1" /> Coaching with
                                                        </th>
                                                        <th
                                                            className="p-3 font-semibold text-sm cursor-pointer"
                                                            onClick={() => sortData('status')}
                                                        >
                                                            <FaBuffer className="inline mr-1" /> Status
                                                        </th>
                                                        <th
                                                            className="p-3 font-semibold text-sm cursor-pointer"
                                                            onClick={() => sortData('dueDate')}
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
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 text-sm">
                                                    {sortedSchedules.map((task, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition duration-200">
                                                            <td className="p-2 pl-4">{task.assignee}</td>
                                                            <td className="p-2 pl-4">{task.status}</td>
                                                            <td className="p-2 pl-4">{task.dueDate}</td>
                                                            <td className="p-2 pl-4">{task.duration} minutes</td>
                                                            <td className="p-2 pl-4">
                                                                <a href={task.link} target="_blank" rel="noopener noreferrer">
                                                                    Link Meet
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </MainLayout>
    );
};

export default CoachingSchedule;
