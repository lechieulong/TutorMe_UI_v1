/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { updateEnabledStatus } from "../../../redux/classes/ClassSlice";
import { useDispatch } from "react-redux";
import useAuthToken from "../../../hooks/useAuthToken";
import CreateClass from "../CreateClass";
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
  onSwitchChange,
  onSelect,
  isActive,
  handleDeleteClassSuccess, // Passed down function to trigger reload in ClassList
}) => {
  const author = useAuthToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const dispatch = useDispatch();
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

  const handleSwitchChange = () => {
    const newStatus = !isSwitchOn;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị lớp học này không?"
      : "Bạn có chắc muốn tắt hiển thị lớp học này không?";

    if (window.confirm(confirmationMessage)) {
      // Gọi action Redux để cập nhật trạng thái
      dispatch(
        updateEnabledStatus({ classId: classItem.id, isEnabled: newStatus })
      )
        .then(() => {
          setIsSwitchOn(newStatus); // Cập nhật trạng thái trong component
          alert(`Lớp học đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`);
          // Gọi callback để xử lý cập nhật danh sách nếu cần
          onSwitchChange && onSwitchChange(classItem.id, newStatus);
        })
        .catch((error) => {
          console.error("Cập nhật trạng thái lớp học thất bại", error);
          alert("Đã xảy ra lỗi khi cập nhật trạng thái lớp học.");
        });
    }
  };

  const handleCardClick = () => {
    if (author == null) {
      navigate("/login");
    }
    if (mentorAndList) {
      return;
    }

    if (!isSwitchOn) {
      alert("Lớp học này hiện không khả dụng.");
      onSelect && onSelect(false);
    } else {
      onSelect && onSelect(classItem.id);
      if (location.pathname.includes("/classOfCourse")) {
        navigate(`/classDetail/${classItem.courseId}/${classItem.id}`, {
          state: { mentorAndList },
        });
      }
    }
  };

  const handleDeleteClass = async () => {
    const confirmationMessage =
      "Bạn có chắc muốn xóa lớp học này? Hành động này không thể hoàn tác.";
    if (window.confirm(confirmationMessage)) {
      try {
        const response = await axios.delete(
          `https://localhost:7030/api/class/${classItem.id}`
        );
        if (response.status === 200) {
          alert("Lớp học đã được xóa thành công.");
          handleDeleteClassSuccess(); // Trigger reload in ClassList component
          navigate("/somewhere"); // Redirect to another page after deleting
        } else {
          alert("Không thể xóa lớp học này.");
        }
      } catch (error) {
        console.error("Xóa lớp học thất bại", error);
      }
    }
  };
  const handleUpdateClass = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7030/api/class/${classItem.id}`
      );

      if (response?.data?.isSuccess) {
        const classData = response.data?.result;

        // Truyền dữ liệu vào CreateClass
        onSelect &&
          onSelect({
            className: classData.className,
            classDescription: classData.description,
            count: classData.enrollmentCount,
            startDate: classData.startDate,
            endDate: classData.endDate,
            isEnabled: classData.isEnabled,
            type: "update",
          });
      } else {
        alert("Không thể lấy thông tin lớp học.");
      }
    } catch (error) {
      console.error("Gặp lỗi khi lấy thông tin lớp học:", error);
      alert("Không thể lấy thông tin lớp học.");
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
            Người ghi danh: {classItem.enrollmentCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Ngày bắt đầu: {classItem.startDate}
          </p>
        </div>

        {mentorAndList && (
          <div className="pl-4 pr-4 flex items-center justify-between">
            <GreenSwitch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "Green switch" }}
            />
            <div>
              <button
                onClick={handleDeleteClass}
                className="text-red-500 text-sm font-semibold hover:text-red-700"
              >
                Xóa
              </button>
              <button
                onClick={handleUpdateClass}
                className="text-red-500 text-sm font-semibold hover:text-red-700"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
