import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const CourseCard = ({
  content,
  courseName,
  title,
  description,
  Skill,
  icon,
  teacher,
  courseId,
  onDelete = null,
  isEnabled,
}) => {
  const location = useLocation();

  const isMentorCourseList = location.pathname === "/mentorCourseList";
  const [isSwitchOn, setIsSwitchOn] = useState(
    isMentorCourseList ? isEnabled : true
  );

  if (!isMentorCourseList && !isEnabled) {
    return null;
  }

  const handleDelete = async () => {
    if (onDelete) {
      try {
        await axios.delete(`https://localhost:7030/api/Courses/${courseId}`);
        onDelete(courseId);
      } catch (error) {
        console.error("Error deleting course", error);
        alert("Failed to delete course.");
      }
    }
  };

  const handleSwitchChange = async () => {
    const newStatus = !isSwitchOn;
    const confirmationMessage = newStatus
      ? "Bạn có chắc muốn bật hiển thị course không?"
      : "Bạn có chắc muốn tắt hiển thị course không?";

    if (window.confirm(confirmationMessage)) {
      try {
        await axios.put(
          `https://localhost:7030/api/Courses/${courseId}/enabled`,
          newStatus,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setIsSwitchOn(newStatus);
        alert(`Course đã được ${newStatus ? "hiển thị" : "ẩn"} thành công.`);
      } catch (error) {
        console.error("Error updating course status", error);
        alert("Cập nhật trạng thái course thất bại.");
      }
    }
  };

  const handleClick = () => {
    console.log("Skill:", Skill); // Log Skill khi nhấn vào card
  };

  let destinationPath;
  if (location.pathname === "/mentorCourseList") {
    destinationPath = `/mentorCourseDetail/${courseId}`;
  } else if (location.pathname === "/courseList") {
    destinationPath = `/courseDetail/${courseId}`;
  }

  return (
    <div className="relative bg-white h-52 shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-gray-100 transition-all">
      <div className="absolute top-1 right-1 flex items-center space-x-2">
        {isMentorCourseList && (
          <>
            <button
              onClick={handleDelete}
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
        state={{ Skill }}
        className="flex-grow flex flex-col items-center"
        onClick={handleClick} // Gọi handleClick khi nhấn vào card
      >
        <div className="text-2xl mb-1">{icon}</div>
        <h3 className="text-lg font-bold">{courseName}</h3>
        <h3 className="text-xl font-semibold mb-1 text-center">{title}</h3>
        <p
          className="text-gray-700 mb-1 text-center overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <p
          className="text-gray-600 mb-1 text-center overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </p>
        <span className="text-sm font-medium text-blue-600 mb-2">{Skill}</span>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Teacher: </span>
          {teacher}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
