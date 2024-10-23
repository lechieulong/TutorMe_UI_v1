import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const CourseCard = ({
  content,
  courseName,
  title,
  description,
  category,
  icon,
  teacher,
  courseId,
  onDelete = null, // Thêm prop onDelete với giá trị mặc định là null
}) => {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  const handleDelete = async () => {
    if (onDelete) {
      try {
        await axios.delete(`https://localhost:7030/api/Courses/${courseId}`);
        onDelete(courseId); // Gọi hàm onDelete để cập nhật trạng thái ở component cha
      } catch (error) {
        console.error("Error deleting course", error);
        alert("Failed to delete course.");
      }
    }
  };

  // Kiểm tra đường dẫn hiện tại và điều chỉnh link tương ứng
  let destinationPath;
  if (location.pathname === "/mentorCourseList") {
    destinationPath = `/mentorCourseDetail/${courseId}`;
  } else if (location.pathname === "/course") {
    destinationPath = `/courseDetail/${courseId}`;
  }

  console.log(destinationPath);

  return (
    <div className="relative bg-white h-52 shadow-md rounded-lg p-4 flex flex-col items-center hover:bg-gray-100 transition-all">
      {onDelete && ( // Chỉ hiển thị nút delete nếu onDelete được truyền vào
        <button
          onClick={handleDelete}
          className="absolute bg-transparent top-1 right-1 text-red-400 hover:text-red-700"
          aria-label="Delete Course"
        >
          <FaTrash />
        </button>
      )}
      <Link
        to={destinationPath} // Sử dụng destinationPath đã xác định ở trên
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
