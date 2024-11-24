import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Notification from "../../../components/common/Notification";
import { formatCurrency } from "../../../utils/Validator";

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
}) => {
  const location = useLocation();
  const isMentorCourseList = location.pathname === "/mentorCourseList";
  const isMyLearning = location.pathname === "/mylearning";
  const [isSwitchOn, setIsSwitchOn] = useState(
    isMentorCourseList ? isEnabled : true
  );
  const [notification, setNotification] = useState("");

  if (!isMentorCourseList && !isEnabled) {
    return null;
  }

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(courseId);
      setNotification("Khóa học đã được xóa thành công.");
    }
  };

  const handleSwitchChange = async () => {
    const newStatus = !isSwitchOn;

    try {
      await axios.put(
        `https://localhost:7030/api/Courses/${courseId}/update-status`,
        newStatus,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsSwitchOn(newStatus);
      setNotification(
        `Khóa học đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`
      );
    } catch (error) {
      console.error("Error updating course status", error);
      setNotification("Cập nhật trạng thái khóa học thất bại.");
    }
  };

  let destinationPath;
  if (location.pathname === "/mentorCourseList") {
    destinationPath = `/courseDetail/${courseId}`;
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
        />
      )}
      <div className="absolute top-1 right-1 flex items-center space-x-2">
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
            <input
              type="checkbox"
              id={`switch-${courseId}`}
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              className="hidden peer"
            />
            <label
              htmlFor={`switch-${courseId}`}
              className="cursor-pointer w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 transition-colors duration-300 ease-in-out peer-checked:bg-green-400"
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></div>
            </label>
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
            className="w-full h-32 object-cover rounded-t-lg mb-4"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg text-black mb-1">{courseName}</h3>
          <p
            className="text-gray-600 mb-2 text-left overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {content}
          </p>
          <span className="text-sm font-medium text-blue-600 mb-2">
            {Skill}
          </span>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Teacher: </span>
            {teacher}
          </div>
          <div className="text-lg font-thin text-red-500">
            {price ? formatCurrency(price) : "Free"}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
