import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ClassCard = ({
  classItem,
  switchState,
  onSwitchChange,
  onSelect,
  isActive,
}) => {
  const location = useLocation();
  const [isSwitchOn, setIsSwitchOn] = useState(
    switchState || classItem.isEnabled
  ); // Sử dụng isEnabled từ classItem

  useEffect(() => {
    setIsSwitchOn(switchState);
  }, [switchState]);

  const isCourseDetailWithClassId =
    location.pathname.startsWith("/courseDetail/");
  const isMentorCourseDetail = location.pathname.startsWith(
    "/mentorCourseDetail/"
  );
  const isClassOfCourse = location.pathname.startsWith("/classOfCourse");

  const handleSwitchChange = async () => {
    const newStatus = !isSwitchOn;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị class không?"
      : "Bạn có chắc muốn tắt hiển thị class không?";

    if (window.confirm(confirmationMessage)) {
      try {
        await axios.put(
          `https://localhost:7030/api/class/${classItem.id}/enabled`,
          newStatus,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setIsSwitchOn(newStatus);
        alert(`Class đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`);
        onSwitchChange(classItem.id, newStatus);
      } catch (error) {
        console.error("Cập nhật trạng thái class thất bại", error);
      }
    }
  };

  const handleCardClick = () => {
    // Kiểm tra nếu classItem không được kích hoạt
    if (!classItem.isEnabled) {
      onSelect(false); // Gọi hàm onSelect với false
      alert("Lớp học này không khả dụng."); // Thông báo cho người dùng
    } else if (isCourseDetailWithClassId && onSelect) {
      onSelect(classItem.id); // Gọi hàm onSelect với classId
    }
  };

  if (!classItem) return null; // Kiểm tra xem classItem có tồn tại không

  return (
    <div
      className={`flex-shrink-0 w-1/4 p-1 cursor-pointer transition-transform duration-300 ${
        isCourseDetailWithClassId && isActive
          ? "border-2 border-green-300 rounded-lg"
          : "border border-transparent"
      }`}
      onClick={handleCardClick}
    >
      <div className="border rounded-md shadow-md overflow-hidden transition-shadow duration-300 relative">
        <div className="p-4">
          <h5 className="font-bold text-gray-700">{classItem.className}</h5>
          <p className="text-gray-600">{classItem.classDescription}</p>
          <p className="text-gray-500">
            Thời gian: {classItem.startTime} - {classItem.endTime}
          </p>
          <p className="text-gray-500">
            Ngày bắt đầu: {new Date(classItem.startDate).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            Ngày kết thúc: {new Date(classItem.endDate).toLocaleDateString()}
          </p>
        </div>

        {/* Switch Button: Show only on mentorCourseDetail page, not on classOfCourse */}
        {isMentorCourseDetail && !isClassOfCourse && (
          <div className="absolute bottom-4 right-4 flex items-center">
            <input
              type="checkbox"
              className="hidden peer"
              id={`switch-${classItem.id}`}
              checked={isSwitchOn}
              onChange={handleSwitchChange}
            />
            <label
              htmlFor={`switch-${classItem.id}`}
              className="cursor-pointer w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 transition-colors duration-300 ease-in-out peer-checked:bg-green-400"
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
