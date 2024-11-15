import React, { useState } from "react";
import axios from "axios";

const CreateClass = ({ courseId, onClose, onCreateSuccess }) => {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [inputErrors, setInputErrors] = useState({
    className: false,
    classDescription: false,
    count: false,
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    imageUrl: false,
  });

  const validateStartDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setInputErrors((prev) => ({ ...prev, startDate: startDate < today }));
  };

  const validateEndDate = () => {
    setInputErrors((prev) => ({ ...prev, endDate: endDate < startDate }));
  };

  const validateStartTime = () => {
    const [hours] = startTime.split(":").map(Number);
    setInputErrors((prev) => ({
      ...prev,
      startTime: hours < 6 || hours >= 22,
    }));
  };

  const validateEndTime = () => {
    const [startHours] = startTime.split(":").map(Number);
    const [endHours] = endTime.split(":").map(Number);
    setInputErrors((prev) => ({
      ...prev,
      endTime: endHours < startHours || endHours >= 22,
    }));
  };

  const validateFields = () => {
    validateStartDate();
    validateEndDate();
    validateStartTime();
    validateEndTime();
    return !Object.values(inputErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    if (!courseId) {
      console.error("Course ID is required.");
      return;
    }

    const newClass = {
      className,
      classDescription,
      count,
      courseId,
      startDate,
      endDate,
      startTime: { ticks: new Date(startTime).getTime() * 10000 },
      endTime: { ticks: new Date(endTime).getTime() * 10000 },
      isEnabled,
      imageUrl,
    };

    try {
      const response = await axios.post(
        "https://localhost:7030/api/class",
        newClass
      );
      console.log("Class created successfully:", response.data);
      alert("Lớp học đã được tạo thành công!");

      setClassName("");
      setClassDescription("");
      setCount(0);
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
      setIsEnabled(true);
      setImageUrl("");
      setInputErrors({
        className: false,
        classDescription: false,
        count: false,
        startDate: false,
        endDate: false,
        startTime: false,
        endTime: false,
        imageUrl: false,
      });
      onCreateSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create class:", error);
      alert("Đã xảy ra lỗi khi tạo lớp học. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <h2 className="text-2xl font-bold mb-4">Thêm Lớp Học Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Tên Lớp Học
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setInputErrors((prev) => ({ ...prev, className: false })); // Reset lỗi khi người dùng nhập
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.className ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Mô Tả</label>
            <textarea
              value={classDescription}
              onChange={(e) => {
                setClassDescription(e.target.value);
                setInputErrors((prev) => ({
                  ...prev,
                  classDescription: false,
                })); // Reset lỗi khi người dùng nhập
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.classDescription
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
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
              onChange={(e) => {
                setCount(e.target.value);
                setInputErrors((prev) => ({ ...prev, count: false })); // Reset lỗi khi người dùng nhập
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.count ? "border-red-500" : "border-gray-300"
              }`}
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
                onChange={(e) => {
                  setStartDate(e.target.value);
                  validateStartDate(); // Kiểm tra khi thay đổi
                }}
                required
                className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                  inputErrors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Ngày Kết Thúc
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  validateEndDate(); // Kiểm tra khi thay đổi
                }}
                required
                className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                  inputErrors.endDate ? "border-red-500" : "border-gray-300"
                }`}
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
                onChange={(e) => {
                  setStartTime(e.target.value);
                  validateStartTime(); // Kiểm tra khi thay đổi
                }}
                required
                className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                  inputErrors.startTime ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Thời Gian Kết Thúc
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  validateEndTime(); // Kiểm tra khi thay đổi
                }}
                required
                className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                  inputErrors.endTime ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              URL Hình Ảnh
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setInputErrors((prev) => ({ ...prev, imageUrl: false })); // Reset lỗi khi người dùng nhập
              }}
              required
              className={`w-full border p-2 rounded focus:outline-none focus:border-blue-500 ${
                inputErrors.imageUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-semibold">Kích Hoạt</span>
            </label>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Tạo Lớp Học
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
