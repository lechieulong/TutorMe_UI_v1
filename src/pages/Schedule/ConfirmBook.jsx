import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { formatDOB } from '../../utils/Validator';
import { CheckBanlance, GiveMeMyMoney } from '../../components/common/PayOS';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetScheduleSession } from '../../redux/Schedule/BookedScheduleSessionSlice';

function PaymentMethod() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { scheduleId, teacherId, teacherName, date, startTime, endTime, price, status } = location.state || {};
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(price);

    const handleBack = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    const { user } = useSelector((state) => state.user);

    const handleCheckOut = async (e) => {
        if (status !== 0) {
            toast.error("This time is not available now. Plese choose other time!");
        } else if (await CheckBanlance(price)) {
            await GiveMeMyMoney(user.id, price * -1, `Book schedule with teacher ${teacherName}`);
            await GiveMeMyMoney(teacherId, price, `Your schedule has been booked by ${user.name}`);
            //Xu ly so du, add schedule book session
            // After successful payment, create the schedule session
            try {
                const learnerId = user.id;
                const sessionData = {
                    scheduleId,
                    learnerId
                };

                // Dispatch SetScheduleSession to save the schedule session
                const response = await dispatch(SetScheduleSession(sessionData));
                if (response.payload) {
                    toast.success("Session booked successfully!");
                    // Optionally, navigate to a confirmation or session details page
                    navigate("/coachingschedule/bookedschedule"); // Replace with your confirmation route
                }
            } catch (error) {
                toast.error("Failed to book the session. Please try again.");
            }

        } else {
            const userChoice = window.confirm("Số dư không đủ. Bạn có muốn nạp tiền không?");
            if (userChoice) {
                window.location.href = "/Payment";
            } else {
                toast.error("Fail to book schedule.");
            }
        }
    };

    return (
        <MainLayout>
            <ToastContainer autoClose={3000} newestOnTop closeOnClick />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white shadow-md rounded-md">
                    <div className="bg-gray-800 text-white py-4 rounded-t-md">
                        <h2 className="text-lg font-semibold text-center">CHECK INFORMATION</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-center mb-4">
                            <label className="flex items-center space-x-2">
                                {/* <input type="radio" name="payment" className="form-radio text-blue-600" defaultChecked />
                                <span>Pay with Diamond</span> */}
                                <p className="font-mono text-center text-red-500 text-xs mt-1">This transaction will be kept 15 minutes for you. Please keep screen on, and process check out.</p>
                            </label>
                        </div>
                        {status === 1 || status === 2 && (
                            <p className="font-mono text-red-500 text-xs mt-1">This schedule is not available now.</p>
                        )}
                        <div className="border border-gray-300 p-4 rounded-md space-y-4">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Set schedule with Teacher:</span>
                                <span>{teacherName || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Date:</span>
                                <span>{formatDOB(date) || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Start Time:</span>
                                <span>{startTime || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">End Time:</span>
                                <span>{endTime || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Total:</span>
                                <span>{formattedAmount || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4 mt-6">
                            <button onClick={handleBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md">CANCEL</button>
                            <button onClick={handleCheckOut} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">CHECK OUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default PaymentMethod;
