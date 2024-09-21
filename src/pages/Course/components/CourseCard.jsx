import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
const CourseCard = ({
  content,
  courseName,
  title,
  description,
  category,
  icon,
  teacher,
  courseId,
  onDelete, // Thêm prop onDelete để xử lý xóa
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7030/api/Courses/${courseId}`);
      onDelete(courseId); // Gọi hàm onDelete để cập nhật trạng thái ở component cha
    } catch (error) {
      console.error("Error deleting course", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="relative bg-white h-52 shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-gray-100 transition-all">
      <button
        onClick={handleDelete}
        className="absolute bg-transparent top-1 right-1 text-red-400 hover:text-red-700"
        aria-label="Delete Course"
      >
        <FaTrash />
      </button>
      <Link
        to={`/courseDetail/${courseId}`}
        className="flex-grow flex flex-col items-center"
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
        <span className="text-sm font-medium text-blue-600 mb-2">
          {category}
        </span>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Teacher: </span>
          {teacher}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
