import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

const ButtonAddCourseTimeline = ({ courseId, onTimelineAdded }) => {
  const [showForm, setShowForm] = useState(false); // Trạng thái mở/đóng form
  const [formData, setFormData] = useState({
    eventDate: new Date(),
    title: "",
    description: "",
  });

  // Hàm xử lý khi form thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý khi chọn ngày
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      eventDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7030/api/CourseTimeline", [
        {
          courseId: courseId,
          eventDate: formData.eventDate.toISOString(), // Đảm bảo định dạng ngày
          title: formData.title,
          description: formData.description,
          author: "YourAuthorName",
          isEnabled: true,
        },
      ]);
      console.log(
        courseId,
        formData.eventDate,
        formData.title,
        formData.description
      );

      onTimelineAdded();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create CourseTimeline", error.response.data);
    }
  };

  // ... Các mã khác không thay đổi

  return (
    <div className="flex flex-col items-start">
      <button
        className="border-dashed border-2 border-gray-300 rounded-lg p-3 w-64 flex items-center justify-center hover:bg-gray-50 transition duration-200"
        onClick={() => setShowForm(!showForm)} // Thay đổi trạng thái hiển thị form
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {showForm && (
        <form
          className="mt-4 p-4 bg-white shadow-md rounded w-80"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold mb-4">Add Course Timeline</h2>

          <label className="block mb-2 ">
            Event Date
            <DatePicker
              selected={formData.eventDate}
              onChange={handleDateChange}
              className="mt-1 ml-2 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>

          <label className="block mb-2">
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter the event title"
              required
            />
          </label>

          <label className="block mb-2">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter the event description"
              required
            />
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-300 text-white py-1 px-3 rounded" // Giảm padding
              onClick={() => setShowForm(false)} // Đóng form nếu muốn hủy
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-1 px-3 rounded" // Giảm padding
            >
              Save Timeline
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ButtonAddCourseTimeline;
