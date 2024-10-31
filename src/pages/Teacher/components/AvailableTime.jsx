import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Profile } from '../../../redux/users/UserSlice';
import defaulAvatar from "../../../assets/images/default-avatar.jpg";
import { useParams } from "react-router-dom";
import { GetSchedule7Days } from '../../../redux/Schedule/ScheduleSlice';
import { Link, useNavigate } from "react-router-dom";
import { CheckAuthUser } from '../../../service/checkAuth';

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
    const { schedules, scheduleStatus, scheduleError } = useSelector((state) => state.schedule);
    const { userInfor } = useSelector((state) => state.user);

    // Dispatch to fetch teacher profile and schedule
    useEffect(() => {
        if (teachername) {
            dispatch(Profile(teachername));
            dispatch(GetSchedule7Days(teachername));
        }
    }, [dispatch, teachername]);

    return (
        <div className="pt-2">
            <div className="bg-white p-4 rounded shadow mb-4">
                <div className="flex items-center space-x-2 mb-2">
                    <img
                        src={userInfor?.imageURL || defaulAvatar}
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
                                                                <p className="text-xs text-green-500">{item.price} ₫</p>
                                                                <p className="text-xs text-red-500">Pending</p>
                                                            </div>
                                                        ) : (
                                                            // Nếu không phải Pending, cho phép bấm vào Link
                                                            <Link to="/schedulepaymentmethod"
                                                                state={{
                                                                    scheduleId: item.id,
                                                                    teacherName: userInfor?.name,
                                                                    startTime: new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                    endTime: new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                    price: item.price
                                                                }}
                                                                className="w-full text-left focus:outline-none p-2">
                                                                <p className="text-sm font-bold text-gray-700">
                                                                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                </p>
                                                                <p className="text-xs text-green-500">{item.price} ₫</p>
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
                                                                    <p className="text-xs text-green-500">{item.price} ₫</p>
                                                                    <p className="text-xs text-red-500">Pending</p>
                                                                </div>
                                                            ) : (
                                                                // Nếu không phải Pending, cho phép bấm vào Link
                                                                <Link to="/schedulepaymentmethod"
                                                                    state={{
                                                                        teacherName: userInfor?.name,
                                                                        startTime: new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                        endTime: new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                                                                        price: item.price
                                                                    }}
                                                                    className="w-full text-left focus:outline-none p-2">
                                                                    <p className="text-sm font-bold text-gray-700">
                                                                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                                                    </p>
                                                                    <p className="text-xs text-green-500">{item.price} ₫</p>
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
            </div>
        </div>
    );
};

export default AvailableTime;
