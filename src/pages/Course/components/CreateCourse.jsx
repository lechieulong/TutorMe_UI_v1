import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../service/GetUser"; // Hàm lấy thông tin người dùng

const CreateCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    content: "",
    hours: 0,
    days: 0,
    category: "",
    price: 0,
    createdAt: new Date().toISOString(), // Lấy ngày giờ hiện tại
    updatedAt: new Date().toISOString(), // Lấy ngày giờ hiện tại
    imageUrl: "", // URL ảnh cho khoá học
    userId: "", // ID người dùng
  });

  useEffect(() => {
    const userFromToken = getUser();
    if (userFromToken?.sub) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        userId: userFromToken.sub, // Lấy userId từ token
      }));
    }
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các giá trị nhập vào không được âm
    if (course.hours < 0 || course.days < 0 || course.price < 0) {
      alert("Số giờ, số ngày và giá không được phép âm.");
      return;
    }

    const courseData = {
      ...course,
      updatedAt: new Date().toISOString(), // Cập nhật ngày giờ hiện tại khi gửi form
    };

    try {
      await axios.post("https://localhost:7030/api/Courses", courseData);
      // Reset form
      setCourse({
        courseName: "",
        content: "",
        hours: 0,
        days: 0,
        category: "",
        price: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrl: "",
        userId: course.userId, // Giữ userId cho lần tạo tiếp theo
      });
      alert("Tạo khoá học thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo khoá học", error.response.data);
      alert("Tạo khoá học thất bại: " + error.response.data.title);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tạo Khoá Học</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên Khoá Học</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nội Dung</label>
          <textarea
            name="content"
            value={course.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Số Giờ</label>
          <input
            type="number"
            name="hours"
            value={course.hours}
            onChange={handleChange}
            min="0" // Đảm bảo giá trị không âm
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Số Ngày</label>
          <input
            type="number"
            name="days"
            value={course.days}
            onChange={handleChange}
            min="0" // Đảm bảo giá trị không âm
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Danh Mục</label>
          <select
            name="category"
            value={course.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Chọn danh mục</option>
            <option value="Listening">Listening</option>
            <option value="Reading">Reading</option>
            <option value="Writing">Writing</option>
            <option value="Speaking">Speaking</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giá</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            min="0" // Đảm bảo giá trị không âm
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL Ảnh</label>
          <input
            type="text"
            name="imageUrl"
            value={course.imageUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Trường UserId và thời gian ẩn đi */}
        <input type="hidden" name="userId" value={course.userId} readOnly />
        <input
          type="hidden"
          name="createdAt"
          value={course.createdAt}
          readOnly
        />
        <input
          type="hidden"
          name="updatedAt"
          value={course.updatedAt}
          readOnly
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Tạo Khoá Học
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
