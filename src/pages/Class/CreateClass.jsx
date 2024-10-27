import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateClass = () => {
  const location = useLocation();
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [count, setCount] = useState(0);
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(""); // Đổi thành định dạng chuỗi
  const [endTime, setEndTime] = useState(""); // Đổi thành định dạng chuỗi
  const [isEnabled, setIsEnabled] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thêm thông báo lỗi

  useEffect(() => {
    if (location.state?.courseId) {
      setCourseId(location.state.courseId);
    }
  }, [location.state?.courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra định dạng thời gian
    if (!startTime || !endTime) {
      setErrorMessage("Thời gian bắt đầu và kết thúc không được để trống.");
      return;
    }

    const newClass = {
      className,
      classDescription,
      count,
      courseId,
      startDate,
      endDate,
      startTime: { ticks: new Date(startTime).getTime() * 10000 }, // Chuyển đổi thời gian sang ticks
      endTime: { ticks: new Date(endTime).getTime() * 10000 }, // Chuyển đổi thời gian sang ticks
      isEnabled,
      imageUrl,
    };

    try {
      const response = await axios.post(
        "https://localhost:7030/api/class",
        newClass
      );
      console.log("Class created successfully:", response.data);

      // Reset form nếu cần thiết
      setClassName("");
      setClassDescription("");
      setCount(0);
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
      setIsEnabled(true);
      setImageUrl("");
      setErrorMessage(""); // Reset thông báo lỗi
    } catch (error) {
      console.error("Failed to create class:", error);
      setErrorMessage("Không thể tạo lớp học. Vui lòng thử lại."); // Cập nhật thông báo lỗi
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Thêm Lớp Học Mới</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
      {/* Hiển thị thông báo lỗi */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Tên Lớp Học
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Mô Tả</label>
          <textarea
            value={classDescription}
            onChange={(e) => setClassDescription(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Số Lượng Học Viên
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <input type="hidden" value={courseId} />

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Ngày Bắt Đầu
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Ngày Kết Thúc
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Thời Gian Bắt Đầu
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Thời Gian Kết Thúc
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            URL Hình Ảnh
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Kích Hoạt Lớp Học
          </label>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Thêm Lớp Học
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
