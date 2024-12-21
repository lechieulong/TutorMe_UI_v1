import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDOB } from "../../utils/Validator";
import { CheckBanlance, GiveMeMyMoney } from "../../components/common/PayOS";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetScheduleSession } from "../../redux/Schedule/BookedScheduleSessionSlice";

function PaymentMethod() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    scheduleId,
    teacherId,
    teacherName,
    date,
    startTime,
    endTime,
    content,
    price,
    status,
  } = location.state || {};
  const formattedAmount = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);

  const handleBack = () => {
    navigate(-1);
  };

  const { user } = useSelector((state) => state.user);

  // State để theo dõi trạng thái loading
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOut = async (e) => {
    if (status !== 0) {
      toast.error(
        "This time is not available now. Please choose another time!"
      );
    } else if (await CheckBanlance(price)) {
      setIsLoading(true); // Bắt đầu trạng thái loading

      await GiveMeMyMoney(
        user.id,
        price * -1,
        `Book schedule with teacher ${teacherName}`,
        "Schedule"
      );
      await GiveMeMyMoney(
        teacherId,
        price,
        `Your schedule has been booked by ${user.name}`,
        "Schedule"
      );

      try {
        const learnerId = user.id;
        const sessionData = {
          scheduleId,
          learnerId,
        };

        const response = await dispatch(SetScheduleSession(sessionData));
        if (response.payload) {
          toast.success("Session booked successfully!");
          navigate("/coachingschedule/bookedschedule");
        }
      } catch (error) {
        toast.error("Failed to book the session. Please try again.");
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    } else {
      const userChoice = window.confirm(
        "Your balance is insufficient. Do you want to top-up?"
      );
      if (userChoice) {
        window.location.href = "/Payment";
      } else {
        toast.error("Failed to book schedule.");
      }
    }
  };

  return (
    <MainLayout>
      <ToastContainer autoClose={3000} newestOnTop closeOnClick />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-md">
          <div className="bg-gray-800 text-white py-4 rounded-t-md">
            <h2 className="text-lg font-semibold text-center">
              CHECK INFORMATION
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex justify-center mb-4">
              <label className="flex items-center space-x-2">
                <p className="font-mono text-center text-red-500 text-xs mt-1">
                  This transaction will be kept 15 minutes for you. Please keep
                  the screen on and process checkout.
                </p>
              </label>
            </div>
            {status === 1 ||
              (status === 2 && (
                <p className="font-mono text-red-500 text-xs mt-1">
                  This schedule is not available now.
                </p>
              ))}
            <div className="border border-gray-300 p-4 rounded-md space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Set schedule with Teacher:
                </span>
                <span>{teacherName || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Content:</span>
                <span>{content || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Date:</span>
                <span>{formatDOB(date) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Time:</span>
                <span>
                  {startTime || "N/A"} - {endTime || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Total:</span>
                <span>{formattedAmount || "N/A"}</span>
              </div>
            </div>
            <div className="flex justify-between space-x-4 mt-6">
              <button
                onClick={handleBack}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
              >
                CANCEL
              </button>
              <button
                onClick={handleCheckOut}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay và vòng tròn chấm xoay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </MainLayout>
  );
}

export default PaymentMethod;
