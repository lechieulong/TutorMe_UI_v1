import React, { useState } from "react";
import axios from "axios";

const ButtonAddCourseTimelineDetail = ({
  courseId,
  timelineId,
  onDetailAdded,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    topic: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDetail = async () => {
    try {
      await axios.post(`https://localhost:7030/api/CourseTimelineDetails`, {
        ...formData,
        courseId: courseId,
        timelineId: timelineId,
      });
      onDetailAdded(); // Gọi lại hàm để cập nhật danh sách
      setShowForm(false); // Ẩn form sau khi thêm thành công
    } catch (error) {
      console.error("Failed to add course timeline detail", error);
    }
  };

  return (
    <div className="my-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Thêm chi tiết lộ trình
      </button>
      {showForm && (
        <div className="mt-4">
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề"
            value={formData.title}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="videoUrl"
            placeholder="URL video"
            value={formData.videoUrl}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="topic"
            placeholder="Chủ đề"
            value={formData.topic}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={handleAddDetail}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Lưu chi tiết
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonAddCourseTimelineDetail;
