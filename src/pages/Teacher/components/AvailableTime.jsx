import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Profile } from '../../../redux/users/UserSlice';
import defaulAvatar from "../../../assets/images/default-avatar.jpg";
import { useParams } from "react-router-dom";
import { GetSchedule7Days } from '../../../redux/Schedule/ScheduleSlice';
import { Link, useNavigate } from "react-router-dom";
import { CheckAuthUser } from '../../../service/checkAuth';
import { formatCurrency } from '../../../utils/Validator';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { DeleteSchedule, UpdateSchedule } from '../../../redux/Schedule/ScheduleSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to get the day names
const getNext7Days = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        next7Days.push(i === 0 ? 'Today' : daysOfWeek[futureDate.getDay()]);
    }
    return next7Days;
};

const AvailableTime = () => {
    const isAuthenticated = CheckAuthUser();
    const dispatch = useDispatch();
    const days = getNext7Days();
    const { teachername } = useParams();

    // Get schedule and user information from Redux store
    const { schedules, scheduleStatus, scheduleError, updateStatus, updateError } = useSelector((state) => state.schedule);
    const { userInfor, user } = useSelector((state) => state.user);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        startTime: '',
        price: 0,
        minute: 0, // default to available
        link: '',
        id: '', // schedule Id for update
        teacherId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const now = new Date().toISOString().slice(0, 16);

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

    const openConfirmPopup = (scheduleId) => {
        setSelectedScheduleId(scheduleId);
        setIsConfirmOpen(true);
    };

    const closeConfirmPopup = () => {
        setIsConfirmOpen(false);
        setSelectedScheduleId(null);
    };

    const openUpdatePopup = (item) => {
        setSelectedSchedule(item);
        setFormData({
            startTime: item.startTime,
            price: item.price,
            minutes: item.minutes,
            link: item.link,
            id: item.id,
            teacherId: item.teacherId,
        });
        setIsUpdateModalOpen(true);
    };

    const closeUpdatePopup = () => {
        setIsUpdateModalOpen(false);
        setSelectedSchedule(null);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(DeleteSchedule(selectedScheduleId)).unwrap();
            toast.success("Schedule deleted successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to delete schedule.");
        } finally {
            closeConfirmPopup();
        }
    };

    // Dispatch to fetch teacher profile and schedule
    useEffect(() => {
        if (teachername) {
            dispatch(Profile(teachername));
            dispatch(GetSchedule7Days(teachername));
        }
    }, [dispatch, teachername]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            try {
                await dispatch(UpdateSchedule(formData)).unwrap();
                toast.success("Schedule updated successfully!");
                closeUpdatePopup();
            } catch (error) {
                toast.error(error.message || "Failed to update schedule.");
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="pt-2">
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <img
                        src={userInfor?.imageURL || "https://hydra13.blob.core.windows.net/2aa17120-4bef-478a-8ea9-cb0788def29e/default-avatar.jpg"}
                        alt={`${userInfor?.name} profile`}
                        className="rounded-full w-10 h-10"
                    />
                    <div>
                        <p className="font-semibold">{userInfor?.name}</p>
                        <p className="text-gray-500 text-xs">
                            Be teacher · Aug 10, 2024 <i className="fas fa-globe"></i>
                        </p>
                    </div>
                </div>
            </div>

            {/* Today's schedule */}
            <div className="bg-white p-4 rounded shadow mb-4">
                {isAuthenticated ? (
                    <>
                        {scheduleStatus === "loading" ? (
                            <p>Loading schedule...</p>
                        ) : scheduleError ? (
                            <p>Error loading schedule: {scheduleError}</p>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold mb-4">{days[0]}</h2>
                                    <div className="flex">
                                        <div className="grid grid-cols-5 gap-4">
                                            {Array.isArray(schedules) && schedules
                                                .filter((item) => new Date(item.startTime).getDay() === new Date().getDay()) // Today's schedule
                                                .map((item, index) => (
                                                    <div key={index}
                                                        className={`px-4 border transition-shadow duration-200 ${item.status === 1 ? 'bg-gray-300 cursor-not-allowed' : ''}`}>
                                                        {item.status === 1 ? (
                                                            // Nếu status = 1, chỉ hiển thị thông tin mà không có Link
                                                            <div className="w-full text-left p-2">
                                                                <p className="text-sm font-bold text-gray-700">
                                                                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                </p>
                                                                <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                                <p className="text-xs text-red-500">Pending</p>
                                                            </div>
                                                        ) : item.status === 0 && user?.userName === userInfor?.userName ? (
                                                            <>
                                                                <button className="text-red-500 bg-white" onClick={() => openUpdatePopup(item)}>
                                                                    <FaRegEdit />
                                                                </button>
                                                                <button className="text-red-500 bg-white" onClick={() => openConfirmPopup(item.id)}>
                                                                    <FaRegTrashAlt />
                                                                </button>
                                                                <div className="w-full text-left focus:outline-none p-2">
                                                                    <p className="text-sm font-bold text-gray-700">
                                                                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                    </p>
                                                                    <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                                </div>
                                                            </>
                                                        ) : item.status === 0 && user?.userName !== userInfor?.userName && (
                                                            <Link to="/schedulepaymentmethod"
                                                                state={{
                                                                    scheduleId: item.id,
                                                                    teacherName: userInfor?.name,
                                                                    teacherId: userInfor?.id,
                                                                    date: new Date(item.startTime).toLocaleDateString(),
                                                                    startTime: new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                    endTime: new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                    price: item.price,
                                                                    status: item.status
                                                                }}
                                                                className="w-full text-left focus:outline-none p-2">
                                                                <p className="text-sm font-bold text-gray-700">
                                                                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                </p>
                                                                <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            {/* Show message if no schedules are available today */}
                                            {Array.isArray(schedules) && schedules
                                                .filter((item) => new Date(item.startTime).getDay() === new Date().getDay()).length === 0 && (
                                                    <p className="col-span-5 text-center text-gray-500">No schedule available today.</p>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                {/* Next 6 days schedule */}
                                {days.slice(1).map((day, index) => (
                                    <div className="mb-8" key={index}>
                                        <h2 className="text-lg font-bold mb-4">{day}</h2>
                                        <div className="flex">
                                            <div className="grid grid-cols-5 gap-4">
                                                {Array.isArray(schedules) && schedules
                                                    .filter((item) => new Date(item.startTime).getDay() === (new Date().getDay() + index + 1) % 7) // Schedule for next days
                                                    .map((item, idx) => (
                                                        <div key={idx}
                                                            className={`px-4 border transition-shadow duration-200 ${item.status === 1 ? 'bg-gray-300 cursor-not-allowed' : ''}`}>
                                                            {item.status === 1 ? (
                                                                // Nếu status = 1, chỉ hiển thị thông tin mà không có Link
                                                                <div className="w-full text-left p-2">
                                                                    <p className="text-sm font-bold text-gray-700">
                                                                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                    </p>
                                                                    <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                                    <p className="text-xs text-red-500">Pending</p>
                                                                </div>
                                                            ) : item.status === 0 && user?.userName === userInfor?.userName ? (
                                                                <>
                                                                    {/* // Nếu không phải Pending, cho phép bấm vào Link */}
                                                                    <button className="text-red-500 bg-white" onClick={() => openUpdatePopup(item)}>
                                                                        <FaRegEdit />
                                                                    </button>
                                                                    <button className="text-red-500 bg-white" onClick={() => openConfirmPopup(item.id)}>
                                                                        <FaRegTrashAlt />
                                                                    </button>
                                                                    <div className="w-full text-left focus:outline-none p-2">
                                                                        <p className="text-sm font-bold text-gray-700">
                                                                            {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                        </p>
                                                                        <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                                    </div>
                                                                </>
                                                            ) : item.status === 0 && user?.userName !== userInfor?.userName && (
                                                                <Link to="/schedulepaymentmethod"
                                                                    state={{
                                                                        scheduleId: item.id,
                                                                        teacherName: userInfor?.name,
                                                                        teacherId: userInfor?.id,
                                                                        date: new Date(item.startTime).toLocaleDateString(),
                                                                        startTime: new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                        endTime: new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                        price: item.price,
                                                                        status: item.status
                                                                    }}
                                                                    className="w-full text-left focus:outline-none p-2">
                                                                    <p className="text-sm font-bold text-gray-700">
                                                                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                    </p>
                                                                    <p className="text-xs text-green-500">{formatCurrency(item.price)}</p>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                {/* Show message if no schedules are available for the day */}
                                                {Array.isArray(schedules) && schedules
                                                    .filter((item) => new Date(item.startTime).getDay() === (new Date().getDay() + index + 1) % 7).length === 0 && (
                                                        <p className="col-span-5 text-center text-gray-500">No schedule available on {day}.</p>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        <p className="">You need to be logged in to view available times.</p>
                    </div>
                )}

                {/* Delete modal */}
                {isConfirmOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this schedule? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={closeConfirmPopup}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* update modal */}
                {isUpdateModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                            <h2 className="text-2xl font-bold mb-4">Update Schedule</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        min={now}
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
                                        onClick={closeUpdatePopup}
                                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-400 text-white px-4 py-2 rounded">
                                        Submit
                                    </button>
                                </div>
                                {/* Status Messages */}
                                {updateStatus === "pending" && (
                                    <p className="font-mono text-xs text-yellow-500 text-center mt-2">Setting...</p>
                                )}
                                {updateStatus === "failed" && (
                                    <p className="font-mono text-xs text-red-500 text-center mt-2">{updateError}</p>
                                )}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableTime;
