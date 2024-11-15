import React, { useState, useEffect } from 'react';
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

    const tasks = [
        { key: 'SCRUM-120', summary: 'Profile Teacher', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023' },
        { key: 'SCRUM-114', summary: 'Lock account(Login fail 5 times) - Admin', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023' },
        { key: 'SCRUM-113', summary: 'Manage account - Admin', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 20, 2023' },
        { key: 'SCRUM-132', summary: 'Import user (file excel)', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 21, 2023' },
        { key: 'SCRUM-107', summary: 'Set Calendar', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 4, 2023' },
        { key: 'SCRUM-102', summary: 'Set Schedule 1-1', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Oct 10, 2023' },
        { key: 'SCRUM-92', summary: 'Change pass , forgot pass', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 29, 2023' },
        { key: 'SCRUM-80', summary: 'Register Teacher', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 30, 2023' },
        { key: 'SCRUM-78', summary: 'Set Calendar BE + FE', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 29, 2023' },
        { key: 'SCRUM-71', summary: 'Report UI', status: 'DONE', assignee: 'Nguyen Van Sy (K16 ...)', dueDate: 'Sep 21, 2023' },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    useEffect(() => {
    }, [dispatch]);

    const { teachers } = useSelector((state) => state.user);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const now = new Date();
    const formatDateTimeLocal = (date) => {
        return date.toISOString().slice(0, 16);
    };

    const nowFormatted = formatDateTimeLocal(now);

    const [formData, setFormData] = useState({
        startTime: "",
        minutes: "",
        price: "",
        link: "",
        isBooked: false,
        teacherId: "" // Add appropriate teacherId here if necessary
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.startTime) errors.startTime = "Start Time is required";
        if (!formData.minutes) {
            errors.minutes = "Minutes is required";
        } else if (!Number.isInteger(Number(formData.minutes))) {
            errors.minutes = "Minutes must be a valid integer";
        }
        if (!formData.price) {
            errors.price = "Price is required";
        } else if (!Number.isInteger(Number(formData.price))) {
            errors.price = "Price must be a valid integer";
        }
        if (!formData.link) errors.link = "Link is required";
        return errors;
    };

    const handleSearch = (term) => {
        console.log("Search term:", term);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                await dispatch(SetSchedule(formData)).unwrap(); // Unwrap to get the response
                setFormData({
                    startTime: "",
                    minutes: "",
                    price: "",
                    link: "",
                    isBooked: false,
                    teacherId: ""
                });

                toast.success("Set schedule successful");
                setActiveTab('availableTime');
                localStorage.setItem('activeTab', 'availableTime');
                navigate(`/coachingschedule/${user.userName}`);

                toggleModal();
            } catch (error) {
                console.log(error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const { setStatus, error } = useSelector((state) => state.schedule);

    return (
        <MainLayout>
            <div className="bg-slate-100">
                <div className="max-w-5xl mx-auto p-4">
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">CONNECTION BETWEEN TEACHERS AND STUDENTS</h1>
                            <p className="text-gray-600">Coaching 1:1
                                {userFromToken?.role?.includes(Roles.TEACHER) && (
                                    <a href={`/coachingschedule`} className="text-blue-500"> - Set more schudule</a>
                                )}
                            </p>
                        </div>
                    </header>

                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="text-gray-700 font-semibold">
                                    {/* Tab Buttons */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex space-x-4">
                                            <button className="text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-150">
                                                The session you booked
                                            </button>
                                            {userFromToken?.role?.includes(Roles.TEACHER) && (
                                                <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition duration-150">
                                                    Your session is booked
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <hr className="mb-2" />

                                    {/* Schedule Table */}
                                    <div className="rounded-lg shadow-md overflow-hidden">
                                        <div className="p-2 bg-gray-100">
                                            <div className="flex justify-between items-center mb-1">
                                                <input
                                                    type="text"
                                                    placeholder="Search list"
                                                    className="border border-gray-300 p-2 rounded-md w-1/3 focus:outline-none focus:border-blue-500"
                                                />
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <FaFilter />
                                                    <span className="font-medium">Filter</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg overflow-hidden">
                                            <table className="min-w-full bg-white text-left border">
                                                <thead>
                                                    <tr className="bg-gray-200 text-gray-700 border-b">
                                                        <th className="p-3 font-semibold text-sm"><FaFeatherAlt className="inline mr-1" /> Summary</th>
                                                        <th className="p-3 font-semibold text-sm"><FaBuffer className="inline mr-1" /> Status</th>
                                                        <th className="p-3 font-semibold text-sm"><FaPeopleArrows className="inline mr-1" /> Coaching with</th>
                                                        <th className="p-3 font-semibold text-sm"><FaCalendarAlt className="inline mr-1" /> Coaching Time</th>
                                                        <th className="p-3 font-semibold text-sm"><FaHourglassEnd className="inline mr-1" /> Duration</th>
                                                        <th className="p-3 font-semibold text-sm"><FaExternalLinkSquareAlt className="inline mr-1" /> Link</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tasks.map((task, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 border-b">
                                                            <td className="p-3 text-gray-700">{task.summary}</td>
                                                            <td className="p-3">
                                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                                                                    {task.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-gray-700">
                                                                <span>{task.assignee}</span>
                                                            </td>
                                                            <td className="p-3 text-gray-700">{task.dueDate}</td>
                                                            <td className="p-3 text-gray-700">10 minutes</td>
                                                            <td className="p-3">
                                                                <a href="#" className="text-blue-500 underline">Link</a>
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
                </div>
            </div>
            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
        </MainLayout>
    );
};

export default CoachingSchedule;
