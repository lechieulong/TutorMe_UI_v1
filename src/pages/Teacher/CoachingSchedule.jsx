import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { FaSearch } from "react-icons/fa";
import About from './components/About';
import Certification from './components/Certification';
import AvailableTime from './components/AvailableTime';
import { GetTopTeachers } from '../../redux/users/UserSlice';
import { getUser } from '../../service/GetUser';
import { Roles } from '../../utils/config';
import { SetSchedule } from '../../redux/Schedule/ScheduleSlice';
import Search from './components/Search';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoachingSchedule = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'about');
    const { teachername } = useParams();

    const [userFromToken, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        dispatch(GetTopTeachers());
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
            <div className="pt-5 bg-slate-100">
                <div className="max-w-5xl mx-auto p-4">
                    <header className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">CONNECTION BETWEEN TEACHERS AND STUDENTS</h1>
                            <p className="text-gray-600">Coaching 1:1 · 145.2K members</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {userFromToken?.role?.includes(Roles.TEACHER) && (
                                <button
                                    onClick={toggleModal}
                                    className="bg-green-400 text-white px-4 py-2 rounded">
                                    Set Schedule
                                </button>
                            )}
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Teacher</button>
                            <button className="bg-yellow-300 text-white px-4 py-2 rounded">Scheduled</button>
                        </div>
                    </header>

                    {/* Teacher Profile and Search Section */}
                    <div className="flex items-center space-x-2 mb-4">
                        {teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <a href={`/coachingschedule/${teacher.userName}`} className="inline-block" key={teacher.userName}>
                                    <img
                                        src={teacher.imageURL || `https://placehold.co/40x40`}
                                        alt={`Profile of ${teacher.name}`}
                                        className="rounded-full w-10 h-10"
                                    />
                                </a>
                            ))
                        ) : (
                            <p className="text-gray-600">No teachers available.</p>
                        )}
                        <div className="flex items-center">
                            <button onClick={toggleSearch} className="bg-slate-100 text-blue-500 px-4 py-2 ml-2 rounded">
                                <FaSearch className="text-2xl" />
                            </button>
                        </div>
                        {/* Display Search Component if search is visible */}
                        {isSearchVisible && (
                            <Search onSearch={handleSearch} />
                        )}
                    </div>

                    {/* Tabs */}
                    {teachername ? (
                        <>
                            <nav className="flex space-x-4 mb-2">
                                <button
                                    onClick={() => handleTabChange('about')}
                                    className={`pb-1 ${activeTab === 'about' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Information
                                </button>
                                <button
                                    onClick={() => handleTabChange('certification')}
                                    className={`pb-1 ${activeTab === 'certification' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Certification
                                </button>
                                <button
                                    onClick={() => handleTabChange('availableTime')}
                                    className={`pb-1 ${activeTab === 'availableTime' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}>
                                    Available time
                                </button>
                            </nav>

                            {activeTab === 'about' && <About />}
                            {activeTab === 'certification' && <Certification />}
                            {activeTab === 'availableTime' && <AvailableTime />}
                        </>
                    ) : (
                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1">
                                <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                                    <p className="text-gray-700 font-semibold">
                                        Select a teacher you want to connect with...
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for Set Schedule */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                                <h2 className="text-2xl font-bold mb-4">Set Schedule</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            min={nowFormatted}
                                            required
                                        />
                                        {formErrors.startTime && <p className="text-red-500 text-xs">{formErrors.startTime}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Minutes</label>
                                        <input
                                            type="number"
                                            name="minutes"
                                            value={formData.minutes}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                        {formErrors.minutes && <p className="text-red-500 text-xs">{formErrors.minutes}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                        {formErrors.price && <p className="text-red-500 text-xs">{formErrors.price}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                                        <input
                                            type="url"
                                            name="link"
                                            value={formData.link}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                        {formErrors.link && <p className="text-red-500 text-xs">{formErrors.link}</p>}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={toggleModal}
                                            className="bg-gray-400 text-white px-4 py-2 rounded mr-2">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-400 text-white px-4 py-2 rounded">
                                            Submit
                                        </button>
                                    </div>
                                    {/* Success message */}
                                    {setStatus === "pending" && (
                                        <p className="font-mono text-xs text-yellow-500 text-center mt-2">Setting...</p>
                                    )}
                                    {setStatus === "failed" && (
                                        <p className="font-mono text-xs text-red-500 text-center mt-2">{error}</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
        </MainLayout>
    );
};

export default CoachingSchedule;
