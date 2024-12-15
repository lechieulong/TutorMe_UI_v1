/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnenrolledClasses } from "../../../redux/classes/ClassSlice";
import Notification from "../../../components/common/Notification";
import Confirm from "../../../components/common/Confirm";
import { useNavigate } from "react-router-dom";
import useAuthToken from "../../../hooks/useAuthToken";
import { CheckBanlance, GiveMeMyMoney } from "../../../components/common/PayOS";
import { enrollUser } from "../../../redux/Enrollment/EnrollmentSlice";
const ClassToEnroll = ({ courseId, userId, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useAuthToken();
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [notification, setNotification] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const unenrolledClasses = useSelector(
    (state) => state.classes.unenrolledClassesByCourse[courseId] || []
  );
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    if (courseId && userId) {
      dispatch(fetchUnenrolledClasses({ courseId, userId }));
    }
  }, [courseId, userId, dispatch]);

  const handleClassClick = (classId) => {
    setSelectedClassId((prev) => (prev === classId ? null : classId));
  };

  if (status === "loading") {
    return <p>Loading classes...</p>;
  }

  const handleEnroll = async () => {
    if (authToken == null) {
      navigate("/login");
    }

    if (!selectedClassId) {
      setNotification("Bạn chưa chọn lớp.");
      return;
    }

    // Tìm thông tin lớp đã chọn
    const selectedClass = unenrolledClasses.find(
      (classItem) => classItem.classId === selectedClassId
    );

    if (!selectedClass) {
      setNotification("Lớp bạn chọn không tồn tại.");
      return;
    }

    const { price, userId: classOwnerId, className } = selectedClass;

    const hasSufficientBalance = await CheckBanlance(price);
    if (!hasSufficientBalance) {
      const userChoice = window.confirm(
        "Số dư không đủ. Bạn có muốn nạp tiền không?"
      );
      if (userChoice) {
        window.location.href = "/Payment";
      } else {
        setNotification("Đăng ký thất bại! Bạn không có đủ tiền.");
      }
      return;
    }

    setConfirmMessage(`Bạn chắc chắn muốn đăng ký lớp "${className}"?`);
    setConfirmStatus("Enroll");
    setConfirmAction(() => async () => {
      try {
        // Trừ tiền từ tài khoản người dùng
        await GiveMeMyMoney(userId, price * -1, `Đăng ký lớp ${className}`);
        // Chuyển tiền cho chủ sở hữu lớp
        await GiveMeMyMoney(
          classOwnerId,
          price,
          `Lớp của bạn đã được đăng ký bởi ${userId}`
        );
        console.log(courseId + "||" + userId + "||" + selectedClassId);

        // Gọi API để hoàn tất việc đăng ký
        await dispatch(
          enrollUser({ courseId, userId, classId: selectedClassId })
        ).unwrap();

        setNotification("Đăng ký thành công!");
      } catch (error) {
        setNotification("Đăng ký thất bại! Vui lòng thử lại.");
      }
      setIsConfirmOpen(false);
    });
    setIsConfirmOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Classes to Enroll</h2>
        <div className="max-h-60 overflow-y-auto">
          {unenrolledClasses.length > 0 ? (
            unenrolledClasses.map((classItem) => (
              <div
                key={classItem.classId} // Sử dụng classId làm key
                className={`p-4 mb-2 border rounded-lg cursor-pointer ${
                  selectedClassId === classItem.classId ? "bg-blue-100" : ""
                }`}
                onClick={() => handleClassClick(classItem.classId)} // Sử dụng classId để so sánh
              >
                {classItem.className}
              </div>
            ))
          ) : (
            <p>No unenrolled classes available.</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleEnroll}
          >
            Submit
          </button>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />
      )}
      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        message={confirmMessage}
        status={confirmStatus}
      />
    </div>
  );
};

export default ClassToEnroll;
