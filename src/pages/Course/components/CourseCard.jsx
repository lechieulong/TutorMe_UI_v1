/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import Notification from "../../../components/common/Notification";
import { formatCurrency } from "../../../utils/Validator";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { updateCourseStatus } from "../../../redux/courses/CourseSlice";
import Confirm from "../../../components/common/Confirm";

const CourseCard = ({
  content,
  courseName,
  Skill,
  teacher,
  courseId,
  classId,
  imageUrl,
  price,
  onDelete = null,
  isEnabled,
  onSwitchChange,
}) => {
  const location = useLocation();
  const isMentorCourseList = location.pathname === "/mentorCourseList";
  const isMyLearning = location.pathname === "/mylearning";
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(
    isMentorCourseList ? isEnabled : true
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null); // Store the action to confirm
  const [notification, setNotification] = useState("");
  const [should, setShould] = useState("");

  if (!isMentorCourseList && !isEnabled) {
    return null;
  }

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

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(courseId);
      setNotification("Khóa học đã được xóa thành công.");
    }
  };

  const handleSwitchChange = () => {
    const newStatus = !isSwitchOn;

    // Cập nhật hành động xác nhận và mở modal
    setConfirmationAction(() => () => {
      dispatch(updateCourseStatus({ courseId, isEnabled: newStatus })) // Chuyển đúng tham số
        .then(() => {
          setIsSwitchOn(newStatus); // Cập nhật trạng thái trong component
          setNotification(
            `Khóa học đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`
          );
          setShould("yes");
          onSwitchChange && onSwitchChange(courseId, newStatus);
        })
        .catch(() => {
          setNotification("Đã xảy ra lỗi khi cập nhật trạng thái lớp học.");
          setShould("no");
        });
    });

    // Mở modal xác nhận
    setShowConfirm(true);
  };

  const getSkillNames = (skillData) => {
    if (typeof skillData === "string") {
      const skills = skillData.split(",").map((s) => parseInt(s.trim(), 10));
      return skills
        .map((skill) => {
          switch (skill) {
            case 0:
              return "Reading";
            case 1:
              return "Listening";
            case 2:
              return "Writing";
            case 3:
              return "Speaking";
            default:
              return null;
          }
        })
        .filter((name) => name !== null)
        .join(", ");
    } else if (Array.isArray(skillData)) {
      const skills = skillData.map((s) => parseInt(s, 10));
      return skills
        .map((skill) => {
          switch (skill) {
            case 0:
              return "Reading";
            case 1:
              return "Listening";
            case 2:
              return "Writing";
            case 3:
              return "Speaking";
            default:
              return null;
          }
        })
        .filter((name) => name !== null)
        .join(", ");
    } else {
      return "Unknown";
    }
  };

  let destinationPath;
  if (location.pathname === "/mentorCourseList") {
    destinationPath = `/mentorCourseDetail/${courseId}`;
  } else if (location.pathname === "/courseList") {
    destinationPath = `/courseDetail/${courseId}`;
  } else if (isMyLearning) {
    destinationPath = `/classDetail/${courseId}/${classId}`;
  }
  return (
    <div className="relative bg-white shadow-md rounded-lg flex flex-col hover:bg-gray-100 transition-all">
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification("")}
          should={should}
        />
      )}

      <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
        {isMentorCourseList && (
          <>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="bg-transparent text-red-400 hover:text-red-700"
              aria-label="Delete Course"
            >
              <FaTrash />
            </button>
            <GreenSwitch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "Green switch" }}
            />
          </>
        )}
      </div>

      <Link
        to={destinationPath}
        state={{ Skill, fromMentorCourseList: isMentorCourseList }}
        className="flex-grow flex flex-col items-start"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={courseName}
            className="w-full h-60 object-cover rounded-t-lg mb-4"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg text-black mb-1">{courseName}</h3>
          <p className="text-gray-600 mb-2 text-left overflow-hidden text-ellipsis line-clamp-3 min-h-[4.5rem]">
            {content}
          </p>

          <span className="text-sm font-medium text-blue-600 mb-2">
            Skill: {getSkillNames(Skill)}
          </span>

          <div className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Teacher: </span>
            {teacher}
          </div>
          <div className="text-lg font-thin text-black-500">
            {price ? formatCurrency(price) : "Free"}
          </div>
        </div>
      </Link>

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmationAction}
        message="Are you sure you want to change the course status?"
        status="Confirmation"
        should="yes"
      />
    </div>
  );
};

export default CourseCard;
