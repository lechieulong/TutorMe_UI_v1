import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ClassCard = ({
  classItem,
  switchState,
  onSwitchChange,
  onSelect,
  isActive,
  userRole,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    const fetchEnabledStatus = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7030/api/class/${classItem.id}/enabled`
        );
        if (typeof response.data.isEnabled === "boolean") {
          setIsSwitchOn(response.data.isEnabled);
        } else {
          console.error("Phản hồi từ API không hợp lệ");
        }
      } catch (error) {
        console.error("Không thể tải trạng thái enabled của lớp học", error);
      }
    };

    fetchEnabledStatus();
  }, [classItem.id]);

  const handleSwitchChange = async () => {
    const newStatus = !isSwitchOn;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị class không?"
      : "Bạn có chắc muốn tắt hiển thị class không?";

    if (window.confirm(confirmationMessage)) {
      try {
        const response = await axios.put(
          `https://localhost:7030/api/class/${classItem.id}/enabled`,
          newStatus,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (typeof response.data.isEnabled === "boolean") {
          setIsSwitchOn(response.data.isEnabled);
          console.log(
            `Switch status: ${response.data.isEnabled ? "Enabled" : "Disabled"}`
          );
          alert(
            `Class đã được ${
              response.data.isEnabled ? "hiển thị" : "ẩn"
            } thành công.`
          );
          onSwitchChange(classItem.id, response.data.isEnabled);
        } else {
          throw new Error("Phản hồi từ API không hợp lệ");
        }
      } catch (error) {
        console.error("Cập nhật trạng thái class thất bại", error);
      }
    }
  };

  const handleCardClick = () => {
    if (!isSwitchOn) {
      alert("Lớp học này không khả dụng.");
      onSelect(false);
    } else {
      onSelect && onSelect(classItem.id); // Gọi hàm onSelect nếu có
    }
  };

  return (
    <div
      className={`flex-shrink-0 w-1/4 p-1 cursor-pointer transition-transform duration-300 ${
        isActive
          ? "border-2 border-green-300 rounded-lg" // Có border nếu isActive là true
          : "border border-transparent" // Không có border nếu isActive là false
      }`}
      onClick={handleCardClick} // Gọi handleCardClick khi click vào
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

        {userRole !== "USER" && (
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
