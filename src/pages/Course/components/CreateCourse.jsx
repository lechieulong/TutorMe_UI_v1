import { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../service/GetUser";

const SkillMapping = {
  Reading: "0",
  Listening: "1",
  Writing: "2",
  Speaking: "3",
};

const CreateCourse = ({ onClose, onCreateSuccess }) => {
  const [course, setCourse] = useState({
    courseName: "",
    content: "",
    hours: 0,
    days: 0,
    categories: [],
    price: 0,
    userId: "",
    imageUrl: "default_image_url.jpg",
  });

  useEffect(() => {
    const userFromToken = getUser();
    if (userFromToken?.sub) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        userId: userFromToken.sub,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const SkillValue = SkillMapping[value];

    setCourse((prevCourse) => {
      const newCategories = checked
        ? [...prevCourse.categories, SkillValue]
        : prevCourse.categories.filter((Skill) => Skill !== SkillValue);
      return { ...prevCourse, categories: newCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (course.hours < 0 || course.days < 0 || course.price < 0) {
      alert("Số giờ, số ngày và giá không được phép âm.");
      return;
    }

    try {
      await axios.post("https://localhost:7030/api/Courses", course);
      alert("Tạo khoá học thành công!");
      onCreateSuccess(); // Gọi callback để load lại danh sách khóa học
    } catch (error) {
      console.error("Lỗi khi tạo khoá học", error.response?.data);
      alert(
        "Tạo khoá học thất bại: " +
          (error.response?.data.message || error.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
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
              min="0"
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
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Danh Mục</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Listening"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Listening
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Reading
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Writing"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Writing
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Speaking"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Speaking
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Giá</label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose} // Nút Cancel
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Tạo Khoá Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
