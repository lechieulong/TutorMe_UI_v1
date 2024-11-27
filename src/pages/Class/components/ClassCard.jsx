import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#007549",
    "&:hover": {
      backgroundColor: alpha("#007549", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#007549",
  },
}));

const ClassCard = ({
  mentorAndList,
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

  if (!isSwitchOn && !mentorAndList) {
    return null;
  }

  const handleSwitchChange = async (event) => {
    const newStatus = event.target.checked;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị lớp học này không?"
      : "Bạn có chắc muốn tắt hiển thị lớp học này không?";

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
          alert(
            `Lớp học đã được ${
              response.data.isEnabled ? "hiển thị" : "ẩn"
            } thành công.`
          );
          onSwitchChange &&
            onSwitchChange(classItem.id, response.data.isEnabled);
        } else {
          throw new Error("Phản hồi từ API không hợp lệ");
        }
      } catch (error) {
        console.error("Cập nhật trạng thái lớp học thất bại", error);
      }
    }
  };

  const handleCardClick = () => {
    if (!isSwitchOn) {
      alert("Lớp học này hiện không khả dụng.");
      onSelect && onSelect(false);
    } else {
      onSelect && onSelect(classItem.id);
      if (location.pathname.includes("/classOfCourse")) {
        navigate(`/classDetail/${classItem.courseId}/${classItem.id}`);
      }
    }
  };

  const cardClassName = location.pathname.includes("/classOfCourse")
    ? "flex-shrink-0 w-full sm:w-1/1 md:w-1/2 lg:w-1/2 p-2 cursor-pointer"
    : "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer";

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      <div
        className={`border rounded-lg shadow hover:shadow-lg transition-transform duration-200 ${
          isActive ? "border-green-400" : "border-gray-200"
        }`}
      >
        <div className="pl-4 pr-4 pt-4 bg-white">
          <h5 className="text-lg font-semibold text-gray-800">
            {classItem.className}
          </h5>
          <p className="text-sm text-gray-500 mt-1">
            Thời gian: {classItem.startTime} - {classItem.endTime}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Người ghi danh: {classItem.enrollmentCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Ngày bắt đầu: {classItem.startDate}
          </p>
        </div>

        {mentorAndList && (
          <div className="pl-4 pr-4 flex items-center justify-end">
            <GreenSwitch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "Green switch" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
